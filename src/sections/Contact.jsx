import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Instagram, 
  Send, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { profileData } from '../data/profile';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Build mailto URI
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Veer,\n\n${formData.message}\n\n---\nFrom: ${formData.name} (${formData.email})`
    );
    const mailtoUrl = `mailto:${profileData.contact.email}?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  const handleCopyPayload = () => {
    const payload = `To: ${profileData.contact.email}
Subject: ${formData.subject || 'Collaboration / Inquiry'}
From: ${formData.name || '[Your Name]'} (${formData.email || '[Your Email]'})

Message:
${formData.message || '[Your message here]'}`;

    navigator.clipboard.writeText(payload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-3.5 sm:px-8 space-y-6 sm:space-y-8 font-sans">
      {/* Scope Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 font-mono text-[11px] text-[#5E6964] border-b border-[#292F2D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3DD68C]">// start .scope-contact</span>
          <span className="hidden sm:inline">PATH: config/contact.md</span>
        </div>
        <div className="flex items-center gap-2 text-[#3DD68C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C]" />
          <span>INBOX_LISTENER: ACTIVE</span>
        </div>
      </div>

      {/* Intro Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#E7ECE9] tracking-tight">
          Initialize Contact &amp; Collaboration
        </h2>
        <p className="text-xs sm:text-sm text-[#929D97] max-w-2xl leading-relaxed">
          Have an interesting project, internship opportunity, machine learning discussion, or open-source collaboration in mind? Feel free to reach out directly through any of the channels below.
        </p>
      </div>

      {/* Quick Direct Endpoints */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        {/* Email */}
        <div className="p-4 rounded-lg bg-[#141918] border border-[#292F2D] space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[#5E6964] text-[10px]">DIRECT EMAIL</span>
            <Mail size={14} className="text-[#3DD68C]" />
          </div>
          <div className="text-[#E7ECE9] font-medium truncate" title={profileData.contact.email}>
            {profileData.contact.email}
          </div>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 text-[#3DD68C] hover:text-[#4ADE80] text-[11px] pt-1 min-h-[32px]"
          >
            {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
            <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
          </button>
        </div>

        {/* GitHub */}
        <div className="p-4 rounded-lg bg-[#141918] border border-[#292F2D] space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[#5E6964] text-[10px]">VERSION CONTROL</span>
            <Github size={14} className="text-[#60A5FA]" />
          </div>
          <div className="text-[#E7ECE9] font-medium truncate">
            github.com/veer714
          </div>
          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[#60A5FA] hover:underline text-[11px] pt-1 min-h-[32px]"
          >
            <span>View Repositories</span>
            <ExternalLink size={11} />
          </a>
        </div>

        {/* LinkedIn */}
        <div className="p-4 rounded-lg bg-[#141918] border border-[#292F2D] space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[#5E6964] text-[10px]">PROFESSIONAL NETWORK</span>
            <Linkedin size={14} className="text-[#38BDF8]" />
          </div>
          <div className="text-[#E7ECE9] font-medium truncate">
            in/veer-pratap-raghav
          </div>
          <a
            href={profileData.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[#38BDF8] hover:underline text-[11px] pt-1 min-h-[32px]"
          >
            <span>Connect on LinkedIn</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Functional Message Composer Card */}
      <div className="p-4 sm:p-6 rounded-lg bg-[#141918] border border-[#292F2D] space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-[#292F2D] pb-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <MessageSquare size={15} className="text-[#3DD68C]" />
            <span className="font-bold text-[#E7ECE9]">Send a Message</span>
          </div>
          <span className="text-[10px] font-mono text-[#5E6964]">
            Dispatches via your default system mail client
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[#929D97] block text-[11px]">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Turing"
                className="w-full bg-[#0C0F0E] border border-[#292F2D] rounded p-2.5 text-sm sm:text-xs text-[#E7ECE9] placeholder-[#5E6964] focus:outline-none focus:border-[#3DD68C] min-h-[42px]"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[#929D97] block text-[11px]">Your Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. alex@organization.com"
                className="w-full bg-[#0C0F0E] border border-[#292F2D] rounded p-2.5 text-sm sm:text-xs text-[#E7ECE9] placeholder-[#5E6964] focus:outline-none focus:border-[#3DD68C] min-h-[42px]"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-[#929D97] block text-[11px]">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. AI Internship / Collaboration Inquiry"
              className="w-full bg-[#0C0F0E] border border-[#292F2D] rounded p-2.5 text-sm sm:text-xs text-[#E7ECE9] placeholder-[#5E6964] focus:outline-none focus:border-[#3DD68C] min-h-[42px]"
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-[#929D97] block text-[11px]">Message Payload *</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your message here..."
              className="w-full bg-[#0C0F0E] border border-[#292F2D] rounded p-2.5 text-sm sm:text-xs text-[#E7ECE9] placeholder-[#5E6964] focus:outline-none focus:border-[#3DD68C] resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded bg-[#3DD68C] hover:bg-[#4ADE80] text-[#0C0F0E] font-semibold text-xs transition-all shadow-md min-h-[42px]"
              >
                <Send size={13} />
                <span>Dispatch via Email Client</span>
              </button>

              <button
                type="button"
                onClick={handleCopyPayload}
                className="flex items-center justify-center gap-1.5 px-3 py-3 sm:py-2.5 rounded bg-[#181D1B] hover:bg-[#202724] border border-[#292F2D] text-[#929D97] hover:text-[#E7ECE9] text-xs transition-colors min-h-[42px]"
                title="Copy formatted message to clipboard for webmail (Gmail)"
              >
                {copiedPayload ? <Check size={12} className="text-[#3DD68C]" /> : <Copy size={12} />}
                <span>{copiedPayload ? 'Payload Copied!' : 'Copy Formatted Text'}</span>
              </button>
            </div>

            {formSubmitted && (
              <span className="text-[11px] text-[#3DD68C] flex items-center justify-center sm:justify-start gap-1 py-1">
                <Check size={12} />
                <span>Client launched!</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Instagram / Social Card */}
      <div className="p-3.5 sm:p-4 rounded-lg bg-[#0C0F0E] border border-[#292F2D] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[#929D97] truncate">
          <Instagram size={15} className="text-[#929D97] flex-shrink-0" />
          <span className="truncate">Instagram:</span>
          <span className="text-[#E7ECE9] font-medium truncate">@{profileData.contact.instagramUser}</span>
        </div>
        <a
          href={profileData.contact.instagram}
          target="_blank"
          rel="noreferrer"
          className="text-[#3DD68C] hover:underline flex items-center gap-1 text-[11px] self-start sm:self-auto py-1"
        >
          <span>Open Instagram</span>
          <ExternalLink size={11} />
        </a>
      </div>

      <div className="font-mono text-[10px] sm:text-[11px] text-[#5E6964] text-center pt-2 sm:pt-4">
        // EOF .scope-contact — Veer Pratap Contact Endpoint
      </div>
    </div>
  );
}
