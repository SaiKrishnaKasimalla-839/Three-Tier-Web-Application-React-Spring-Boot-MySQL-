import { useState } from "react";
import { signup } from "../api/auth";

/* keep your existing Field + LogoMark imports if already in your project */
import Field from "./Field"; // if separated
import LogoMark from "./LogoMark"; // if separated

function SignUp({ onGoSignIn, onSignUp, onGoHome }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    github: "",
    password: ""
  });

  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const set = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // ✅ BACKEND CONNECTED HANDLE
  const handle = async () => {
    if (Object.values(form).some((v) => !v))
      return setErr("All fields are required.");

    if (!/\S+@\S+\.\S+/.test(form.email))
      return setErr("Enter a valid email address.");

    if (!/^\+?\d{7,15}$/.test(form.mobile.replace(/\s/g, "")))
      return setErr("Enter a valid mobile number.");

    try {
      await signup({
        username: form.email,
        password: form.password
      });

      setErr("");
      setOk("Account created! 🚀");

      setTimeout(() => onSignUp(form), 900);

    } catch (e) {
      setErr("Signup failed ❌");
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
          <h2 className="auth-left-h">Build your first<br/>AI agent today</h2>
          <p className="auth-left-sub">
            No credit card required. Get up and running with 2 free agents and 5,000 runs per month — forever.
          </p>

          <div className="proof-list">
            {[
              { i: "🚀", t: "Deploy your first agent in under 5 minutes" },
              { i: "🆓", t: "Free tier — no credit card required" },
              { i: "🌍", t: "12,000+ teams already onboard" }
            ].map((p, k) => (
              <div className="proof-item" key={k}>
                <div className="proof-icon">{p.i}</div>
                <span>{p.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right" style={{ width: 520 }}>
          <div className="auth-card">

            <div className="auth-title">Create your account</div>
            <div className="auth-sub2">
              Already have one?{" "}
              <button onClick={onGoSignIn}>Sign in</button>
            </div>

            {err && <div className="err-msg">⚠ {err}</div>}
            {ok && <div className="ok-msg">✓ {ok}</div>}

            <div className="form-row2">
              <Field label="First Name" icon="👤" name="firstName" value={form.firstName} onChange={set} placeholder="Ada" />
              <Field label="Last Name" icon="👤" name="lastName" value={form.lastName} onChange={set} placeholder="Lovelace" />
            </div>

            <Field label="Email Address" icon="✉️" type="email" name="email" value={form.email} onChange={set} placeholder="you@company.com" />
            <Field label="Mobile Number" icon="📱" type="tel" name="mobile" value={form.mobile} onChange={set} placeholder="+1 555 000 0000" />
            <Field label="GitHub Username" icon="🐙" name="github" value={form.github} onChange={set} placeholder="octocat" />
            <Field label="Password" icon="🔒" type="password" name="password" value={form.password} onChange={set} placeholder="Min 8 characters" />

            <button className="btn-auth" onClick={handle}>
              Create Account →
            </button>

            <div className="auth-footer">
              By signing up you agree to our <button>Terms</button> & <button>Privacy Policy</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
