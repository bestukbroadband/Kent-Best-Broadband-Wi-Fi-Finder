/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, ShieldAlert, ArrowRight } from "lucide-react";
import siteConfig from "../config/siteConfig";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    // Enforce case-insensitive check and accept both email prefix and full email
    const cleanUser = username.trim().toLowerCase();
    const allowedUsernames = ["joshua.greedy.voneus@gmail.com", "joshua.greedy.voneus"];
    const targetPassword = "Rowndown11!!88**";

    setTimeout(() => {
      if (allowedUsernames.includes(cleanUser) && password === targetPassword) {
        // Correct credentials -> authenticate
        onLoginSuccess();
      } else {
        // Incorrect credentials
        if (!username.trim() || !password) {
          setErrorMsg("Please fill in all security fields.");
        } else {
          setErrorMsg("Invalid administrator username or password.");
        }
      }
      setIsSubmitting(false);
    }, 400); // Small professional feedback delay
  };

  const isKent = siteConfig.regionSlug === "kent";

  return (
    <div className="min-h-[500px] flex items-center justify-center px-4 py-12 md:py-16 font-sans">
      <div 
        className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-lg p-6 md:p-8 space-y-6 text-left animate-fadeIn"
        id="admin-login-box"
      >
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center justify-center p-3 bg-[#107c91]/10 rounded-2xl mb-1 text-[#107c91]">
            <Lock className="h-6 w-6" id="lock-icon" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#02263d] tracking-tight leading-tight">
            Administrator Secure Control Portal
          </h2>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Please authenticate using authorized credentials to open the {siteConfig.regionName} directory management dashboard.
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-xl text-xs font-bold leading-relaxed animate-shake">
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <span id="login-error-text">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 step-target">
            <label className="text-[11px] font-extrabold uppercase text-[#02263d] tracking-wider block">
              Username or Registered Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. joshua.greedy.voneus"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-green outline-none font-semibold transition-all"
                style={{ minHeight: "44px" }}
                disabled={isSubmitting}
                id="admin-username-input"
              />
              <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold uppercase text-[#02263d] tracking-wider block">
              Secure Security Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-green outline-none font-semibold transition-all"
                style={{ minHeight: "44px" }}
                disabled={isSubmitting}
                id="admin-password-input"
              />
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-[#107c91] outline-hidden cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
                id="password-toggle-btn"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#107c91] hover:bg-cyan-800 text-white font-black py-3 px-4 rounded-xl text-xs tracking-wide shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 disabled:opacity-50 mt-2"
            style={{ minHeight: "44px" }}
            id="admin-login-submit"
          >
            {isSubmitting ? (
              <span>Verifying secure keys...</span>
            ) : (
              <>
                <span>Access Management Console</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <span className="text-[10px] text-slate-400 font-mono tracking-wide block uppercase leading-none">
            IP Access Tracked &bull; Cane Communications Ltd
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
