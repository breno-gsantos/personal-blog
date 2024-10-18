import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface HeaderProps{
  postId?: string
}

export async function Header({ postId }: HeaderProps) {
  const session = await auth();
  let isAuthor = false;

  if (postId && session?.user) {
    const post = await db.post.findUnique({
      where: { id: postId },
      select: { authorId: true }
    });

    isAuthor = post?.authorId === session.user.id;
  }

  return (
    <header className="bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-muted-foreground hover:text-secondary-foreground mr-4">
          <ArrowLeft size={24} />
        </Link>
        {isAuthor && postId && (
          <div className="flex items-center gap-4">
            <Button variant='ghost' size='icon' asChild>
              <Link href={`/post/${postId}/edit`} className="text-blue-500 hover:text-blue-700">
                <Edit className="size-6" />
              </Link>
            </Button>
            <Button variant='ghost' size='icon'>
              <Trash className="size-6 text-destructive" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}