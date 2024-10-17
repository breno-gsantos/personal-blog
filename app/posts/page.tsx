import { db } from "@/lib/db"
import Link from "next/link";

export default async function PostsPage() {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto">
      <section className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Todas Postagens</h1>
          <p className="mt-2 text-muted-foreground">Explore todas nossas postagens no blog</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="overflow-hidden rounded-lg bg-card shadow-sm transition-all hover:shadow-md">
                <img src={post.coverImage as string} alt={post.title} width={400} height={225} className="aspect-video w-full object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold group-hover:underline">{post.title}</h2>
                  <p className="mt-2 line-clamp-2 text-muted-foreground">{post.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}