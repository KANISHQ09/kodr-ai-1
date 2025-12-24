import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CardShellProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

function CardShell({ title, subtitle, children, footer }: CardShellProps) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
            
            {/* Back Button */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-6 left-6 z-10"
            >
                <Button 
                    variant="ghost" 
                    onClick={() => navigate('/')}
                    className="gap-2 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Button>
            </motion.div>

            {/* Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="backdrop-blur-xl bg-card/40 border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="p-8 pb-6 text-center">
                        <div className="mb-6 flex justify-center">
                             {/* Small Logo Icon */}
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="font-bold text-white">K</span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
                    </div>

                    <div className="px-8 pb-8">
                        {children}
                    </div>

                    {footer && (
                        <div className="p-4 bg-muted/20 border-t border-white/5 text-center text-sm text-muted-foreground">
                            {footer}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default CardShell;