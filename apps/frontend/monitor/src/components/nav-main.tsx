import { zodResolver } from '@hookform/resolvers/zod';
import { type Icon, IconCirclePlusFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { useAppCreate } from '@/api/app';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { LoadingButton } from './ui/loading-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

const createAppFormSchema = z.object({
  name: z.string().min(1, '应用名称不能为空'),
  appType: z.string().min(1, '应用类型不能为空'),
  description: z.string().max(255, '描述不能超过255个字符').optional(),
});

type CreateAppFormValues = z.infer<typeof createAppFormSchema>;

const AppTypeOptions = [
  {
    label: 'React',
    value: 'react',
  },
  {
    label: 'Vue',
    value: 'vue',
  },
  {
    label: 'Vanilla',
    value: 'vanilla',
  },
];

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const { mutate: createMutate, isPending } = useAppCreate();
  const form = useForm<CreateAppFormValues>({
    resolver: zodResolver(createAppFormSchema),
    defaultValues: {
      name: '',
      appType: '',
      description: '',
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (values: CreateAppFormValues) => {
    createMutate(values, {
      onSuccess: (data) => {
        console.log(data, 'data');
        toast.success('创建成功');
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <SidebarMenuButton
                  tooltip="快速创建监控应用"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <IconCirclePlusFilled />
                  <span>快速创建</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>创建应用</DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <Form {...form}>
                  <form
                    className="grid gap-4 w-full items-center"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            应用名称 <span className="text-destructive ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="请输入应用名称" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="appType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>应用类型</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="请选择应用类型" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {AppTypeOptions.map((opt) => {
                                return (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>应用描述</FormLabel>
                          <FormControl>
                            <Textarea placeholder="描述" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter className="mt-4">
                      <LoadingButton type="submit" loading={isPending}>
                        创建
                      </LoadingButton>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
