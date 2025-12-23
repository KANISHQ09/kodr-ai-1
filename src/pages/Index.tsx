import { useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { 
  Code, Play, Zap, Moon, Sun, FileText, 
  GitBranch, Code2, Upload, Brain, Eye, 
  ChevronLeft, ChevronRight, Users, BookOpen, 
  X, Pause, Github, LucideIcon, Menu 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';

// --- UI Components & Utilities ---
import heroimg from '../assets/image.png';
// Placeholder for your UI Button component
import { Button } from '@/components/ui/button'; 

// 1. Motion Wrapper Utility (Original)
interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function MotionWrapper({ children, className = '', delay = 0 }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.35, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. Feature Card Component (Original)
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

// --- Main Sections ---

// 3. Header Component (Added Mobile Menu Logic)
interface HeaderProps {
  onSignInClick?: () => void;
}

function Header({ onSignInClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthNavigation = () => {
    navigate('/auth');
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'glass h-16' : 'bg-transparent h-20'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between backdrop-blur-sm">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2 cursor-pointer z-50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => navigate('/')}
        >
          <div className="text-2xl font-bold text-primary">KODR</div>
          <div className="hidden lg:block text-sm text-muted-foreground">
            Know • Observe • Develop • Run
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Features', 'How it works', 'Docs'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative focus-ring rounded-lg px-2 py-1"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
                style={{ originX: 0 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Desktop Right side */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline"
            onClick={handleAuthNavigation}
            className="focus-ring"
          >
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: '100vh' }}
               exit={{ opacity: 0, height: 0 }}
               className="absolute top-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-b pt-24 px-6 md:hidden flex flex-col items-center space-y-8"
             >
                {['Features', 'How it works', 'Docs'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-medium text-foreground"
                  >
                    {item}
                  </a>
                ))}
                <Button className="w-full max-w-xs" onClick={handleAuthNavigation}>Sign In</Button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
 
interface HeroProps {
  onDemoClick: () => void;
}

function Hero({ onDemoClick }: HeroProps) {
  const features = [
    { icon: Code, text: 'Multi-language (JavaScript, Python, Java, C++, and more)' },
    { icon: Zap, text: 'Real-time line-by-line AI explanations' },
    { icon: Play, text: 'Interactive flowchart & downloadable explanations' },
  ];

  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 code-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />

      <div className="container mx-auto px-6 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <MotionWrapper>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Understand Code
                </span>
                <br />
                <span className="text-foreground">Line by Line.</span>
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Paste any code. Kodr explains every line in plain language and generates
                a flowchart so you can see how it runs.
              </p>
            </MotionWrapper>

            {/* Feature Bullets */}
            <MotionWrapper delay={0.2}>
              <div className="space-y-4 mb-8 text-left inline-block lg:block">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <feature.icon className="w-3 h-3 text-primary" />
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </MotionWrapper>

            {/* CTAs */}
            <MotionWrapper delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={()=> navigate('/auth')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg focus-ring transform hover:scale-105 transition-all duration-200 animate-glow w-full sm:w-auto"
                >
                  Try Kodr
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onDemoClick}
                  className="text-lg font-medium focus-ring w-full sm:w-auto"
                >
                  Or try demo
                </Button>
              </div>
            </MotionWrapper>
          </div>

          {/* Right Column - Hero Image */}
          <MotionWrapper delay={0.5} className="relative order-1 lg:order-2">
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative rounded-2xl overflow-hidden glass p-2 max-w-lg mx-auto lg:max-w-full">
                <img
                  src={heroimg}
                  alt="Developer workspace with AI overlay explaining code"
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                />

                {/* Floating Code Snippet Overlay (Hidden on small mobile) */}
                <motion.div
                  className="hidden sm:block absolute top-4 right-4 glass rounded-lg p-3 text-xs font-mono"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="text-primary">function fibonacci(n) {'{'}</div>
                  <div className="text-muted-foreground ml-2">// AI: Calculates nth Fibonacci number</div>
                  <div className="text-accent">  return n &lt;= 1 ? n : ...</div>
                </motion.div>
              </div>
            </motion.div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}

// 5. Social Proof Component (Responsive Grid)
function SocialProof() {
  const stats = [
    { value: '10k+', label: 'explanations' },
    { value: 'Any', label: 'language' },
    { value: '90%', label: 'satisfaction' },
  ];

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6">
        <MotionWrapper>
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground mb-8">
              Trusted by learners in <span className="text-primary font-semibold">colleges</span>
            </p>
            
            {/* College Logos Placeholder (Flex Wrap) */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 opacity-60">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-lg bg-muted/30 flex items-center justify-center text-xs text-muted-foreground"
                >
                  Logo {index}
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Stats (Stack on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. Features Component (Responsive Grid)
function Features() {
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

// 7. How It Works Component (Fixed Responsiveness)
function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Paste or write code',
      description: 'Support for JS, Python, Java, C++.',
      step: '01',
    },
    {
      icon: Brain,
      title: 'AI explains line-by-line',
      description: 'Detailed, beginner-to-advanced depths.',
      step: '02',
    },
    {
      icon: Eye,
      title: 'See flowchart & learn',
      description: 'Interactive diagram maps to code lines.',
      step: '03',
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <MotionWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How <span className="text-primary">KODR</span> works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to understand any code
            </p>

            {/* Remove the connector line between steps via a scoped CSS rule */}
            <style>{`
              /* Targets the connector element used in steps and hides it */
              #how-it-works div[class*="left-full"][class*="top-1/2"][class*="bg-gradient-to-r"] {
              display: none !important;
              }
            `}</style>
          </div>
        </MotionWrapper>

        {/* FIX: Ensure grid collapses to 1 column on mobile and hides the connector line */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="text-center relative flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl mb-6 relative">
                {step.step}
                
                {/* Connection Line - Hidden on Mobile (hidden md:block) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute left-full top-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                  />
                )}
              </div>

              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card mb-6 group"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <step.icon className="w-10 h-10 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. Build Skills Section (Fixed Responsiveness)
function BuildSkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || shouldReduceMotion) return;
    
    let autoplayTimer: NodeJS.Timeout;
    const play = () => {
      autoplayTimer = setTimeout(() => {
        emblaApi.scrollNext();
        play();
      }, 4000);
    };
    const stop = () => clearTimeout(autoplayTimer);
    play();
    return () => stop();
  }, [emblaApi, shouldReduceMotion]);

  const features = [
    {
      icon: Code,
      badge: "Project",
      title: "Hands-on Projects",
      description: "Build real projects, push to GitHub, showcase skills.",
      codeSnippet: "const portfolio = build()",
      color: "text-brand-cyan"
    },
    {
      icon: Users,
      badge: "AI Mentor",
      title: "Mentored Explanations", 
      description: "AI explains every line and shows flowcharts.",
      codeSnippet: "explain(code, 'detailed')",
      color: "text-brand-amber"
    },
    {
      icon: BookOpen,
      badge: "Path",
      title: "Career Paths",
      description: "Guided learning paths designed for job-ready skills.",
      codeSnippet: "learn.path('fullstack')",
      color: "text-primary"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.1 : 0.45,
        ease: "easeOut"
      }
    }
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.2 }
    }
  };

  const floatingFragments = [
    { code: "const", x: "10%", y: "20%" },
    { code: "=>", x: "85%", y: "30%" },
    { code: "{}", x: "15%", y: "70%" },
    { code: "//", x: "90%", y: "80%" }
  ];

  return (
    <section className="py-20 bg-secondary/5 relative overflow-hidden">
      {/* Floating Background Fragments (Hidden on Mobile to reduce clutter) */}
      <div className="hidden md:block">
        {!shouldReduceMotion && floatingFragments.map((fragment, index) => (
          <motion.div
            key={index}
            className="absolute text-muted-foreground/20 font-mono text-sm pointer-events-none"
            style={{ left: fragment.x, top: fragment.y }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
          >
            {fragment.code}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10"
        >
          {/* FIX: Use Flex Col on Mobile, Grid on Large screens */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6 text-center lg:text-left">
              <motion.h2
                variants={headingVariants}
                className="text-4xl md:text-5xl font-bold text-foreground"
              >
                {shouldReduceMotion ? (
                  "Build skills that stand out"
                ) : (
                  "Build skills that stand out".split(" ").map((word, wordIndex) => (
                    <motion.span key={wordIndex} variants={letterVariants} className="inline-block mr-4">
                      {word}
                    </motion.span>
                  ))
                )}
              </motion.h2>
              
              <motion.p 
                className="text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0.1 : 0.5 }}
              >
                Hands-on projects. Real-world code. Career-ready skills — explained line-by-line by Kodr's AI.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: shouldReduceMotion ? 0.1 : 0.5 }}
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden w-full"
                    onClick={() => navigate('/auth')}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={shouldReduceMotion ? {} : { x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    Explore Paths
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group w-full"
                    onClick={() => {
                      const event = new CustomEvent('openDemo');
                      window.dispatchEvent(event);
                    }}
                  >
                    Try a Demo
                  </Button>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.6, duration: shouldReduceMotion ? 0.1 : 0.3 }}
              >
                No credit card required • Free demo available
              </motion.p>
            </div>

            {/* Right Column - Carousel */}
            {/* FIX: Width constraints on mobile so it doesn't break layout */}
            <motion.div 
              className="relative w-full max-w-md lg:max-w-full mx-auto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0.1 : 0.6 }}
            >
              <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                <div className="flex">
                  {features.map((feature, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                      <motion.div
                        className="bg-card/50 rounded-xl p-6 border border-white/10 backdrop-blur-sm group cursor-pointer"
                        whileHover={shouldReduceMotion ? {} : { 
                          scale: 1.03, 
                          rotateX: -1, 
                          rotateY: 1,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg bg-primary/10 ${feature.color}`}>
                            <feature.icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted/30 text-muted-foreground font-mono">
                            {feature.badge}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                          {feature.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <div className="bg-muted/20 rounded-lg p-3 font-mono text-sm text-muted-foreground border">
                          <motion.div
                            animate={shouldReduceMotion ? {} : {
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {feature.codeSnippet}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === selectedIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      onClick={() => scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollPrev}
                    className="w-8 h-8 rounded-full"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollNext}
                    className="w-8 h-8 rounded-full"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 9. Footer Component (Unchanged)
function Footer() {
  const links = [
    { label: 'About', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and tagline */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-lg font-semibold text-foreground mb-1">KODR</div>
            <div className="text-sm text-muted-foreground">
              Know, Observe, Develop, Run
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded p-1"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* About KODR */}
        <motion.div
          className="mt-8 pt-8 border-t border-border/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            KODR (Know, Observe, Develop, Run) is an AI-powered learning platform that explains 
            code line-by-line and visualizes program logic with flowcharts. Kodr helps learners 
            and developers quickly understand existing code, debug with confidence, and learn 
            programming concepts interactively.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

// 10. Demo Modal Component (Responsive Fix: Scrolling)
interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoCode = [
  'function fibonacci(n) {',
  '  if (n <= 1) return n;',
  '  return fibonacci(n - 1) + fibonacci(n - 2);',
  '}'
];

const explanations = [
  'Defines a function named "fibonacci" that takes a parameter "n"',
  'Base case: if n is 0 or 1, return n directly (0 or 1)',
  'Recursive case: add the two previous Fibonacci numbers',
  'Closes the function definition'
];

function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= demoCode.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentLine >= demoCode.length - 1) {
      setCurrentLine(0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28 }}
          >
            <div
              className="glass rounded-2xl p-6 md:p-8 w-full max-w-3xl relative pointer-events-auto max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 focus-ring"
                onClick={onClose}
                aria-label="Close demo"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">KODR Demo</h2>
                <p className="text-muted-foreground text-sm">
                  Watch how KODR explains code line by line
                </p>
              </div>

              {/* Stack on mobile, side-by-side on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Code Column */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Code</h3>
                  <div className="bg-card rounded-lg p-4 font-mono text-sm border overflow-x-auto">
                    {demoCode.map((line, index) => (
                      <motion.div
                        key={index}
                        className={`py-1 px-2 rounded whitespace-nowrap transition-all duration-300 ${
                          index === currentLine
                            ? 'bg-primary/20 text-primary border-l-2 border-primary'
                            : 'text-muted-foreground'
                        }`}
                        animate={{
                          scale: index === currentLine ? 1.02 : 1,
                        }}
                      >
                        <span className="text-muted-foreground mr-2 select-none">
                          {index + 1}
                        </span>
                        {line}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Explanation Column */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">AI Explanation</h3>
                  <div className="bg-card rounded-lg p-4 border min-h-[150px] md:min-h-[200px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentLine}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm leading-relaxed"
                      >
                        <div className="text-primary font-medium mb-2">
                          Line {currentLine + 1}:
                        </div>
                        <div>{explanations[currentLine]}</div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center mt-8">
                <Button
                  onClick={togglePlayback}
                  className="bg-primary hover:bg-primary/90 focus-ring w-full md:w-auto"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Demo
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {currentLine >= demoCode.length - 1 ? 'Restart Demo' : 'Play Demo'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- Main Page Assembly ---

export function LandingPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  
  // Listen for the custom "openDemo" event dispatched from BuildSkillsSection
  useEffect(() => {
    const handleOpenDemo = () => setIsDemoOpen(true);
    window.addEventListener('openDemo', handleOpenDemo);
    
    return () => {
      window.removeEventListener('openDemo', handleOpenDemo);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 overflow-x-hidden">
      <Header />
      
      <main>
        <Hero 
          onDemoClick={() => setIsDemoOpen(true)} 
        />
        <SocialProof />
        <Features />
        <HowItWorks />
        <BuildSkillsSection />
      </main>

      <Footer />

      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />
    </div>
  );
}