export default function ContactPage() {
  const p1 = "Bem-vindo ao nosso blog, onde compartilhamos nossas ideias, experiências e perspectivas sobre os mais diversos temas. Nosso objetivo é oferecer conteúdos informativos e envolventes que inspirem e empoderem nossos leitores."
  const p2 = "Seja você alguém em busca de reflexões profundas, desenvolvimento pessoal, ou simplesmente de uma leitura interessante, você está no lugar certo. Nossa equipe de escritores e colaboradores é apaixonada pelo que faz e está comprometida em entregar conteúdos de alta qualidade que acrescentem valor à sua vida."

  return (
    <main className="flex-1 max-w-[1500px] container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sobre o Blog</h1>
          <p className="text-muted-foreground md:text-xl">{p1}</p>
          <p className="text-muted-foreground md:text-xl">{p2}</p>
        </div>
        <img src="https://fitforlifeni.co.uk/wp-content/uploads/2020/11/person-desk.jpg" alt="Image" width={400} height={400} className="rounded-lg object-cover" />
      </div>
    </main>
  )
}