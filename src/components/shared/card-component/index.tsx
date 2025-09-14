import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardComponentProps {
  title?: string;
  description?: string;
  cardContent: React.ReactNode;
  cardHeader?: React.ReactNode;
}

export function CardComponent({
  title,
  description,
  cardContent,
  cardHeader,
}: CardComponentProps) {
  return (
    <Card className="w-full">
      {cardHeader ? (
        cardHeader
      ) : title || description ? (
        <CardHeader>
          {title && (
            <CardTitle className="flex flex-row items-center justify-center gap-2 text-center text-lg font-bold">
              {title}
            </CardTitle>
          )}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      ) : null}
      <CardContent>{cardContent}</CardContent>
    </Card>
  );
}
