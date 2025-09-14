import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, UserPlus } from "lucide-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="mb-10 flex flex-col items-center gap-4">
        <div className="text-muted-foreground text-7xl font-extrabold">404</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="text-muted-foreground max-w-lg text-sm sm:text-base">
          The page you are looking for does not exist or has been moved. You can
          navigate to another section below.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => navigate("/leads")}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          View Leads
        </Button>
        <Button
          onClick={() => navigate("/opportunities")}
          className="flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          View Opportunities
        </Button>
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
      </div>
    </div>
  );
};
