import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  const signUp = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((user) => user.email === email)) {
      return { success: false, message: "User already exists" };
    }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });
    return { success: true, message: "Sign up successful!" };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });
    return { success: true, message: "Login successful!" };
  };

  const logout = () => {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
