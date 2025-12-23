import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/layout/LoginCard";
import RegisterCard from "../components/layout/RegisterCard";
import { useAuth } from "../context/authContext";

export default function AuthExample() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [userLoggedIn, navigate]);

  return mode === "login" ? (
    <LoginCard onSwitchToRegister={() => setMode("register")} />
  ) : (
    <RegisterCard onSwitchToLogin={() => setMode("login")} />
  );
}
