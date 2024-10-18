'use client'

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "../ui/toast";

const loginSchema = z.object({
  email: z.string().email('Required'),
  password: z.string().min(1, 'Required')
})

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const data = await login(values);
      
      if (data.error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: data.error as string
        })
      } else if (data.success) {
        toast({
          title: 'Sucesso',
          description: data.success
        })
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Um erro inesperado aconteceu',
        action: <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
      })
      console.log('An unexpected error ocurred. Please try again')
    } finally {
      form.reset();
    }
  }

  return (
    <CardWrapper headerTitle="🔐 Login" headerDescription="Bem-vindo de volta!" backButtonLabel="Não possui uma conta?" backButtonHref="/register">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" disabled={form.formState.isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" disabled={form.formState.isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <Button className="w-full" disabled={form.formState.isSubmitting}>Login</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}