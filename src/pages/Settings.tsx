import { useState } from "react";
import { Settings as SettingsIcon, Moon, Sun, Volume2, VolumeX, Bell, BellOff, Palette, Code2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [aiVerbosity, setAiVerbosity] = useState([75]);
  const [editorTheme, setEditorTheme] = useState("dark");
  const [fontSize, setFontSize] = useState([14]);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="flex flex-col h-screen overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize your Kodr experience
        </p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-primary" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>
              Customize the visual appearance of Kodr
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Dark Mode</label>
                <p className="text-xs text-muted-foreground">Use dark theme for better coding experience</p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-muted-foreground" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Editor Theme</label>
              <Select value={editorTheme} onValueChange={setEditorTheme}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark Theme</SelectItem>
                  <SelectItem value="light">Light Theme</SelectItem>
                  <SelectItem value="monokai">Monokai</SelectItem>
                  <SelectItem value="github">GitHub Theme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Font Size</label>
                <span className="text-sm text-muted-foreground">{fontSize[0]}px</span>
              </div>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                max={24}
                min={10}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Code Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span>Code Editor</span>
            </CardTitle>
            <CardDescription>
              Configure your coding environment preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Auto-save</label>
                <p className="text-xs text-muted-foreground">Automatically save your code changes</p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">AI Explanation Detail</label>
                <span className="text-sm text-muted-foreground">{aiVerbosity[0]}%</span>
              </div>
              <Slider
                value={aiVerbosity}
                onValueChange={setAiVerbosity}
                max={100}
                min={25}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Brief</span>
                <span>Detailed</span>
                <span>Comprehensive</span>
                <span>Expert</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Manage how you receive updates and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Push Notifications</label>
                <p className="text-xs text-muted-foreground">Receive notifications about your learning progress</p>
              </div>
              <div className="flex items-center space-x-2">
                <BellOff className="w-4 h-4 text-muted-foreground" />
                <Switch checked={notifications} onCheckedChange={setNotifications} />
                <Bell className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Sound Effects</label>
                <p className="text-xs text-muted-foreground">Play sounds for interactions and achievements</p>
              </div>
              <div className="flex items-center space-x-2">
                <VolumeX className="w-4 h-4 text-muted-foreground" />
                <Switch checked={sounds} onCheckedChange={setSounds} />
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="w-5 h-5 text-primary" />
              <span>About Kodr</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Version:</span>
                <span className="ml-2 font-medium">1.0.0</span>
              </div>
              <div>
                <span className="text-muted-foreground">Build:</span>
                <span className="ml-2 font-medium">2024.01.26</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Kodr is an AI-powered code understanding platform designed to help developers learn programming through line-by-line explanations.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Privacy Policy</Button>
              <Button variant="outline" size="sm">Terms of Service</Button>
              <Button variant="outline" size="sm">Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}