"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Github,
  Mail,
  Calendar,
  Trophy,
  Target,
  Code2,
  Brain,
  Loader2,
  Save, // Icon for save button
  X, // Icon for cancel button
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming you have this component
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner"; // Optional: for notifications (or use alert)

// Firebase Imports
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State for User Auth Data
  const [authUser, setAuthUser] = useState(null);

  // State for Editable Fields
  const [formData, setFormData] = useState({
    displayName: "",
    githubHandle: "@KANISHQ09", // Default if not found
  });

  // State for Database Data (Stats, Skills, etc.)
  const [userStats, setUserStats] = useState({
    linesAnalyzed: 0,
    aiExplanations: 0,
    hoursLearned: 0,
    languages: 0,
  });

  const [skills, setSkills] = useState([
    { name: "JavaScript", level: 0, maxLevel: 100 },
    { name: "Python", level: 0, maxLevel: 100 },
    { name: "Java", level: 0, maxLevel: 100 },
    { name: "C++", level: 0, maxLevel: 100 },
  ]);

  // Fetch Data Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
        
        // Initialize form data with Auth Name
        setFormData(prev => ({
            ...prev,
            displayName: currentUser.displayName || "",
        }));

        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserStats(data.stats || userStats);
            if (data.skills) setSkills(data.skills);
            
            // If Github handle exists in DB, use it
            if (data.githubHandle) {
                setFormData(prev => ({ ...prev, githubHandle: data.githubHandle }));
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle Save Logic
  const handleSaveProfile = async () => {
    if (!authUser) return;
    setSaving(true);

    try {
        // 1. Update Firebase Auth Profile (Display Name)
        if (formData.displayName !== authUser.displayName) {
            await updateProfile(authUser, {
                displayName: formData.displayName
            });
        }

        // 2. Update Firestore Document (Custom fields like Github Handle)
        const userRef = doc(db, "users", authUser.uid);
        await updateDoc(userRef, {
            githubHandle: formData.githubHandle,
            // You can add 'bio' or other fields here
        });

        // 3. Update Local State to reflect changes immediately
        setAuthUser({ ...authUser, displayName: formData.displayName });
        setIsEditing(false);
        // Optional: toast.success("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
        // Optional: toast.error("Failed to update profile");
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-xl font-bold">Please log in to view your profile</h2>
        <Button onClick={() => window.location.href = "/login"}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 border-b border-border bg-card/50"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {authUser.displayName ? `${authUser.displayName}'s Profile` : "My Profile"}
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your learning progress and achievements
        </p>
      </motion.div>

      <div className="flex-1 p-6 space-y-6">
        {/* Profile Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="lg:col-span-1">
              <CardHeader className="text-center relative">
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/20">
                  <AvatarImage src={authUser.photoURL || "/placeholder-avatar.png"} />
                  <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {authUser.displayName ? authUser.displayName[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>

                {/* Conditional Rendering: Edit Mode vs View Mode */}
                {isEditing ? (
                    <div className="space-y-2">
                        <Input 
                            value={formData.displayName}
                            onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                            placeholder="Display Name"
                            className="text-center font-bold h-9"
                        />
                        <CardDescription>Full Stack Developer</CardDescription>
                    </div>
                ) : (
                    <>
                        <CardTitle>{authUser.displayName || "User"}</CardTitle>
                        <CardDescription>Full Stack Developer</CardDescription>
                    </>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm overflow-hidden">
                    <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate" title={authUser.email}>{authUser.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Github className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    {isEditing ? (
                         <Input 
                         value={formData.githubHandle}
                         onChange={(e) => setFormData({...formData, githubHandle: e.target.value})}
                         placeholder="@username"
                         className="h-7 text-xs"
                     />
                    ) : (
                        <span>{formData.githubHandle}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span>Joined {new Date(authUser.metadata.creationTime).getFullYear()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button
                                variant="outline"
                                className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                                onClick={() => setIsEditing(false)}
                                disabled={saving}
                            >
                                <X className="w-4 h-4 mr-2" /> Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={handleSaveProfile}
                                disabled={saving}
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                Save
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full hover:bg-primary hover:text-white transition"
                            onClick={() => setIsEditing(true)}
                        >
                            <User className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/*  - This helps visualize how the stats map to these cards */}
              {[
                { label: "Lines Analyzed", value: userStats.linesAnalyzed, color: "text-primary" },
                { label: "AI Explanations", value: userStats.aiExplanations, color: "text-accent" },
                { label: "Hours Learned", value: userStats.hoursLearned, color: "text-green-400" },
                { label: "Languages", value: userStats.languages, color: "text-purple-400" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Skill Progress */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
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
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, width: "0%" }}
                      animate={{ opacity: 1, width: "100%" }}
                      transition={{ delay: index * 0.3 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}/{skill.maxLevel}
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
