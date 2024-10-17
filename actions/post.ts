'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod"

const contentBlockSchema = z.object({
  type: z.enum(['paragraph', 'subtitle', 'image']),
  content: z.string().min(1, "Content is required"),
})

const postSchema = z.object({
  title: z.string().min(1, "O título é obrigatório").max(100),
  description: z.string().min(1).max(500),
  coverImage: z.string().url("Deve ser uma URL válida").optional(),
  content: z.array(contentBlockSchema).min(1, "Pelo menos um bloco de conteúdo é obrigatório"),
})

export async function createPost(values: z.infer<typeof postSchema>) {
  const validatedFields = postSchema.safeParse(values);
  if (!validatedFields.success) {
    return {success: false, error: validatedFields.error.flatten().fieldErrors}
  }

  const { title, content, coverImage, description } = validatedFields.data

  const session = await auth();
  if (!session?.user || !session?.user.email) {
    return {error: 'User not found'}
  }

  try {
    const newPost = await db.post.create({
      data: {
        title,
        description,
        coverImage,
        content: JSON.stringify(content),
        authorId: session.user.id
      },
    })

    revalidatePath('/posts');

    return { success: true, post: newPost }
  } catch (error) {
    console.error('Erro ao criar post:', error)
    return { success: false, error: 'Ocorreu um erro ao criar o post.' }
  }
}

export async function updatePost(id: string, values: z.infer<typeof postSchema>) {
  const validatedFields = postSchema.safeParse(values);
  if (!validatedFields.success) {
    return {success: false, error: validatedFields.error.flatten().fieldErrors}
  }

  const { title, description, content, coverImage } = validatedFields.data;

  const session = await auth();
  if (!session?.user || !session?.user.id) {
    return {success: false, error: 'User not authenticated'}
  }

  try {
    const post = await db.post.findUnique({
      where: { id }
    });
    if (!post) {
      return {success: false, error: 'Post not found'}
    }

    if (post.authorId !== session.user.id) {
      return {success: false, error: 'Unauthorized'}
    }

    const updatedPost = await db.post.update({
      where: { id },
      data: {
        title,
        description,
        content: JSON.stringify(content),
        coverImage
      }
    });

    revalidatePath(`/post/${id}`)

    return {success: true, post: updatePost}
  } catch (error) {
    console.error('Erro ao atualizar post:', error)
    return { success: false, error: 'Ocorreu um erro ao atualizar o post.' }
  }
}