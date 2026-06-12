/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ShieldCheck } from "lucide-react";
import siteConfig from "../config/siteConfig";

interface LeadFormProps {
  onSubmitSuccess?: () => void;
  className?: string;
  preSelectedProvider?: any;
}

export function LeadForm({ onSubmitSuccess, className = "", preSelectedProvider }: LeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postcode: "",
    townOrVillage: "",
    reasonForEnquiry: "Newsletter signup",
    message: "",
    consentCheckbox: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      consentCheckbox: e.target.checked
    }));
  };

  const getUtmParams = () => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_content: params.get("utm_content") || undefined,
      utm_term: params.get("utm_term") || undefined,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate required consent
    if (!formData.consentCheckbox) {
      setErrorMessage("You must accept our communication consent before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Latency simulation for a premium experience
    setTimeout(() => {
      const utmParams = getUtmParams();
      const submissionPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        postcode: formData.postcode,
        townOrVillage: formData.townOrVillage,
        reasonForEnquiry: formData.reasonForEnquiry,
        message: formData.message,
        consentCheckbox: formData.consentCheckbox,
        formPurpose: "newsletter_and_site_updates",
        region: siteConfig.regionSlug || "kent",
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "current page",
        postcodeArea: formData.postcode ? formData.postcode.trim().split(" ")[0] : "",
        ...utmParams,
        id: `lead-${Math.random().toString(36).substr(2, 9)}`,
        submittedAt: new Date().toISOString()
      };

      console.log(`[Lead Capture Form] New Updates Signup Submitted:`, submissionPayload);

      // Persist submission in local storage
      const existingLeads = JSON.parse(localStorage.getItem(`${siteConfig.regionSlug}_leads`) || "[]");
      existingLeads.push(submissionPayload);
      localStorage.setItem(`${siteConfig.regionSlug}_leads`, JSON.stringify(existingLeads));

      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="bg-[#12192c] border-2 border-brand-gold/40 rounded-2xl p-6 text-center space-y-4 animate-scaleUp text-slate-100 animate-fade-in" id="lead-form-success">
        <div className="h-14 w-14 bg-brand-gold text-slate-950 rounded-full flex items-center justify-center text-2xl font-black mx-auto shadow-md">
          ✔
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-brand-gold tracking-tight font-sans">Stay Updated!</h3>
          <p className="text-sm text-slate-200 leading-relaxed max-w-md mx-auto font-semibold">
            Thank you for signing up for updates! We have received your submission.
          </p>
        </div>
        <p className="text-[11px] text-slate-400 font-medium font-sans">
          We do not sell broadband directly and cannot confirm address level availability. For active deployment updates or general local news, we will stay in touch.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-[#12192c] border-2 border-slate-700/85 rounded-3xl p-6 shadow-xl ${className}`} id="lead-form-card">
      <div className="space-y-2 mb-5">
        <span className="text-sm font-bold text-brand-gold uppercase tracking-widest block leading-none">
          Stay updated
        </span>
        <h3 className="text-xl font-black text-white tracking-tight font-sans">
          Get {siteConfig.regionName} broadband updates
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-semibold">
          Sign up for occasional updates about broadband availability, tracked offers, rural connectivity news and provider changes across {siteConfig.regionName}. We do not sell broadband directly and cannot confirm address level availability. For package details or installation questions, please use the provider’s own availability checker.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 bg-rose-950/80 text-rose-200 border-rose-800 border rounded-lg text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-none focus:border-brand-gold bg-slate-900 text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-none focus:border-brand-gold bg-slate-900 text-white"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-8 text-xs border border-slate-700 rounded-lg outline-none focus:border-brand-gold bg-slate-900 text-white"
              />
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-450" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Phone Number (Optional)</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-8 text-xs border border-slate-700 rounded-lg outline-none focus:border-brand-gold bg-slate-900 text-white"
              />
              <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-450" />
            </div>
          </div>
        </div>

        {/* Postcode & Town/Village */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800 pt-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Postcode *</label>
            <div className="relative">
              <input
                type="text"
                name="postcode"
                placeholder={siteConfig.regionSlug === "kent" ? "e.g. ME14 1" : "e.g. SN10 5"}
                required
                value={formData.postcode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-8 text-xs border border-slate-700 rounded-lg outline-none focus:border-brand-gold bg-slate-900 text-white placeholder-slate-500"
              />
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-450" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Town or Village *</label>
            <input
              type="text"
              name="townOrVillage"
              placeholder={siteConfig.regionSlug === "kent" ? "e.g. Maidstone" : "e.g. Worton"}
              required
              value={formData.townOrVillage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-none focus:border-brand-gold bg-slate-900 text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Reason for Enquiry */}
        <div className="space-y-1 pt-2">
          <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Reason for Enquiry *</label>
          <select
            name="reasonForEnquiry"
            required
            value={formData.reasonForEnquiry}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-none focus:border-brand-gold bg-slate-900 text-white"
          >
            <option value="Newsletter signup">Newsletter signup</option>
            <option value="Local broadband updates">Local broadband updates</option>
            <option value="Provider or network news">Provider or network news</option>
            <option value="Advertising or sponsorship enquiry">Advertising or sponsorship enquiry</option>
            <option value="Suggest a correction">Suggest a correction</option>
            <option value="General site feedback">General site feedback</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message / Comments */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Message</label>
          <textarea
            name="message"
            rows={3}
            placeholder="Type your message, suggestion or enquiry details here..."
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg outline-none focus:border-brand-gold bg-slate-900 text-white placeholder-slate-500"
          />
        </div>

        {/* Consent Box */}
        <div className="bg-slate-900/40 border border-slate-700 p-3.5 rounded-xl space-y-3">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="consentCheckbox"
              required
              checked={formData.consentCheckbox}
              onChange={handleCheckboxChange}
              className="rounded text-brand-gold h-4 w-4 focus:ring-brand-gold border-slate-650 bg-slate-900 shrink-0 mt-0.5 cursor-pointer"
            />
            <span className="text-[11px] leading-relaxed text-slate-300" id="consent-declaration-text">
              I agree to be contacted about broadband updates, newsletter content or my general enquiry. I understand this site does not sell broadband directly and that provider availability must be checked with the provider.
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 disabled:bg-[#475569] disabled:text-slate-400 rounded-xl text-sm font-black transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer leading-none font-sans"
        >
          {isSubmitting ? "Submitting..." : "Get updates"}
          <Send className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-sans font-semibold text-center leading-relaxed">
          <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
          <span>Independent site. We never share your data with advertisers without explicit request.</span>
        </div>
      </form>
    </div>
  );
}

export default LeadForm;
