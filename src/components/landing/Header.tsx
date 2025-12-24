import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-background/80 backdrop-blur-md border-b border-white/10 h-16' : 'bg-transparent h-20'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">KODR</div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {['Features', 'How it works', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-white text-black hover:bg-gray-200"
          >
            Sign In
          </Button>
        </div>

        <div className="md:hidden z-50">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: '100vh' }}
               exit={{ opacity: 0, height: 0 }}
               className="absolute top-0 left-0 right-0 bg-background border-b pt-24 px-6 md:hidden flex flex-col items-center space-y-8"
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
                <Button className="w-full max-w-xs" onClick={() => navigate('/auth')}>Sign In</Button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}