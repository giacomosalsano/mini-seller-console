// src/pages/LeadsPage/components/actions/convert-lead.tsx

import { Button } from "@/components/ui/button";
import type { Lead } from "@/modules/leads/types";
import {
  OpportunityStage,
  type Opportunity,
} from "@/modules/opportunities/types";
import { Building2, DollarSign, TicketCheck, User } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SheetComponent } from "@/components/shared/sheet-component";
import { SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { SelectComponent } from "@/components/shared/select-component";
import { toast } from "sonner";

interface ConvertLeadProps {
  lead: Lead;
  onRemoveLead: (id: string) => void;
  onAddOpportunity: (opportunity: Opportunity) => void;
}

export const ConvertLead = ({
  lead,
  onRemoveLead,
  onAddOpportunity,
}: ConvertLeadProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    stage: OpportunityStage.New,
    amountInCents: 0,
    accountName: lead.company,
  });

  const handleConvert = () => {
    const newOpportunity: Opportunity = {
      ...lead,
      id: `${Math.floor(Math.random() * 101) + 100}`,
      stage: formData.stage,
      amountInCents: formData.amountInCents,
      accountName: formData.accountName,
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

  const convertLeadContent = (
    <div className="flex flex-col gap-6 p-4">
      <div className="space-y-2">
        <label htmlFor="stage" className="flex items-center gap-1 font-bold">
          <User className="text-muted-foreground h-4 w-4" /> Stage
        </label>
        <SelectComponent
          value={formData.stage}
          onValueChange={(value) =>
            setFormData({ ...formData, stage: value as OpportunityStage })
          }
          defaultValue={formData.stage}
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
          type="numeric"
          value={formData.amountInCents}
          onChange={(e) =>
            setFormData({ ...formData, amountInCents: Number(e.target.value) })
          }
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
          value={formData.accountName}
          onChange={(e) =>
            setFormData({ ...formData, accountName: e.target.value })
          }
        />
      </div>
      <SheetFooter className="flex flex-row place-content-end gap-2 pt-4">
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleConvert}>Create Opportunity</Button>
      </SheetFooter>
    </div>
  );

  return (
    <SheetComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button variant="outline" size="sm" type="button">
          <TicketCheck className="h-4 w-4" />
        </Button>
      }
      title={`Convert Lead: ${lead.name}`}
      description="Add the final details to create an opportunity."
      children={convertLeadContent}
    />
  );
};
