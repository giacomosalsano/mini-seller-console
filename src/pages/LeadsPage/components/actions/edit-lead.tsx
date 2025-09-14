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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SelectComponent } from "@/components/shared/select-component";
import { SheetFooter } from "@/components/ui/sheet";
import { SheetComponent } from "@/components/shared/sheet-component";
import { Loader2 } from "lucide-react";

interface EditLeadProps {
  lead: Lead;
  onUpdateLead: (lead: Lead) => void;
  loading: boolean;
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

export const EditLead = ({ lead, onUpdateLead, loading }: EditLeadProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedStatus, setSelectedStatus] = useState<string>(lead.status);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: lead.name,
      company: lead.company,
      email: lead.email,
      source: lead.source,
      score: lead.score,
      status: lead.status,
    },
  });

  const isEditRoute = location.pathname === `/leads/edit/${lead.id}`;
  const isOpen = isEditRoute;
  const isLoading = loading || form.formState.isSubmitting;

  const handleCancel = () => {
    form.reset({
      name: lead.name,
      company: lead.company,
      source: lead.source,
      score: lead.score,
      email: lead.email,
      status: lead.status,
    });
    navigate("/leads");
  };

  const handleSave = (data: FormSchemaType) => {
    onUpdateLead({ ...data, id: lead.id });
    navigate("/leads");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
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
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <PencilIcon className="h-4 w-4" />
        )}
      </Button>
    );
  }, [lead.id, navigate, loading]);

  const statusSelectItems = useMemo(() => {
    return [
      { value: LeadStatus.New, label: "New" },
      { value: LeadStatus.Contacted, label: "Contacted" },
      { value: LeadStatus.Qualified, label: "Qualified" },
      { value: LeadStatus.Unqualified, label: "Unqualified" },
    ];
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
            onValueChange={(value) => {
              setSelectedStatus(value);
              form.setValue("status", value as LeadStatus);
            }}
            defaultValue={lead.status}
            placeholder="Status"
            items={statusSelectItems}
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
  }, [form, lead, statusSelectItems, isLoading, selectedStatus]);

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
