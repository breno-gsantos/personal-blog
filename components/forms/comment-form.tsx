'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { createComment } from "@/actions/comment";

const formSchema = z.object({
  postId: z.string(),
  content: z.string().min(1)
})

export function CommentForm({postId}: {postId: string}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postId: postId,
      content: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await createComment(values);
      if (data.error) {
        toast({
          title: "Erro",
          description: data.error as string || "Não foi possível adicionar o comentário. Por favor, tente novamente.",
          variant: "destructive",
        })
      } else if (data.success) {
        toast({
          title: "Comentário adicionado",
          description: "Seu comentário foi adicionado com sucesso.",
        });
        form.reset();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar o comentário. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea placeholder="Adicione um comentário" className="resize-none" rows={3} disabled={form.formState.isSubmitting} {...field} />
            </FormControl>
          </FormItem>
        )} />
        <Button type="submit" disabled={form.formState.isSubmitting}>Enviar Comentário</Button>
      </form>
    </Form>
  )
}