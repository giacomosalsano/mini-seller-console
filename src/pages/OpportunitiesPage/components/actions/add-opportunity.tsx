import { Button } from "@/components/ui/button";
import { DialogComponent } from "@/components/shared/dialog-component";
import { SelectComponent } from "@/components/shared/select-component";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useOpportunities } from "@/modules/opportunities/hooks/useOpportunities";
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
import {
  type Opportunity,
  OpportunityStage,
} from "@/modules/opportunities/types";

interface AddOpportunityActionProps {
  onAddOpportunity: (opportunity: Opportunity) => void;
  loading?: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company must be at least 2 characters."),
  email: z.email("Please enter a valid email."),
  source: z.string().min(2, "Source must be at least 2 characters."),
  stage: z.enum([
    OpportunityStage.New,
    OpportunityStage.ProposalSent,
    OpportunityStage.Negotiation,
    OpportunityStage.Accepted,
    OpportunityStage.Declined,
  ]),
  amountInCents: z
    .number()
    .min(1, "Amount must be greater than 0.")
    .max(999999999, "Amount cannot exceed 999,999,999 cents."),
  accountName: z.string().min(2, "Account name must be at least 2 characters."),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const AddOpportunityAction = ({
  onAddOpportunity,
  loading: externalLoading,
}: AddOpportunityActionProps) => {
  const { loading: internalLoading } = useOpportunities();
  const navigate = useNavigate();

  const [selectedStage, setSelectedStage] = useState<string>(
    OpportunityStage.New,
  );

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      source: "",
      stage: OpportunityStage.New,
      amountInCents: 0,
      accountName: "",
    },
  });

  const isLoading =
    externalLoading || internalLoading || form.formState.isSubmitting;

  const addOpportunityDialogTrigger = useMemo(() => {
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
        <span className="md:hidden xl:block">Add Opportunity</span>
      </Button>
    );
  }, [isLoading]);

  const stageSelectItems = useMemo(() => {
    return [
      { value: OpportunityStage.New, label: "New" },
      { value: OpportunityStage.ProposalSent, label: "Proposal Sent" },
      { value: OpportunityStage.Negotiation, label: "Negotiation" },
      { value: OpportunityStage.Accepted, label: "Accepted" },
      { value: OpportunityStage.Declined, label: "Declined" },
    ];
  }, []);

  const onStageSelectValueChange = useCallback(
    (value: string) => {
      setSelectedStage(value);
      form.setValue("stage", value as OpportunityStage);
    },
    [form],
  );

  const handleSubmitForm = (data: FormSchemaType) => {
    const id = `${Math.floor(Math.random() * 201) + 200}`;
    const newOpportunity: Opportunity = {
      ...data,
      id,
    };

    onAddOpportunity(newOpportunity);

    form.reset();

    const dialogTrigger = document.querySelector('[data-state="open"]');
    if (dialogTrigger) (dialogTrigger as HTMLElement).click();

    navigate(`/opportunities/`);
  };

  const addOpportunityDialogContent = useMemo(() => {
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
          <label
            htmlFor="amountInCents"
            className="flex items-center gap-1 font-bold"
          >
            <UserRoundCheck className="text-muted-foreground h-4 w-4" />
            Stage
          </label>
          <SelectComponent
            value={selectedStage}
            onValueChange={onStageSelectValueChange}
            defaultValue={OpportunityStage.New}
            placeholder="Stage"
            triggerClassName="w-full"
            items={stageSelectItems}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="amountInCents"
            className="flex items-center gap-1 font-bold"
          >
            <FileDigit className="text-muted-foreground h-4 w-4" /> Amount (in
            cents)
          </label>
          <Input
            id="amountInCents"
            type="number"
            max={100}
            min={0}
            step={1}
            {...form.register("amountInCents", { valueAsNumber: true })}
            errorMessage={form.formState.errors.amountInCents?.message}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="accountName"
            className="flex items-center gap-1 font-bold"
          >
            <Globe className="text-muted-foreground h-4 w-4" /> Account Name
          </label>
          <Input
            id="accountName"
            {...form.register("accountName")}
            errorMessage={form.formState.errors.accountName?.message}
          />
        </div>
      </div>
    );
  }, [
    form,
    stageSelectItems,
    selectedStage,
    onStageSelectValueChange,
    form.formState.errors,
  ]);

  const addOpportunityDialogFooter = useMemo(() => {
    return (
      <div className="flex w-full flex-col justify-center gap-2">
        <Button
          type="button"
          disabled={isLoading}
          onClick={() => {
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
  }, [
    isLoading,
    form,
    handleSubmitForm,
    form.formState.isValid,
    form.formState.errors,
  ]);

  return (
    <DialogComponent
      dialogContentClassName="lg:min-w-2xl"
      dialogFooterClassName="lg:flex-row lg:gap-2 md:flex-col-reverse md:gap-2"
      trigger={addOpportunityDialogTrigger}
      title="Add Opportunity"
      description="Add opportunity information"
      children={addOpportunityDialogContent}
      footer={addOpportunityDialogFooter}
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
