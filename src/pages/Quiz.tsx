import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Brain, 
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const questionBank: Question[] = [
    { id: 1, question: "What is the correct way to declare a variable in JavaScript?", options: ["variable x = 5;", "let x = 5;", "v x = 5;", "declare x = 5;"], correctAnswer: 1, explanation: "The 'let' keyword is the modern way to declare variables in JavaScript, providing block scope." },
    { id: 2, question: "Which method adds an element to the end of an array?", options: ["array.add()", "array.append()", "array.push()", "array.insert()"], correctAnswer: 2, explanation: "The push() method adds one or more elements to the end of an array." },
    { id: 3, question: "What does '===' operator do in JavaScript?", options: ["Checks value only", "Checks type only", "Checks both value and type", "Assigns a value"], correctAnswer: 2, explanation: "The '===' operator performs strict equality comparison, checking both value and type." },
    { id: 4, question: "How do you create a function in JavaScript?", options: ["create function myFunc() {}", "function myFunc() {}", "def myFunc() {}", "func myFunc() {}"], correctAnswer: 1, explanation: "Functions in JavaScript are declared using the 'function' keyword." },
    { id: 5, question: "What is the output of console.log(typeof null)?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correctAnswer: 2, explanation: "typeof null returns 'object' due to a historical bug in JavaScript." },
    { id: 6, question: "Which company developed JavaScript?", options: ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"], correctAnswer: 2, explanation: "JavaScript was created by Netscape in 1995." },
    { id: 7, question: "Which symbol is used for comments in JavaScript?", options: ["//", "##", "<!-- -->", "/* */"], correctAnswer: 0, explanation: "Single-line comments use //, while multi-line uses /* */." }
  ];

  const [questions] = useState<Question[]>(() => [...questionBank].sort(() => Math.random() - 0.5).slice(0, 5));

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => currentQuestion < questions.length - 1 ? setCurrentQuestion(currentQuestion + 1) : finishQuiz();
  const previousQuestion = () => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);

  const finishQuiz = () => {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => answer === questions[index].correctAnswer ? count + 1 : count, 0);
    setScore(correctAnswers);
    setShowResults(true);
  };

  const restartQuiz = () => window.location.reload();
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  const progress = (selectedAnswers.filter(a => a !== undefined).length / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <header className="border-b border-border bg-card/50 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Dashboard
            </Button>
            <h1 className="font-bold text-lg">Quiz Results</h1>
          </div>
        </header>

        <div className="p-6 max-w-3xl mx-auto space-y-6">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none shadow-xl text-center">
            <CardHeader>
              {score >= questions.length / 2 ? <Trophy className="h-12 w-12 mx-auto text-primary" /> : <Brain className="h-12 w-12 mx-auto text-muted-foreground" />}
              <CardTitle className="text-3xl mt-2">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">You scored <span className="font-bold text-primary">{score}</span> out of {questions.length}</p>
              <Progress value={(score / questions.length) * 100} className="h-2" />
              <div className="mt-4 flex gap-4 justify-center">
                <Button onClick={restartQuiz} variant="outline"><RotateCcw className="h-4 w-4 mr-2" /> Retry</Button>
                <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90">Return to Dashboard</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Review Your Answers</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="p-4 rounded-lg border space-y-2">
                  <div className="flex justify-between items-center">
                    <h4>{i + 1}. {q.question}</h4>
                    {selectedAnswers[i] === q.correctAnswer ? <CheckCircle className="h-5 w-5 text-success" /> : <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                  {q.options.map((opt, idx) => (
                    <div key={idx} className={`p-2 rounded text-sm ${idx === q.correctAnswer ? "bg-success/20 text-success" : selectedAnswers[i] === idx ? "bg-destructive/20 text-destructive" : "bg-muted"}`}>{opt}</div>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2"><b>Explanation:</b> {q.explanation}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div className="flex items-center gap-4">
            <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> {formatTime(timeElapsed)}</Badge>
            <Badge variant="outline">{currentQuestion + 1} / {questions.length}</Badge>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mt-1" />
        </div>

        <Card className="shadow-lg border-none">
          <CardHeader><CardTitle>{questions[currentQuestion].question}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {questions[currentQuestion].options.map((opt, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Button
                  variant={selectedAnswers[currentQuestion] === idx ? "default" : "outline"}
                  className={`w-full justify-start text-left p-4 h-auto transition-colors duration-200
                    ${selectedAnswers[currentQuestion] === idx
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      : "hover:bg-white hover:text-black"
                    }`}
                  onClick={() => handleAnswerSelect(idx)}
                >
                  <span className="mr-3 font-mono">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button onClick={previousQuestion} disabled={currentQuestion === 0} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90"
          >
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
