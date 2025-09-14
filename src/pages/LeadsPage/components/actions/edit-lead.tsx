// src/pages/LeadsPage/components/actions/lead-detail.tsx

import { Button } from "@/components/ui/button";
import { LeadStatus, type Lead } from "@/modules/leads/types"; // Importe LeadStatus
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

import { useMemo, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { SelectComponent } from "@/components/shared/select-component";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

interface EditLeadProps {
  lead: Lead;
  onUpdateLead: (lead: Lead) => void;
}

export const EditLead = ({ lead, onUpdateLead }: EditLeadProps) => {
  const [formData, setFormData] = useState({
    name: lead.name,
    company: lead.company,
    email: lead.email,
    source: lead.source,
    score: lead.score,
    status: lead.status,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFormData({
      name: lead.name,
      company: lead.company,
      source: lead.source,
      score: lead.score,
      email: lead.email,
      status: lead.status,
    });
  }, [lead]);

  const handleCancel = () => {
    setFormData({
      name: lead.name,
      company: lead.company,
      source: lead.source,
      score: lead.score,
      email: lead.email,
      status: lead.status,
    });
    setIsOpen(false);
  };

  const handleSave = () => {
    console.log("Salvando dados:", formData);
    onUpdateLead({ ...formData, id: lead.id });
    toast.success("Lead updated successfully!");
    setIsOpen(false);
  };

  const leadDetailsTrigger = useMemo(() => {
    return (
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <PencilIcon className="h-4 w-4" />
      </Button>
    );
  }, []);

  const statusSelectItems = useMemo(() => {
    return Object.values(LeadStatus).map((status) => ({
      value: status,
      label: status,
    }));
  }, []);

  const leadDetailsContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <IdCard className="text-muted-foreground h-4 w-4" />{" "}
            <p>
              <span className="font-bold">ID:</span> {lead.id}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <User className="text-muted-foreground h-4 w-4" />{" "}
            <p>
              <span className="font-bold">Name:</span> {formData.name}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="flex items-center gap-1 font-bold">
            <User className="text-muted-foreground h-4 w-4" /> Name
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter name"
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
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            placeholder="Enter company"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center gap-1 font-bold">
            <AtSign className="text-muted-foreground h-4 w-4" /> Email
          </label>
          <Input
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter email"
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
            value={formData.score}
            onChange={(e) =>
              setFormData({ ...formData, score: Number(e.target.value) })
            }
            placeholder="Enter score"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="source" className="flex items-center gap-1 font-bold">
            <Globe className="text-muted-foreground h-4 w-4" /> Source
          </label>
          <Input
            id="source"
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
            placeholder="Enter source"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="flex items-center gap-1 font-bold">
            <UserRoundCheck className="text-muted-foreground h-4 w-4" /> Status
          </label>
          <SelectComponent
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as LeadStatus })
            }
            defaultValue={formData.status}
            items={statusSelectItems}
          />
        </div>

        <SheetFooter className="flex flex-row place-content-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </SheetFooter>
      </div>
    );
  }, [formData, lead, statusSelectItems]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{leadDetailsTrigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Lead</SheetTitle>
          <SheetDescription>
            Make changes to the lead details here.
          </SheetDescription>
        </SheetHeader>
        {leadDetailsContent}
      </SheetContent>
    </Sheet>
  );
};
