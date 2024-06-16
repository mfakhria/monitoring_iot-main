"use client"
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false); // State untuk checkbox remember me
  const router = useRouter();

  useEffect(() => {
    // Memeriksa localStorage saat komponen dimuat
    const rememberMeStatus = localStorage.getItem("rememberMe") === "true";
    if (rememberMeStatus) {
      const rememberedEmail = localStorage.getItem("rememberedEmail") || "";
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user.uid);

      // Simpan status remember me jika dicentang
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect ke halaman /Status setelah berhasil login
      router.push('/Status');
    } catch (error) {
      const errorMessage = error.message;
      console.error("Firebase Error:", errorMessage);
      setError(errorMessage);
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="flex justify-center max-w-6xl mx-auto h-screen items-center">
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-6">LOGIN</h1>
        <form onSubmit={handleSubmit} className="w-3/4">
          <div className="mb-6">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full py-4 px-8 bg-gray-200 placeholder-gray-600 rounded hover:ring-1 outline-blue-500"
              placeholder="Email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full py-4 px-8 bg-gray-200 placeholder-gray-600 rounded hover:ring-1 outline-blue-500"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="w-4 h-4"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label htmlFor="remember" className="text-sm text-gray-400 ml-2">
              Remember me
            </label>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="py-4 bg-blue-500 w-full rounded text-white font-bold hover:bg-blue-700"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
