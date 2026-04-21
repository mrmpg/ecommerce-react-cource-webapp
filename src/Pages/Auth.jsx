import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("signUp");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);
    let result;
    // alert(`${mode === "signup" ? "Sign Up" : "Login"} successful!`);
    if (mode === "signUp") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    if (!result.success) {
      setError(result.message);
    } else {
      navigate("/"); // Redirect to home page after successful login/signup
    }
  }
  return (
    <div className="page auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="page-title  ">
            {mode === "signUp" ? "Sign Up" : "Login"}
          </div>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="form-input"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-input"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-large ">
              {mode === "signUp" ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signUp" ? (
              <p>
                Already have an account?{" "}
                <span
                  to="/login"
                  className="btn auth-link"
                  onClick={() => setMode("login")}
                >
                  Login In
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  to="/signup"
                  className="btn auth-link"
                  onClick={() => setMode("signUp")}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
