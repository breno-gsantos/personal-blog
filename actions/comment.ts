'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod"

const formSchema = z.object({
  postId: z.string(),
  content: z.string().min(1)
})

export async function createComment(values: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(values);
  if (!validatedFields.success) {
    return {success: false, error: validatedFields.error.flatten().fieldErrors}
  }

  const { postId, content } = validatedFields.data

  const session = await auth();
  if (!session?.user || !session.user.id || !session.user.email) {
    return {error: 'User not found'}
  }

  try {
    const comment = await db.comment.create({
      data: {
        content: content,
        authorId: session.user.id,
        postId: postId
      }
    })

    revalidatePath(`/post/${postId}`)
    return {success: true, comment}
  } catch (error) {
    console.error('Error creating comment:', error)
    return { success: false, error: 'Failed to create comment' }
  }
}

const updateFormSchema = z.object({
  content: z.string().min(1)
})

export async function updateComment(id: string, values: z.infer<typeof updateFormSchema>) {
  const validatedFields = updateFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return {success: false, error: validatedFields.error.flatten().fieldErrors}
  }

  const { content } = validatedFields.data;

  const session = await auth();
  if (!session?.user || !session?.user.id) {
    return {success: false, error: 'Usuário não autenticado'}
  };

  try {
    const comment = await db.comment.findUnique({
      where: { id }
    });

    if (!comment) return { success: false, error: 'Comentário não encontrado' };

    if (comment.authorId !== session.user.id) {
      return {success: false, error: 'Não autorizado'}
    }

    const updatedComment = await db.comment.update({
      where: { id },
      data: { content }
    })

    revalidatePath(`/post/${id}`)

    return {success: true, post: updateComment}
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error)
    return { success: false, error: 'Ocorreu um erro ao atualizar o comentário.' }
  }
}

export async function deleteComment(id: string) {
  const session = await auth();
  if (!session?.user || !session?.user.id) {
    return {success: false, error: 'Usuário não autenticado'}
  };

  try {
    const comment = await db.comment.findUnique({
      where: { id },
      include: { post: true }
    });

    if (!comment) return { success: false, error: 'Comentário não encontrado' };

    if (comment.authorId !== session.user.id) {
      return {success: false, error: 'Não autorizado'}
    }

    await db.comment.delete({
      where: {id}
    })

    revalidatePath(`/post/${id}`)

    return {success: true}
  } catch (error) {
    console.error('Erro ao excluir comentário:', error)
    return { success: false, error: 'Ocorreu um erro ao excluir o comentário.' }
  }
}