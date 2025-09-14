import { Button } from "@/components/ui/button";
import { DialogComponent } from "@/components/shared/dialog-component";
import { SelectComponent } from "@/components/shared/select-component";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeads } from "@/modules/leads/hooks/useLeads";
import { LeadStatus, type Lead } from "@/modules/leads/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  Building2,
  FileDigit,
  Globe,
  Loader2,
  PlusIcon,
  User,
  UserRoundCheck,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState<string>(LeadStatus.New);

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

  const isLoading =
    externalLoading || internalLoading || form.formState.isSubmitting;

  const addLeadDialogTrigger = useMemo(() => {
    if (isLoading) {
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
  }, [isLoading]);

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
    onAddLead(data);
    form.reset();
    const dialogTrigger = document.querySelector('[data-state="open"]');
    if (dialogTrigger) (dialogTrigger as HTMLElement).click();
    navigate("/leads");
  };

  const addLeadDialogContent = useMemo(() => {
    return (
      <div className="my-4 flex max-h-96 w-full flex-col gap-2 space-y-4 overflow-y-auto lg:min-h-[500px] lg:gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="flex items-center gap-1 font-bold">
            <User className="text-muted-foreground h-4 w-4" /> Name
          </label>

          <Input
            id="name"
            {...form.register("name")}
            errorMessage={form.formState.errors.name?.message}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="company"
            className="flex items-center gap-1 font-bold"
          >
            <Building2 className="text-muted-foreground h-4 w-4" /> Company
          </label>
          <Input
            id="company"
            {...form.register("company")}
            errorMessage={form.formState.errors.company?.message}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center gap-1 font-bold">
            <AtSign className="text-muted-foreground h-4 w-4" /> Email
          </label>
          <Input
            id="email"
            {...form.register("email")}
            errorMessage={form.formState.errors.email?.message}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="source" className="flex items-center gap-1 font-bold">
            <Globe className="text-muted-foreground h-4 w-4" /> Source
          </label>
          <Input
            id="source"
            {...form.register("source")}
            errorMessage={form.formState.errors.source?.message}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="score" className="flex items-center gap-1 font-bold">
            <FileDigit className="text-muted-foreground h-4 w-4" /> Score
          </label>
          <Input
            id="score"
            type="number"
            max={100}
            min={0}
            step={1}
            {...form.register("score", { valueAsNumber: true })}
            errorMessage={form.formState.errors.score?.message}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="flex items-center gap-1 font-bold">
            <UserRoundCheck className="text-muted-foreground h-4 w-4" /> Status
          </label>
          <SelectComponent
            value={selectedStatus}
            onValueChange={onStatusSelectValueChange}
            defaultValue={LeadStatus.New}
            placeholder="Status"
            triggerClassName="w-full"
            items={statusSelectItems}
          />
        </div>
      </div>
    );
  }, [
    form,
    statusSelectItems,
    selectedStatus,
    onStatusSelectValueChange,
    form.formState.errors,
  ]);

  const addLeadDialogFooter = useMemo(() => {
    return (
      <div className="flex w-full flex-col justify-center gap-2">
        <Button
          type="button"
          disabled={isLoading}
          onClick={() => {
            console.log("Button clicked!");
            console.log("Form is valid:", form.formState.isValid);
            console.log("Form errors:", form.formState.errors);
            form.handleSubmit(handleSubmitForm)();
          }}
        >
          {isLoading ? (
            <div className="flex flex-row items-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin" /> Adding...
            </div>
          ) : (
            "Add"
          )}
        </Button>
      </div>
    );
  }, [isLoading, form, handleSubmitForm]);

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
            }}
          >
            Cancel
          </Button>
        </DialogClose>
      }
    />
  );
};
