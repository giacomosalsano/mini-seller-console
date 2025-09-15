import { Button } from "@/components/ui/button";
import type { Lead } from "@/modules/leads/types";
import {
  OpportunityStage,
  type Opportunity,
} from "@/modules/opportunities/types";
import {
  Building2,
  DollarSign,
  User,
  Loader2,
  SquareCheckBig,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SheetComponent } from "@/components/shared/sheet-component";
import { SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { SelectComponent } from "@/components/shared/select-component";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ConvertLeadProps {
  lead: Lead;
  onRemoveLead: (id: string) => void;
  onAddOpportunity: (opportunity: Opportunity) => void;
}

const formSchema = z.object({
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

export const ConvertLead = ({
  lead,
  onRemoveLead,
  onAddOpportunity,
}: ConvertLeadProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string>(
    OpportunityStage.New,
  );

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stage: OpportunityStage.New,
      amountInCents: 0,
      accountName: "",
    },
  });

  const handleConvert = (data: FormSchemaType) => {
    const newOpportunity: Opportunity = {
      ...lead,
      id: `${Math.floor(Math.random() * 201) + 200}`,
      stage: data.stage,
      amountInCents: data.amountInCents,
      accountName: data.accountName,
    };

    onAddOpportunity(newOpportunity);
    onRemoveLead(lead.id);

    toast.success(`Lead ${lead.name} converted to Opportunity!`);
    navigate(`/opportunities/details/${newOpportunity.id}`);
  };

  const stageSelectItems = useMemo(() => {
    return Object.values(OpportunityStage).map((stage) => ({
      value: stage,
      label: stage,
    }));
  }, []);

  const convertLeadContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="space-y-2">
          <label htmlFor="stage" className="flex items-center gap-1 font-bold">
            <User className="text-muted-foreground h-4 w-4" /> Stage
          </label>
          <SelectComponent
            value={selectedStage}
            onValueChange={(value) => {
              setSelectedStage(value);
              form.setValue("stage", value as OpportunityStage);
            }}
            defaultValue={OpportunityStage.New}
            items={stageSelectItems}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="flex items-center gap-1 font-bold">
            <DollarSign className="text-muted-foreground h-4 w-4" /> Amount (in
            cents)
          </label>
          <Input
            id="amount"
            type="number"
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
            <Building2 className="text-muted-foreground h-4 w-4" />
            Account Name
          </label>
          <Input
            id="accountName"
            {...form.register("accountName")}
            errorMessage={form.formState.errors.accountName?.message}
          />
        </div>
        <SheetFooter className="flex flex-row place-content-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            onClick={() => form.handleSubmit(handleConvert)()}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Opportunity
          </Button>
        </SheetFooter>
      </div>
    );
  }, [form, stageSelectItems, selectedStage, form.formState.errors]);

  return (
    <SheetComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button size="sm" type="button">
          <SquareCheckBig className="h-4 w-4" />
        </Button>
      }
      title={`Convert Lead: ${lead.name}`}
      description="Add the final details to convert this lead into an opportunity."
      children={convertLeadContent}
    />
  );
};
