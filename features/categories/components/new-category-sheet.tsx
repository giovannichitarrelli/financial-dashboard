import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
 import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useNewCategory } from "../hooks/use-new-category";
import { z } from "zod";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transitions
          </SheetDescription>
        </SheetHeader>

        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
