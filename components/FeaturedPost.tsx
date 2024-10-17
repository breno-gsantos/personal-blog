import { db } from "@/lib/db"
import { Post } from "@prisma/client"
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

export async function FeaturedPost() {
  const post: Post | null = await db.post.findFirst({
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (!post) {
    return <div>Nenhum Post encontrado</div>
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 max-w-7xl mx-auto">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <img src={post.coverImage as string} alt={post.title} width={800} height={600} className="mx-auto aspect-video overflow-hidden ronded-xl object-cover sm:w-full" />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <Badge variant='secondary'>Destaque</Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>
            <p className="text-muted-foreground md:text-xl">{post.description}</p>
          </div>
          <Button className="max-w-32" size='lg' asChild>
            <Link href={`/post/${post.id}`}>Ler mais</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}