import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { EditPostForm } from "@/components/forms/edit-post-form";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const post = await db.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  if (post.authorId !== session.user.id) {
    redirect("/");
  }

  const editablePost = {
    id: post.id,
    title: post.title,
    description: post.description,
    content: post.content,
    coverImage: post.coverImage || undefined
  }

  return <EditPostForm post={editablePost} />;
}