import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from '@/components/landing/Header';
import Preloader from '@/components/ui/preloader';

// Lazy load sections for better initial performance
const Hero = lazy(() => import('@/components/landing/Hero'));
const SocialProof = lazy(() => import('@/components/landing/SocialProof'));
const Features = lazy(() => import('@/components/landing/Features'));
const HowItWorks = lazy(() => import('@/components/landing/HowItWorks'));
const BuildSkillsSection = lazy(() => import('@/components/landing/BuildSkills'));
const Footer = lazy(() => import('@/components/landing/Footer'));
const DemoModal = lazy(() => import('@/components/landing/DemoModal'));

export function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  useEffect(() => {
    // Show Preloader for 2 seconds to ensure animation completes or data loads
    const timer = setTimeout(() => setLoading(false), 2000);

    const handleOpenDemo = () => setIsDemoOpen(true);
    window.addEventListener('openDemo', handleOpenDemo);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('openDemo', handleOpenDemo);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 overflow-x-hidden">
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      {!loading && (
        <>
          <Header />
          <main>
            <Suspense fallback={<div className="h-screen w-full" />}>
              <Hero onDemoClick={() => setIsDemoOpen(true)} />
              <SocialProof />
              <Features />
              <HowItWorks />
              <BuildSkillsSection />
            </Suspense>
          </main>
          <Suspense fallback={<div className="h-20" />}>
            <Footer />
            <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
          </Suspense>
        </>
      )}
    </div>
  );
}