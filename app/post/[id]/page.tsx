import { Comments } from "@/components/Comments";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PostPage({params}: {params: {id: string}}) {
  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      comments: {
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });

  if (!post) {
    console.error(`Post com ID ${params.id} não encontrado.`);
    notFound();
  }

  const content = JSON.parse(post.content);

  return (
    <>
      <Header postId={post.id} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="scroll-m-20 text-3xl font-extrabold lg:text-4xl mb-4">{post.title}</h1>
          {post.coverImage && (
            <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover mb-4" />
          )}
          <div className="text-muted-foreground mb-8">
            <span>Por {post.author.firstName} {post.author.lastName}</span>
            <span className="mx-2">•</span>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          </div>

          <div className="space-y-4 prose prose-lg max-w-none">
            {content.map((block: any, index: number) => {
              if (block.type === 'paragraph') {
                return <p key={index} className="leading-7 [&:not(:first-child)]:mt-6">{block.content}</p>
              } else if (block.type === 'subtitle') {
                return <h2 key={index} className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{block.content}</h2>
              } else if (block.type === 'image') {
                return <img key={index} src={block.content} alt="Post Image" className="w-full h-auto my-4" />
              }
              return null; 
            })}
          </div>
        </article>
        <div className="max-w-3xl mx-auto mt-12 flex justify-between">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Post Anterior
          </Button>
          <Button variant="outline">
            Próximo Post <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </Button>
        </div>
        <Comments postId={params.id} />
      </main>
    </>
  )
}