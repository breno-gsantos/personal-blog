import { FeaturedPost } from "@/components/FeaturedPost";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { db } from "@/lib/db";
import { Post } from "@prisma/client";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 6;

  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: pageSize,
    skip: (page - 1) * pageSize
  });

  const totalPosts = await db.post.count();
  const totalPages = Math.ceil(totalPosts / pageSize)

  return (
    <main className="flex-1 max-w-7xl mx-auto">
      <FeaturedPost />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container p-4 md:px-6">
          
          <div className="text-center mb-12 space-y-4">
            <h1 className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Posts Recentes</h1>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Explore nossos últimos artigos</h2>
            <p className="text-muted-foreground md:text-xl">Fique por dentro de ideias e perspectivas inspiradoras.</p>
          </div>
          
          {/* Grid de posts */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {posts.map((post) => (
              <Card key={post.id} className="group h-[610px] flex flex-col">
                <CardHeader>
                  <img src={post.coverImage as string} alt={post.title} className="aspect-video overflow-hidden rounded-t-xl object-cover group-hover:scale-105 transition-transform" />
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <div className="space-y-4">
                    <Badge variant='secondary'>Categoria</Badge>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="text-muted-foreground">{post.description}</p>
                  </div>
                  <div className="mt-auto">
                    <Button asChild>
                      <Link href={`/post/${post.id}`}>Ler mais</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={page > 1 ? `/?page=${page - 1}` : '#'} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink href={`/?page=${pageNumber}`} isActive={pageNumber === page}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href={page < totalPages ? `/?page=${page + 1}` : '#'} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  )
}