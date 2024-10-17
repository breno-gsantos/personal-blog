import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PostDetail() {
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Título do Post</h1>
          <div className="text-gray-600 mb-8">
            <span>Por Autor do Post</span>
            <span className="mx-2">•</span>
            <time>12 de Junho, 2023</time>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            </p>
            <p>
              Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.
            </p>
            <h2>Subtítulo do Post</h2>
            <p>
              Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
            </p>
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
      </main>
    </>
  )
}