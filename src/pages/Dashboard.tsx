import { useState } from "react";
import { 
  Code2, 
  Brain, 
  Clock, 
  TrendingUp, 
  Play, 
  FileText,
  Star,
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-coding.jpg";

const recentActivity = [
  {
    id: 1,
    title: "JavaScript Function Analysis",
    language: "JavaScript",
    date: "2 hours ago",
    linesAnalyzed: 15,
    status: "completed"
  },
  {
    id: 2,
    title: "Python Data Processing",
    language: "Python",
    date: "5 hours ago",
    linesAnalyzed: 32,
    status: "completed"
  },
  {
    id: 3,
    title: "Java Class Structure",
    language: "Java",
    date: "1 day ago",
    linesAnalyzed: 28,
    status: "completed"
  },
  {
    id: 4,
    title: "C++ Algorithm Implementation",
    language: "C++",
    date: "2 days ago",
    linesAnalyzed: 45,
    status: "completed"
  }
];

const quickStats = [
  {
    title: "Lines Analyzed",
    value: "1,247",
    change: "+12%",
    icon: Code2,
    color: "text-blue-400"
  },
  {
    title: "AI Explanations",
    value: "342",
    change: "+8%",
    icon: Brain,
    color: "text-purple-400"
  },
  {
    title: "Learning Hours",
    value: "24.5",
    change: "+15%",
    icon: Clock,
    color: "text-green-400"
  },
  {
    title: "Concepts Mastered",
    value: "18",
    change: "+3",
    icon: TrendingUp,
    color: "text-yellow-400"
  }
];

const popularLanguages = [
  { name: "JavaScript", usage: 85, color: "bg-yellow-400" },
  { name: "Python", usage: 72, color: "bg-blue-400" },
  { name: "Java", usage: 58, color: "bg-red-400" },
  { name: "C++", usage: 41, color: "bg-green-400" }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome back, Developer!
            </h1>
            <p className="text-muted-foreground mt-2">
              Ready to understand code line by line with AI assistance?
            </p>
          </div>
          <Button 
            onClick={() => navigate("/playground")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Coding
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="AI-powered coding workspace" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
          </div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-Powered Code Understanding
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Dive deep into code with line-by-line AI explanations. Master programming concepts faster with intelligent insights tailored to your learning style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/playground")}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Analyzing Code
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/learn")}
                  className="text-lg px-8 py-3 border-primary/30 hover:bg-primary/10"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Explore Courses
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover-glow transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-400">{stat.change}</span> from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Recent Analysis</span>
                </CardTitle>
                <CardDescription>
                  Your latest code explanations and learning sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => navigate("/playground")}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {activity.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {activity.language}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {activity.linesAnalyzed} lines analyzed
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {activity.date}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Language Usage */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Language Usage</span>
                </CardTitle>
                <CardDescription>
                  Your most analyzed programming languages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularLanguages.map((language, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{language.name}</span>
                      <span className="text-xs text-muted-foreground">{language.usage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${language.color} transition-all duration-500`}
                        style={{ width: `${language.usage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/playground")}
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  New Code Analysis
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/learn")}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Learning Resources
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/profile")}
                >
                  <Star className="w-4 h-4 mr-2" />
                  View Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}