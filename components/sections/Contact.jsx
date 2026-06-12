"use client";

import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { Reveal } from "../Reveal";

export default function Contact({ contact }) {
  const items = [
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    contact.location && { label: "Location", value: contact.location, href: null },
    contact.linkedin && { label: "LinkedIn", value: "Connect on LinkedIn", href: contact.linkedin },
    contact.otherSocial && { label: "Elsewhere", value: "Profile", href: contact.otherSocial },
  ].filter(Boolean);

  return (
    <section id="contact" className="section mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:rounded-[2.5rem] sm:p-10 md:p-16">
        <SectionHeading eyebrow="Contact" title="Let's work together" />

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Have a role, project, or opportunity in mind? I&apos;d love to hear
              about it. Reach out and I&apos;ll get back to you as soon as I can.
            </p>
            {contact.email && (
              <motion.a
                whileHover={{ x: 4 }}
                href={`mailto:${contact.email}`}
                className="mt-8 flex w-full max-w-full items-center gap-2 break-all font-serif text-lg font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 sm:text-2xl md:text-3xl"
              >
                <span className="break-all">{contact.email}</span>
                <span className="shrink-0 text-accent">&rarr;</span>
              </motion.a>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {items.map((item, i) => (
                <div key={i} className="bg-surface p-5">
                  <dt className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 break-words text-ink">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
