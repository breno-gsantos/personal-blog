"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Trash2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { createPost } from '@/actions/post'
import { CardWrapper } from '@/components/auth/card-wrapper'

const contentBlockSchema = z.object({
  type: z.enum(['paragraph', 'subtitle', 'image']),
  content: z.string().min(1, "Content is required"),
})

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, 'Description is required').max(500),
  coverImage: z.string().url("Must be a valid URL").optional(),
  content: z.array(contentBlockSchema).min(1, "At least one content block is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function CreatePost() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: '',
      coverImage: "",
      content: [{ type: 'paragraph', content: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "content",
    control: form.control,
  })

  async function onSubmit(values: FormValues){
    const data = await createPost(values)
    if (data.success) {
      router.push('/')
    } else {
      console.error(data.error)
    }
  }

  return (
    <CardWrapper headerTitle='✍🏻 Criar Post' headerDescription='Preencha o formulário abaixo para criar um post!'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-6">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Post</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do seu post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do Post</FormLabel>
              <FormControl>
                <Input placeholder="Digite a descrição do seu post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

          <FormField control={form.control} name="coverImage" render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem de Capa</FormLabel>
              <FormControl>
                <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

          <div className="space-y-4">
            <FormLabel>Conteúdo do Post</FormLabel>
            {fields.map((field, index) => (
              <FormField key={field.id} control={form.control} name={`content.${index}.content`} render={({ field: contentField }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-start space-x-2">
                      {field.type === 'paragraph' && (
                        <Textarea placeholder="Digite o conteúdo do parágrafo" className="flex-grow resize-none" rows={5} {...contentField} />
                      )}
                      {field.type === 'subtitle' && (
                        <Input placeholder="Digite o subtítulo" className="flex-grow" {...contentField} />
                      )}
                      {field.type === 'image' && (
                        <Input placeholder="URL da imagem" className="flex-grow" {...contentField} />
                      )}
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            ))}
          </div>

          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => append({ type: 'paragraph', content: '' })}>
              <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Parágrafo
            </Button>
            <Button type="button" variant="outline" onClick={() => append({ type: 'subtitle', content: '' })}>
              <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Subtítulo
            </Button>
            <Button type="button" variant="outline" onClick={() => append({ type: 'image', content: '' })}>
              <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Imagem
            </Button>
          </div>

          <Button type="submit" className="w-full">Publicar Post</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}