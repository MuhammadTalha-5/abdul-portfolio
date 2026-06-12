import { site } from "@/lib/site";

export default function Footer({ name = "Abdul", email }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row">
        <p>
          © {year} {name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {email && (
            <a href={`mailto:${email}`} className="transition-colors hover:text-ink">
              {email}
            </a>
          )}
          <a
            href="#home"
            className="transition-colors hover:text-ink"
            aria-label="Back to top"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
