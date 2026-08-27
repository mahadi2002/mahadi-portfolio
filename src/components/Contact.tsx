import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, Phone, Check } from "@phosphor-icons/react";
import { profile } from "../data";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", email: "", message: "" };

export function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  function validate(values: FormState): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!values.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Add a short message.";
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setForm(initialState);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable, ignore */
    }
  }

  return (
    <section id="contact" className="bg-zinc-950 py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Open to new roles and collaborations.
          </h2>
          <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-zinc-400">
            Reach out directly, or send a message and it'll open in your mail
            client, addressed straight to me.
          </p>

          <div className="mt-9 space-y-4">
            <button
              type="button"
              onClick={copyEmail}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-zinc-200 transition-colors hover:border-amber-400/40"
            >
              <EnvelopeSimple size={18} className="shrink-0 text-amber-400" />
              <span className="truncate">{profile.email}</span>
              <span className="ml-auto shrink-0 font-mono text-xs text-zinc-600">
                {copied ? <span className="inline-flex items-center gap-1 text-amber-300"><Check size={12} /> Copied</span> : "Copy"}
              </span>
            </button>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-amber-400/40"
            >
              <Phone size={18} className="shrink-0 text-amber-400" />
              {profile.phone}
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-amber-400/40"
            >
              <LinkedinLogo size={18} className="shrink-0 text-amber-400" />
              {profile.linkedinHandle}
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-amber-400/40"
            >
              <GithubLogo size={18} className="shrink-0 text-amber-400" />
              {profile.githubHandle}
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-zinc-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-white/12 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              placeholder="Jane Rahman"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-amber-300">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-zinc-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-white/12 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              placeholder="jane@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-amber-300">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm text-zinc-300">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full resize-none rounded-lg border border-white/12 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              placeholder="What are you working on?"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-xs text-amber-300">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98] hover:bg-amber-300"
          >
            Send message
          </button>

          {sent && (
            <p className="text-center text-xs text-zinc-500">
              Your mail client should have opened with this addressed to me. If nothing happened, email {profile.email} directly.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
