import { Button } from "@/components/ui/button";
import { DialogComponent } from "@/components/shared/dialog-component";
import { SelectComponent } from "@/components/shared/select-component";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { LeadStatus, type Lead } from "@/modules/leads/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddLeadActionProps {
  onAddLead: (lead: Omit<Lead, "id">) => void;
  loading?: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company must be at least 2 characters."),
  email: z.email("Please enter a valid email."),
  source: z.string().min(2, "Source must be at least 2 characters."),
  score: z
    .number()
    .min(0, "Score must be non-negative.")
    .max(100, "Score cannot exceed 100."),
  status: z.enum([
    LeadStatus.New,
    LeadStatus.Contacted,
    LeadStatus.Qualified,
    LeadStatus.Unqualified,
  ]),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const AddLeadAction = ({
  onAddLead,
  loading: externalLoading,
}: AddLeadActionProps) => {
  const { loading: internalLoading } = useLeads();

  const loading = externalLoading || internalLoading;

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      source: "",
      score: 50,
      status: LeadStatus.New,
    },
  });

  const addLeadDialogTrigger = useMemo(() => {
    if (loading) {
      return (
        <div className="flex w-full flex-row gap-2 md:max-w-fit lg:justify-end">
          <Skeleton className="h-9 w-full md:w-32" />
        </div>
      );
    }

    return (
      <Button
        size="sm"
        className="flex w-full flex-row gap-2 md:max-w-fit lg:justify-end"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="md:hidden xl:block">Add Lead</span>
      </Button>
    );
  }, [loading]);

  const statusSelectItems = useMemo(() => {
    return [
      { value: LeadStatus.New, label: "New" },
      { value: LeadStatus.Contacted, label: "Contacted" },
      { value: LeadStatus.Qualified, label: "Qualified" },
      { value: LeadStatus.Unqualified, label: "Unqualified" },
    ];
  }, []);

  const onStatusSelectValueChange = useCallback(
    (value: string) => {
      setSelectedStatus(value);
      form.setValue("status", value as LeadStatus);
    },
    [form],
  );

  const handleSubmitForm = (data: FormSchemaType) => {
    console.log("Form submitted with data:", data);
    console.log("Form errors:", form.formState.errors);
    onAddLead(data);
    form.reset();
    setSelectedStatus("");
    const dialogTrigger = document.querySelector('[data-state="open"]');
    if (dialogTrigger) (dialogTrigger as HTMLElement).click();
  };

  const addLeadDialogContent = useMemo(() => {
    return (
      <div className="my-4 flex max-h-96 w-full flex-col gap-2 space-y-4 overflow-y-auto lg:min-h-[500px] lg:gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            {...form.register("name")}
            className="col-span-3"
            errorMessage={form.formState.errors.name?.message}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Company</Label>
          <Input
            type="text"
            {...form.register("company")}
            placeholder="Company"
            errorMessage={form.formState.errors.company?.message}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <div className="relative w-full">
            <Input
              type="email"
              {...form.register("email")}
              className="min-h-[36px] w-full text-base"
              errorMessage={form.formState.errors.email?.message}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Source</Label>
          <Input
            type="text"
            {...form.register("source")}
            placeholder="Source"
            errorMessage={form.formState.errors.source?.message}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Score</Label>
          <Input
            type="number"
            max={100}
            min={0}
            {...form.register("score", { valueAsNumber: true })}
            placeholder="Score"
            errorMessage={form.formState.errors.score?.message}
          />
        </div>

        <div className="flex w-full flex-row justify-between gap-2">
          <div className="flex w-full flex-col gap-2">
            <Label>Status</Label>
            <SelectComponent
              value={selectedStatus}
              onValueChange={onStatusSelectValueChange}
              defaultValue=""
              placeholder="Status"
              triggerClassName="w-full"
              items={statusSelectItems}
            />
          </div>
        </div>
      </div>
    );
  }, [form, statusSelectItems, onStatusSelectValueChange, selectedStatus]);

  const addLeadDialogFooter = useMemo(() => {
    return (
      <div className="flex w-full flex-col justify-center gap-2">
        <Button
          type="button"
          disabled={loading || form.formState.isSubmitting}
          onClick={() => {
            console.log("Button clicked!");
            console.log("Form is valid:", form.formState.isValid);
            console.log("Form errors:", form.formState.errors);
            form.handleSubmit(handleSubmitForm)();
          }}
        >
          {loading ? (
            <div className="flex flex-row items-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin" /> Adding...
            </div>
          ) : (
            "Add"
          )}
        </Button>
      </div>
    );
  }, [loading, form, handleSubmitForm]);

  return (
    <DialogComponent
      dialogContentClassName="lg:min-w-2xl"
      dialogFooterClassName="lg:flex-row lg:gap-2 md:flex-col-reverse md:gap-2"
      trigger={addLeadDialogTrigger}
      title="Add Lead"
      description="Add lead information"
      children={addLeadDialogContent}
      footer={addLeadDialogFooter}
      closeButton={
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setSelectedStatus("");
            }}
          >
            Cancel
          </Button>
        </DialogClose>
      }
    />
  );
};
