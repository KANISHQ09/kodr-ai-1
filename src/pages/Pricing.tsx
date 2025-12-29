import { Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["Access to basic courses", "Community support", "5 AI explanations per day"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      description: "Best for serious learners",
      features: ["Unlimited AI explanations", "Access to all courses", "Priority support", "Certificates of completion"],
      cta: "Subscribe Now",
      popular: true
    },
    {
      name: "Team",
      price: "$99",
      description: "For small teams and startups",
      features: ["Everything in Pro", "Team dashboard", "Admin controls", "Dedicated account manager"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center py-12 px-4 md:px-6 relative">
      {/* Back to Dashboard Button */}
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 md:top-8 md:left-8 gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back to Dashboard</span>
      </Button>

      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 pt-8 md:pt-0">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose the plan that's right for your learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <Card key={index} className={`flex flex-col relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}