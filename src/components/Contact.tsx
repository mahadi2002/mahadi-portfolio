import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../lib/motion";
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  Phone,
  Check,
  XLogo,
  InstagramLogo,
  ThreadsLogo,
  FacebookLogo,
  type IconProps,
} from "@phosphor-icons/react";
import { profile, socials } from "../data";

const socialIcons: Record<string, React.ComponentType<IconProps>> = {
  X: XLogo,
  Instagram: InstagramLogo,
  Threads: ThreadsLogo,
  Facebook: FacebookLogo,
};

// TODO: replace with your real Formspree endpoint (formspree.io -> new form -> "Your form endpoint").
// Until this is set, submissions fall back to opening the visitor's mail client instead.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const FORMSPREE_CONFIGURED = !FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID");

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "sent" | "sent-fallback" | "error";

const initialState: FormState = { name: "", email: "", message: "" };

export function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const fieldRefs = { name: nameRef, email: emailRef, message: messageRef };

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

  function updateField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setStatus("idle");

    const firstInvalid = (Object.keys(nextErrors) as (keyof FormState)[])[0];
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    if (!FORMSPREE_CONFIGURED) {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent-fallback");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      if (res.ok) {
        setStatus("sent");
        setForm(initialState);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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

  const errorCount = Object.keys(errors).length;

  return (
    <section id="contact" className="bg-zinc-950 py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="order-2 lg:order-none"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Open to new roles and collaborations.
          </h2>
          <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-zinc-400">
            Reach out directly, or send a message below.
          </p>

          <div className="mt-9 space-y-4">
            <button
              type="button"
              onClick={copyEmail}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-zinc-200 transition-colors hover:border-amber-400/40"
            >
              <EnvelopeSimple size={18} className="shrink-0 text-amber-400" />
              <span className="truncate">{profile.email}</span>
              <span className="ml-auto shrink-0 font-mono text-xs text-ink-dim">
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                      className="inline-flex items-center gap-1 text-amber-300"
                    >
                      <Check size={12} /> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                    >
                      Copy
                    </motion.span>
                  )}
                </AnimatePresence>
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

          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">Elsewhere</p>
            <div className="mt-3 flex items-center gap-1 text-ink-dim">
              {socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          onSubmit={handleSubmit}
          noValidate
          className="order-1 space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8 lg:order-none"
        >
          <p aria-live="polite" className="sr-only">
            {errorCount > 0 ? `${errorCount} field${errorCount > 1 ? "s" : ""} need attention.` : ""}
            {status === "sent" ? "Message sent." : ""}
            {status === "sent-fallback" ? "Mail client opened, addressed to Mahadi. If nothing happened, use the email address above instead." : ""}
            {status === "error" ? "Message failed to send. Please try again or use the email above." : ""}
          </p>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-zinc-300">
              Name
            </label>
            <input
              ref={nameRef}
              id="name"
              name="name"
              type="text"
              maxLength={100}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full rounded-lg border border-white/12 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-ink-dim focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              placeholder="Jane Rahman"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <AnimatePresence initial={false}>
              {errors.name && (
                <motion.p
                  id="name-error"
                  initial={reduce ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="text-xs text-amber-300"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-zinc-300">
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              maxLength={150}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-lg border border-white/12 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-ink-dim focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              placeholder="jane@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <AnimatePresence initial={false}>
              {errors.email && (
                <motion.p
                  id="email-error"
                  initial={reduce ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="text-xs text-amber-300"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm text-zinc-300">
              Message
            </label>
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              rows={5}
              maxLength={2000}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              className="w-full resize-none rounded-lg border border-white/12 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-ink-dim focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              placeholder="What are you working on?"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            <AnimatePresence initial={false}>
              {errors.message && (
                <motion.p
                  id="message-error"
                  initial={reduce ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="text-xs text-amber-300"
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-lg bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98] hover:bg-amber-300 disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          <AnimatePresence initial={false}>
            {status === "sent" && (
              <motion.p
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="text-center text-xs text-amber-300"
              >
                Message sent, thanks. I'll get back to you soon.
              </motion.p>
            )}
            {status === "sent-fallback" && (
              <motion.p
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="text-center text-xs text-ink-dim"
              >
                Your mail client should have opened with this addressed to me. If nothing happened, use the email above instead.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="text-center text-xs text-amber-300"
              >
                Something went wrong sending that. Please try again, or email {profile.email} directly.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
