import { Button } from "@/components/ui/button";
import { LeadStatus, type Lead } from "@/modules/leads/types";
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

import { Input } from "@/components/ui/input";
import { SelectComponent } from "@/components/shared/select-component";
import { SheetFooter } from "@/components/ui/sheet";
import { toast } from "sonner";
import { SheetComponent } from "@/components/shared/sheet-component";

interface EditLeadProps {
  lead: Lead;
  onUpdateLead: (lead: Lead) => void;
}

export const EditLead = ({ lead, onUpdateLead }: EditLeadProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: lead.name,
    company: lead.company,
    email: lead.email,
    source: lead.source,
    score: lead.score,
    status: lead.status,
  });

  const isEditRoute = location.pathname === `/leads/edit/${lead.id}`;
  const isOpen = isEditRoute;

  const handleCancel = () => {
    setFormData({
      name: lead.name,
      company: lead.company,
      source: lead.source,
      score: lead.score,
      email: lead.email,
      status: lead.status,
    });
    navigate("/leads");
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    onUpdateLead({ ...formData, id: lead.id });
    toast.success("Lead updated successfully!");
    navigate("/leads");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate("/leads");
    }
  };

  const leadDetailsTrigger = useMemo(() => {
    return (
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => navigate(`/leads/edit/${lead.id}`)}
      >
        <PencilIcon className="h-4 w-4" />
      </Button>
    );
  }, [lead.id, navigate]);

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
    <SheetComponent
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={leadDetailsTrigger}
      title="Edit Lead"
      description="Make changes to the lead details here."
      children={leadDetailsContent}
    />
  );
};
