import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogComponentProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  closeButton: React.ReactNode;
  dialogContentClassName?: string;
  dialogFooterClassName?: string;
}

export function DialogComponent({
  trigger,
  title,
  description,
  children,
  footer,
  closeButton,
  dialogContentClassName,
  dialogFooterClassName,
}: DialogComponentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={dialogContentClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className={dialogFooterClassName}>
          {footer}
          {closeButton}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
