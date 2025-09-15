import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  UserPlus,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Users,
  DollarSign,
  CheckCircle,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Lead Management",
      description:
        "Capture, organize, and track your leads with powerful filtering and search capabilities.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Opportunity Conversion",
      description:
        "Seamlessly convert qualified leads into opportunities with detailed tracking.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics & Insights",
      description:
        "Get valuable insights into your sales pipeline with comprehensive reporting.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Pipeline Management",
      description:
        "Track opportunities through different stages from initial contact to closing.",
    },
  ];

  const stats = [
    {
      label: "Total Leads",
      value: "500+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Active Opportunities",
      value: "150+",
      icon: <Target className="h-5 w-5" />,
    },
    {
      label: "Conversion Rate",
      value: "30%",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: "Revenue Pipeline",
      value: "$2.5M",
      icon: <DollarSign className="h-5 w-5" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Skeleton className="h-16 w-16 rounded-2xl" />
              </div>
              <Skeleton className="mx-auto h-16 w-80" />
              <Skeleton className="mx-auto h-6 w-96" />
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-48" />
            </div>

            <div className="flex justify-center">
              <Skeleton className="h-8 w-64" />
            </div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={index}
                  className="bg-card border-0 text-center shadow-lg"
                >
                  <CardContent className="pt-6">
                    <div className="mb-2 flex justify-center">
                      <Skeleton className="h-6 w-6" />
                    </div>
                    <Skeleton className="mx-auto mb-2 h-8 w-16" />
                    <Skeleton className="mx-auto h-4 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="mb-12 space-y-4 text-center">
              <Skeleton className="mx-auto h-10 w-64" />
              <Skeleton className="mx-auto h-6 w-96" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="bg-card border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                      <Skeleton className="h-6 w-6" />
                    </div>
                    <Skeleton className="mx-auto h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="mx-auto h-4 w-full" />
                    <Skeleton className="mx-auto mt-2 h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl">
              <CardContent className="p-12 text-center">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
                  </div>
                  <Skeleton className="mx-auto h-8 w-64 bg-white/20" />
                  <div className="mt-8 grid gap-8 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <Skeleton className="mx-auto h-8 w-8 rounded-full bg-white/20" />
                        <Skeleton className="mx-auto h-6 w-24 bg-white/20" />
                        <Skeleton className="mx-auto h-4 w-full bg-white/20" />
                        <Skeleton className="mx-auto h-4 w-3/4 bg-white/20" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-20 space-y-6 text-center">
            <Skeleton className="mx-auto h-10 w-80" />
            <Skeleton className="mx-auto h-6 w-96" />
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="from-primary to-secondary flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r text-2xl font-bold text-white shadow-lg">
                MS
              </div>
            </div>
            <h1 className="from-primary via-secondary to-diamond-lead bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Mini-Seller
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl">
              The ultimate sales management platform that transforms your leads
              into opportunities and drives revenue growth.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 bg-gradient-to-r px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              onClick={() => navigate("/leads")}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Manage Leads
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary hover:border-secondary/90 hover:bg-secondary/50 dark:border-secondary/800 dark:hover:border-secondary/700 dark:hover:bg-secondary/950 border-1 px-8 py-4 text-lg font-semibold transition-all duration-300"
              onClick={() => navigate("/opportunities")}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              View Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-success to-emerald-100 px-4 py-2 text-sm font-medium text-green-800 dark:from-green-900 dark:to-emerald-900 dark:text-green-200"
            >
              <Zap className="mr-1 h-4 w-4" />
              Streamline Your Sales Process
            </Badge>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-card border-0 text-center shadow-lg"
              >
                <CardContent className="pt-6">
                  <div className="text-info mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-slate-100">
              Powerful Features
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Everything you need to manage your sales pipeline effectively and
              convert more leads into customers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-card border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <CardHeader className="text-center">
                  <div className="text-info mb-4 flex justify-center transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Card className="border-0 bg-gradient-to-r from-secondary to-accent text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="h-12 w-12 text-success" />
                </div>
                <h3 className="text-3xl font-bold">Why Choose Mini-Seller?</h3>
                <div className="mt-8 grid gap-8 md:grid-cols-3">
                  <div className="space-y-2">
                    <Star className="mx-auto h-8 w-8 text-warning" />
                    <h4 className="text-xl font-semibold">Easy to Use</h4>
                    <p className="text-blue-100">
                      Intuitive interface designed for sales teams of all sizes.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Zap className="mx-auto h-8 w-8 text-warning" />
                    <h4 className="text-xl font-semibold">Fast & Reliable</h4>
                    <p className="text-blue-100">
                      Lightning-fast performance with 99.9% uptime guarantee.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Target className="mx-auto h-8 w-8 text-warning" />
                    <h4 className="text-xl font-semibold">Results Driven</h4>
                    <p className="text-blue-100">
                      Proven to increase conversion rates and sales efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 space-y-6 text-center">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Ready to Transform Your Sales Process?
          </h3>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Join thousands of sales professionals who trust Mini-Seller to
            manage their pipeline and drive revenue growth.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-gradient-to-r from-secondary to-accent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-secondary/90 hover:to-accent/90 hover:shadow-xl"
              onClick={() => navigate("/leads")}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Get Started with Leads
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-1 border-accent px-8 py-4 text-lg font-semibold transition-all duration-300 hover:border-accent/90 hover:bg-accent/50 dark:border-accent/800 dark:hover:border-accent/700 dark:hover:bg-accent/950"
              onClick={() => navigate("/opportunities")}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Explore Opportunities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
