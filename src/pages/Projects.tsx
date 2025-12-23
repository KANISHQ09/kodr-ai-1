import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Code, FileCode, Database, Shield, ArrowUpRight, Layers } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    name: "RenGoku",
    description: "An advanced code analysis tool designed to simplify complex logic interpretation.",
    repo: "https://github.com/KANISHQ09/RenGoku.git",
    icon: <Code className="h-5 w-5 md:h-6 md:w-6 text-white" />,
    color: "from-blue-500 to-cyan-500",
    tags: ["React", "AI", "Analysis"]
  },
  {
    name: "Orthoplay",
    description: "Interactive gaming platform bringing classic orthopedic learning to a digital space.",
    repo: "https://github.com/KANISHQ09/orthoplay.git",
    icon: <FileCode className="h-5 w-5 md:h-6 md:w-6 text-white" />,
    color: "from-green-500 to-emerald-500",
    tags: ["Game Dev", "Education", "Web"]
  },
  {
    name: "SmartLog",
    description: "Intelligent logging system ensuring data integrity and real-time monitoring.",
    repo: "https://github.com/KANISHQ09/SmartLog",
    icon: <Database className="h-5 w-5 md:h-6 md:w-6 text-white" />,
    color: "from-purple-500 to-indigo-500",
    tags: ["Backend", "Database", "Security"]
  },
  {
    name: "Product-Ledger",
    description: "Blockchain-based ledger for tracking product lifecycle and supply chain transparency.",
    repo: "https://github.com/KANISHQ09/Product-Ledger",
    icon: <Layers className="h-5 w-5 md:h-6 md:w-6 text-white" />,
    color: "from-orange-500 to-amber-500",
    tags: ["Blockchain", "Supply Chain", "DApp"]
  },
  {
    name: "Legalease",
    description: "AI-powered legal document simplifier making law accessible to everyone.",
    repo: "https://github.com/KANISHQ09/legalease",
    icon: <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" />,
    color: "from-red-500 to-rose-500",
    tags: ["AI", "Legal", "NLP"]
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-h-screen bg-background w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="relative pt-12 pb-8 px-4 md:pt-20 md:pb-12 md:px-8">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Projects Hub
              </span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed">
              A collection of my technical endeavors, ranging from AI tools to blockchain solutions. 
              Explore the code that powers my ideas.
            </p>
          </motion.div>
        </div>
        
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 -z-10 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      </div>

      {/* Projects Grid */}
      <div className="px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="group h-full flex flex-col overflow-hidden border-border/50 bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className={`h-2 w-full bg-gradient-to-r ${project.color}`} />
                
                <CardContent className="p-5 md:p-6 flex flex-col flex-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} shadow-sm`}>
                      {project.icon}
                    </div>
                    <a 
                      href={project.repo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-1"
                    >
                      <Github className="h-5 w-5 md:h-6 md:w-6" />
                    </a>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm md:text-base text-muted-foreground mb-6 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-medium px-2 py-1 bg-secondary/50 rounded-md text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      onClick={() => window.open(project.repo, "_blank")}
                      variant="outline"
                      className="w-full justify-between group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300"
                    >
                      <span>View Repository</span>
                      <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
