import { useState } from "react";
import { 
  Code2, Brain, Clock, TrendingUp, Play, FileText, Star, ArrowRight, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-coding.jpg";

const recentActivity = [
  { id: 1, title: "JavaScript Function Analysis", language: "JavaScript", date: "2h ago", linesAnalyzed: 15 },
  { id: 2, title: "Python Data Processing", language: "Python", date: "5h ago", linesAnalyzed: 32 },
  { id: 3, title: "Java Class Structure", language: "Java", date: "1d ago", linesAnalyzed: 28 },
  { id: 4, title: "C++ Algorithm Implementation", language: "C++", date: "2d ago", linesAnalyzed: 45 }
];

const quickStats = [
  { title: "Lines Analyzed", value: "1,247", change: "+12%", icon: Code2, color: "text-blue-400" },
  { title: "AI Explanations", value: "342", change: "+8%", icon: Brain, color: "text-purple-400" },
  { title: "Learning Hours", value: "24.5", change: "+15%", icon: Clock, color: "text-green-400" },
  { title: "Concepts Mastered", value: "18", change: "+3", icon: TrendingUp, color: "text-yellow-400" }
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
    <div className="flex flex-col h-screen overflow-x-hidden overflow-y-auto bg-background w-full">
      {/* Header */}
      <motion.div 
        className="p-4 border-b border-border bg-card/50"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              Welcome back, Developer!
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Ready to understand code line by line?
            </p>
          </div>
          <Button 
            onClick={() => navigate("/playground")}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Play className="w-4 h-4 mr-2" /> Start Coding
          </Button>
        </div>
      </motion.div>

      <div className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Hero Section */}
        <motion.div 
          className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20"
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0">
            <img src={heroImage} alt="AI-powered coding workspace" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
          </div>
          <div className="relative z-10 p-4 sm:p-6 md:p-12">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Code Analysis
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Master concepts with line-by-line AI explanations tailored to your style.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <Button 
                  onClick={() => navigate("/playground")}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 h-10 sm:h-12 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 mr-2" /> Start Analyzing
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/learn")}
                  className="w-full h-10 sm:h-12 border-primary/30 hover:bg-primary/10 text-sm sm:text-base"
                >
                  <FileText className="w-4 h-4 mr-2" /> Explore Courses
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="hover-glow transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-400">{stat.change}</span> vs last week
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Recent Analysis</span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Your latest code explanations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className="flex flex-col p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group gap-3"
                      whileHover={{ scale: 1.01 }}
                      onClick={() => navigate("/playground")}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {/* Top Row: Icon + Title */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm sm:text-base truncate pr-1 group-hover:text-primary transition-colors">
                            {activity.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <Badge variant="outline" className="text-[10px] sm:text-xs h-5 px-1.5">
                              {activity.language}
                            </Badge>
                            <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                              {activity.linesAnalyzed} lines
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Row: Date + Arrow */}
                      <div className="flex items-center justify-between pt-1 border-t border-border/50 mt-1">
                        <span className="text-[10px] sm:text-sm text-muted-foreground">{activity.date}</span>
                        <div className="flex items-center text-[10px] sm:text-sm text-primary font-medium opacity-80 group-hover:opacity-100">
                          View
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Language Usage & Quick Actions */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
                  {popularLanguages.map((language, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium">{language.name}</span>
                        <span className="text-muted-foreground">{language.usage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                        <motion.div 
                          className={`h-1.5 sm:h-2 rounded-full ${language.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${language.usage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-4 pt-0 sm:p-6 sm:pt-0">
                  <Button variant="outline" className="w-full justify-start h-9 sm:h-10 text-sm" onClick={() => navigate("/playground")}>
                    <Code2 className="w-4 h-4 mr-2" /> New Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-9 sm:h-10 text-sm" onClick={() => navigate("/learn")}>
                    <Brain className="w-4 h-4 mr-2" /> Learning
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-9 sm:h-10 text-sm" onClick={() => navigate("/profile")}>
                    <Star className="w-4 h-4 mr-2" /> Progress
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
