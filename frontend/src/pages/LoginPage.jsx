import { useState } from "react";
import { login, signup } from "../api";

export default function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(form.name, form.email, form.password);
        alert("Signup successful, please login");
        setIsSignup(false);
      } else {
        const { data } = await login(form.email, form.password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-3"
      >
        <h1 className="text-xl font-bold text-center mb-2">
          {isSignup ? "Signup" : "Login"}
        </h1>
        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded-lg"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded-lg"
          required
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
          {isSignup ? "Signup" : "Login"}
        </button>
        <p
          className="text-sm text-center text-blue-600 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have account? Login" : "New here? Signup"}
        </p>
      </form>
    </div>
  );
}
