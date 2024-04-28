import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Settings as SettingsIcon } from "lucide-react";
import { useGame } from "@/context/game";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { toast } from "./ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const SettingsFormSchema = z.object({
  width: z.coerce.number().int().min(1),
  height: z.coerce.number().int().min(1),
  mines: z.coerce.number().int().min(1),
});

type SettingsFormValues = z.infer<typeof SettingsFormSchema>;

const SettingsForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { newGrid } = useGame();

  const form = useForm({
    defaultValues: {
      width: 10,
      height: 10,
      mines: 20,
    },
    resolver: zodResolver(SettingsFormSchema),
  });

  const handleSubmit = (data: SettingsFormValues) => {
    onSubmit?.();
    toast({
      title: "New game started",
      description: `Width: ${data.width}, Height: ${data.height}, Mines: ${data.mines}`,
    });
    newGrid(data.width, data.height, data.mines);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid w-full items-start gap-6"
      >
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="10" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="10" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="mines"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mines</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="10" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            New game
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden flex-col items-start gap-8 md:flex">
        <SettingsForm />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex flex-1 w-full justify-end md:hidden">
            <Button type="button" variant="outline" size="icon">
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="py-4">
            <SettingsForm onSubmit={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
