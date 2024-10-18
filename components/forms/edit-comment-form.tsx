'use client'

import { updateComment } from "@/actions/comment";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface EditCommentFormProps{
  comment: {
    id: string;
    content: string;
  };
  onCancel: () => void;
  onSuccess: () => void;
}

const formSchema = z.object({
  content: z.string().min(1),
})

type FormValues = z.infer<typeof formSchema>

export function EditCommentForm({ comment, onCancel, onSuccess }: EditCommentFormProps) {
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: comment.content
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      const data = await updateComment(comment.id, values);
      if (data.error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: data.error as string
        })
      } else if (data.success) {
        toast({
          title: 'Comentário atualizado',
          description: "Seu comentário foi atualizado com sucesso.",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
          variant: 'destructive',
          title: 'Algo deu errado',
          description: 'Algum erro desconhecido aconteceu'
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-4">
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea placeholder="edite seu comentário" className="resize-none" rows={3} disabled={form.formState.isSubmitting} {...field} />
            </FormControl>
          </FormItem>
        )} />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant='outline' onClick={onCancel}>Cancelar</Button>
          <Button disabled={form.formState.isSubmitting}>Atualizar</Button>
        </div>
      </form>
    </Form>
  )
}