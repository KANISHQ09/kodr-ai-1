import { useState } from "react";
import { User, Github, Mail, Calendar, Trophy, Target, Code2, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const achievements = [
  {
    id: 1,
    title: "First Code Analysis",
    description: "Completed your first AI-powered code explanation",
    icon: Brain,
    earned: true,
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "JavaScript Explorer",
    description: "Analyzed 50+ lines of JavaScript code",
    icon: Code2,
    earned: true,
    date: "2024-01-20"
  },
  {
    id: 3,
    title: "Multi-Language Learner",
    description: "Worked with 3 different programming languages",
    icon: Target,
    earned: true,
    date: "2024-01-25"
  },
  {
    id: 4,
    title: "Code Master",
    description: "Analyzed 500+ lines of code",
    icon: Trophy,
    earned: false,
    date: null
  }
];

const skillProgress = [
  { name: "JavaScript", level: 75, maxLevel: 100 },
  { name: "Python", level: 60, maxLevel: 100 },
  { name: "Java", level: 45, maxLevel: 100 },
  { name: "C++", level: 30, maxLevel: 100 }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Your Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your learning progress and achievements
        </p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Profile Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-avatar.png" />
                <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <CardTitle>John Developer</CardTitle>
              <CardDescription>Full Stack Developer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>john.dev@example.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Github className="w-4 h-4 text-muted-foreground" />
                  <span>@johndev</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined January 2024</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEditing(!isEditing)}
              >
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Lines Analyzed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">342</div>
                  <div className="text-sm text-muted-foreground">AI Explanations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">24</div>
                  <div className="text-sm text-muted-foreground">Hours Learned</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">4</div>
                  <div className="text-sm text-muted-foreground">Languages</div>
                </CardContent>
              </Card>
            </div>

            {/* Skill Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Skill Progress</span>
                </CardTitle>
                <CardDescription>
                  Your proficiency in different programming languages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}/{skill.maxLevel}
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span>Achievements</span>
            </CardTitle>
            <CardDescription>
              Milestones you've reached in your coding journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    achievement.earned
                      ? "bg-primary/10 border-primary/20 hover:bg-primary/20"
                      : "bg-muted/30 border-muted opacity-50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      achievement.earned
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned ? (
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                        Earned {achievement.date}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}