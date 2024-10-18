import { Edit } from "lucide-react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./forms/comment-form";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import { db } from "@/lib/db";

interface CommentsProps{
  postId: string;
}

export async function Comments({ postId }: CommentsProps) {
  const session = await auth();
  const currentUser = session?.user.id

  const comments = await db.comment.findMany({
    where: { postId },
    include: { author: true },
    orderBy: {createdAt: 'desc'}
  })

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comentários</h2>
      <CommentList postId={postId} comments={comments} currentUserId={session?.user.id} />
      <CommentForm postId={postId} />
    </div>
  )
}