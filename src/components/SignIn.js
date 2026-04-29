import React, { useState } from "react";
import Field from "./Field";
import { login } from "../api/auth";

function SignIn({ onSignIn, onGoSignUp, onGoHome }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [err, setErr] = useState("");

  const set = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handle = async () => {
    setErr("");

    if (!form.email || !form.password)
      return setErr("Please fill in all fields.");

    try {
      const res = await login({
        username: form.email,
        password: form.password
      });

      if (res.data.includes("success")) {
        onSignIn({ email: form.email });
      } else {
        setErr(res.data);
      }

    } catch (e) {
      setErr("Login failed ❌");
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
      
      {/* TOP BAR */}
      <div className="auth-topbar">
        <div style={{ cursor: "pointer" }} onClick={onGoHome}>
          <LogoMark sz={30} fs={15} />
        </div>
      </div>

      <div className="auth-page" style={{ flex: 1 }}>
        
        {/* LEFT SIDE */}
        <div className="auth-left">
          <h2 className="auth-left-h">Welcome back to<br/>NeuralOps</h2>
          <p className="auth-left-sub">
            Thousands of engineering teams rely on NeuralOps.
          </p>

          <div className="proof-list">
            {[
              { i: "✅", t: "99.99% uptime SLA across all regions" },
              { i: "⚡", t: "Sub-second API response times" }
            ].map((p, k) => (
              <div className="proof-item" key={k}>
                <div className="proof-icon">{p.i}</div>
                <span>{p.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <div className="auth-card">

            <div className="auth-title">Sign in</div>

            <div className="auth-sub2">
              Don’t have an account?{" "}
              <button onClick={onGoSignUp}>Sign Up</button>
            </div>

            {err && <div className="err-msg">⚠ {err}</div>}

            <Field
              label="Email Address"
              icon="✉️"
              type="email"
              name="email"
              value={form.email}
              onChange={set}
              placeholder="you@company.com"
            />

            <Field
              label="Password"
              icon="🔒"
              type="password"
              name="password"
              value={form.password}
              onChange={set}
              placeholder="Enter your password"
            />

            <button className="btn-auth" onClick={handle}>
              Sign In →
            </button>

            <div className="auth-footer">
              New to NeuralOps?{" "}
              <button onClick={onGoSignUp}>Create Account</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default SignIn;
