'use client'

import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { formatDistanceToNow } from 'date-fns';
import { Button } from "./ui/button";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { EditCommentForm } from "./forms/edit-comment-form";
import { deleteComment } from "@/actions/comment";

interface CommentListProps {
  postId: string;
  comments: Array<{
    id: string;
    content: string;
    createdAt: string | Date;
    author: User;
    authorId: string;
  }>;
  currentUserId: string | undefined;
}

export function CommentList({ postId, comments, currentUserId }: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleDelete(commentId: string) {
    try {
      const data = await deleteComment(commentId);
      if (data.success) {
        toast({
          title: "Comentário excluído",
          description: "O comentário foi excluído com sucesso.",
        });
      } else {
        toast({
          title: "Erro",
          description: data.error as string || "Não foi possível excluir o comentário.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o comentário.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-4">
          <Avatar>
            <AvatarImage src={`https://avatar.vercel.sh/${comment.author.email}`} />
            <AvatarFallback>{comment.author.firstName[0]}{comment.author.lastName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">{comment.author.firstName} {comment.author.lastName}</h4>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})}
                </span>
              </div>
              {currentUserId === comment.authorId && (
                <div>
                  <Button variant='ghost' size='icon' onClick={() => setEditingCommentId(comment.id)}>
                    <Edit className="size-4" />
                  </Button>
                  <Button variant='ghost' size='icon' onClick={() => handleDelete(comment.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              )}
            </div>
            {editingCommentId === comment.id ? (
              <EditCommentForm comment={comment} onCancel={() => setEditingCommentId(null)} onSuccess={() => setEditingCommentId(null)} />
            ) : (
                <p className="mt-1">{comment.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}