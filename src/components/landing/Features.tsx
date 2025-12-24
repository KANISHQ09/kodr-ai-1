import { motion } from 'framer-motion';
import { FileText, GitBranch, Code2, LucideIcon } from 'lucide-react';
import MotionWrapper from '@/components/landing/MotionWrapper';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="glass rounded-2xl p-6 text-center group hover:bg-card/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      icon: FileText,
      title: 'Line-by-Line Clarity',
      description: 'AI explains each line with examples, edge cases, and common bugs.',
    },
    {
      icon: GitBranch,
      title: 'Visual Flowcharts',
      description: 'Automatic control-flow diagrams to visualize program logic.',
    },
    {
      icon: Code2,
      title: 'IDE & Web Integration',
      description: 'Use Kodr on the web or inside VS Code for a native workflow.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <MotionWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Features that <span className="text-primary">accelerate learning</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to help you understand any codebase quickly and thoroughly
            </p>
          </div>
        </MotionWrapper>

        {/* Responsive Grid: 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}