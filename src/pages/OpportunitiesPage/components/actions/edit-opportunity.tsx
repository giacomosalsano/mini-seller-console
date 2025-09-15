import { Button } from "@/components/ui/button";
import {
  AtSign,
  Building2,
  Globe,
  PencilIcon,
  FileDigit,
  IdCard,
  User,
  UserRoundCheck,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SelectComponent } from "@/components/shared/select-component";
import { SheetFooter } from "@/components/ui/sheet";
import { SheetComponent } from "@/components/shared/sheet-component";
import { Loader2 } from "lucide-react";
import {
  OpportunityStage,
  type Opportunity,
} from "@/modules/opportunities/types";

interface EditOpportunityProps {
  opportunity: Opportunity;
  onUpdateOpportunity: (opportunity: Opportunity) => void;
  loading: boolean;
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

export const EditOpportunity = ({
  opportunity,
  onUpdateOpportunity,
  loading,
}: EditOpportunityProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedStage, setSelectedStage] = useState<string>(opportunity.stage);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: opportunity.name,
      company: opportunity.company,
      email: opportunity.email,
      source: opportunity.source,
      stage: opportunity.stage,
      amountInCents: opportunity.amountInCents,
      accountName: opportunity.accountName,
    },
  });

  const isEditRoute =
    location.pathname === `/opportunities/edit/${opportunity.id}`;
  const isOpen = isEditRoute;
  const isLoading = loading || form.formState.isSubmitting;

  const handleCancel = () => {
    form.reset({
      name: opportunity.name,
      company: opportunity.company,
      source: opportunity.source,
      stage: opportunity.stage,
      amountInCents: opportunity.amountInCents,
      accountName: opportunity.accountName,
    });
    navigate("/opportunities");
  };

  const handleSave = (data: FormSchemaType) => {
    onUpdateOpportunity({ ...data, id: opportunity.id });
    navigate("/opportunities");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      navigate("/opportunities");
    }
  };

  const opportunityDetailsTrigger = useMemo(() => {
    return (
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => navigate(`/opportunities/edit/${opportunity.id}`)}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <PencilIcon className="h-4 w-4" />
        )}
      </Button>
    );
  }, [opportunity.id, navigate, loading]);

  const stageSelectItems = useMemo(() => {
    return [
      { value: OpportunityStage.New, label: "New" },
      { value: OpportunityStage.ProposalSent, label: "Proposal Sent" },
      { value: OpportunityStage.Negotiation, label: "Negotiation" },
      { value: OpportunityStage.Accepted, label: "Accepted" },
      { value: OpportunityStage.Declined, label: "Declined" },
    ];
  }, []);

  const opportunityDetailsContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <IdCard className="text-muted-foreground h-4 w-4" />{" "}
            <p>
              <span className="font-bold">ID:</span> {opportunity.id}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <User className="text-muted-foreground h-4 w-4" />{" "}
            <p>
              <span className="font-bold">Name:</span> {form.watch("name")}
            </p>
          </div>
        </div>

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
          <label htmlFor="stage" className="flex items-center gap-1 font-bold">
            <UserRoundCheck className="text-muted-foreground h-4 w-4" /> Stage
          </label>
          <SelectComponent
            value={selectedStage}
            onValueChange={(value) => {
              setSelectedStage(value);
              form.setValue("stage", value as OpportunityStage);
            }}
            defaultValue={opportunity.stage}
            placeholder="Stage"
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

        <SheetFooter className="flex flex-row place-content-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => form.handleSubmit(handleSave)()}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </SheetFooter>
      </div>
    );
  }, [form, opportunity, stageSelectItems, isLoading, selectedStage]);

  return (
    <SheetComponent
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={opportunityDetailsTrigger}
      title="Edit Opportunity"
      description="Make changes to the opportunity details here."
      children={opportunityDetailsContent}
    />
  );
};
