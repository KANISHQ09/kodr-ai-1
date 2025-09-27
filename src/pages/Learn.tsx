import { BookOpen, Play, Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript with line-by-line AI explanations",
    duration: "4 hours",
    difficulty: "Beginner",
    rating: 4.8,
    students: 1250,
    topics: ["Variables", "Functions", "Objects", "Arrays"]
  },
  {
    title: "Python for Data Science",
    description: "Learn Python programming with focus on data analysis and manipulation",
    duration: "6 hours",
    difficulty: "Intermediate",
    rating: 4.9,
    students: 890,
    topics: ["Pandas", "NumPy", "Data Visualization", "APIs"]
  },
  {
    title: "Java Object-Oriented Programming",
    description: "Understand OOP concepts through practical Java examples",
    duration: "8 hours",
    difficulty: "Intermediate",
    rating: 4.7,
    students: 650,
    topics: ["Classes", "Inheritance", "Polymorphism", "Encapsulation"]
  },
  {
    title: "C++ Algorithm Design",
    description: "Master algorithms and data structures with C++ implementation",
    duration: "10 hours",
    difficulty: "Advanced",
    rating: 4.6,
    students: 420,
    topics: ["Sorting", "Searching", "Trees", "Graphs"]
  }
];

const difficultyColors = {
  "Beginner": "bg-green-500/10 text-green-400",
  "Intermediate": "bg-yellow-500/10 text-yellow-400",
  "Advanced": "bg-red-500/10 text-red-400"
};

export default function Learn() {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/50">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Learning Resources
          </h1>
          <p className="text-muted-foreground mt-2">
            Structured courses with AI-powered line-by-line code explanations
          </p>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Featured Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent" />
                <CardTitle>Featured Course</CardTitle>
              </div>
              <CardDescription>
                Most popular course this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-bold mb-2">JavaScript Fundamentals</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your programming journey with JavaScript. Our AI breaks down every line of code to help you understand the fundamentals.
                  </p>
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className={difficultyColors["Beginner"]}>Beginner</Badge>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">4 hours</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">1,250 students</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
                <div className="hidden md:block">
                  <div className="bg-card/50 rounded-lg p-4 border border-border">
                    <pre className="text-sm font-code">
                      <code className="text-primary">
{`function greetUser(name) {
  // AI explains: This function takes a parameter
  const greeting = "Hello, " + name;
  
  // AI explains: String concatenation
  return greeting;
}

// AI explains: Function call with argument
greetUser("Developer");`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="hover-glow transition-all duration-200 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {course.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={difficultyColors[course.difficulty as keyof typeof difficultyColors]}>
                        {course.difficulty}
                      </Badge>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Topics covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full group">
                      <BookOpen className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}