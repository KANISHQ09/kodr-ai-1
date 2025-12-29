import { BookOpen, Play, Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-x-hidden overflow-y-auto w-full bg-background">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-border bg-card/50">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Learning Resources
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Structured courses with AI-powered line-by-line code explanations
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Featured Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 transition-transform duration-300 cursor-pointer overflow-hidden">
              <CardHeader className="p-4 md:p-6 pb-2 md:pb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-accent" />
                  <CardTitle className="text-lg md:text-xl">Featured Course</CardTitle>
                </div>
                <CardDescription>
                  Most popular course this month
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-2 md:pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">JavaScript Fundamentals</h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Start your programming journey with JavaScript. Our AI breaks down every line of code to help you understand the fundamentals.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      <Badge className={difficultyColors["Beginner"]}>Beginner</Badge>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>4 hours</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>1,250 students</span>
                      </div>
                    </div>

                    <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all">
                      <Play className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                  </div>
                  
                  {/* Code block hidden on mobile, visible on lg screens */}
                  <div className="hidden lg:block">
                    <div className="bg-card/80 backdrop-blur rounded-lg p-4 border border-border shadow-sm">
                      <pre className="text-xs md:text-sm font-code overflow-x-auto">
                        <code className="text-primary block">
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
          </motion.div>

          {/* Course Grid */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">All Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300 cursor-pointer">
                    <CardHeader className="p-4 md:p-6 pb-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <CardTitle className="text-base md:text-lg leading-tight">{course.title}</CardTitle>
                          <CardDescription className="line-clamp-2 text-xs md:text-sm">
                            {course.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4 md:p-6 pt-2 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
                          <Badge className={`${difficultyColors[course.difficulty as keyof typeof difficultyColors]} text-xs`}>
                            {course.difficulty}
                          </Badge>
                          <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 md:w-4 md:h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3 md:w-4 md:h-4" />
                              <span>{course.students}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">Topics:</p>
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {course.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="secondary" className="text-[10px] md:text-xs font-normal">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full mt-4 group hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={() => navigate("/pricing")}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Enroll Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}