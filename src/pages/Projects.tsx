import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Code, FileCode, Database, Shield } from "lucide-react";
import { motion } from "framer-motion"; // Add framer-motion

const projects = [
  {
    name: "RenGoku",
    description: "Your project description here",
    repo: "https://github.com/KANISHQ09/RenGoku.git",
    icon: <Code className="h-6 w-6 text-blue-500" />,
  },
  {
    name: "orthoplay",
    description: "Your project description here",
    repo: "https://github.com/KANISHQ09/orthoplay.git",
    icon: <FileCode className="h-6 w-6 text-green-500" />,
  },
  {
    name: "SmartLog",
    description: "Your project description here",
    repo: "https://github.com/KANISHQ09/SmartLog",
    icon: <Database className="h-6 w-6 text-purple-500" />,
  },
  {
    name: "Product-Ledger",
    description: "Your project description here",
    repo: "https://github.com/KANISHQ09/Product-Ledger",
    icon: <Shield className="h-6 w-6 text-orange-500" />,
  },
  {
    name: "legalease",
    description: "Your project description here",
    repo: "https://github.com/KANISHQ09/legalease",
    icon: <Shield className="h-6 w-6 text-red-500" />,
  },
];

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-green-400 via-yellow-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
        🚀 Projects Hub
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Showcasing my work to build meaningful connections and highlight my skills.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Card className="shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {project.icon}
                    {project.name}
                  </span>
                  <Github className="h-5 w-5 text-gray-600" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                <Button
                  onClick={() => window.open(project.repo, "_blank")}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 hover:scale-105 transition-all duration-300"
                >
                  View Repo
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
