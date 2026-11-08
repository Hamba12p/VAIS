"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["/", "Home"],
  ["/work", "Work"],
  ["/about", "The practice"],
  ["/contact", "Contact"],
];
export function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="studio-nav">
      <div className="studio-container nav-inner">
        <Link href="/" className="brand" aria-label="VAIS home">
          <Image
            src="/brand/svg/vais-v-mono-white.svg"
            alt=""
            width={32}
            height={35}
            priority
          />
          <span>
            VAIS<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(0, 3).map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                path === href || (href !== "/" && path.startsWith(href))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-contact" aria-current={path === "/contact" ? "page" : undefined}>
          Let’s talk <ArrowUpRight size={16} />
        </Link>
        <button
          ref={menuButton}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="menu-toggle"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={path === href || (href !== "/" && path.startsWith(href)) ? "page" : undefined}
            >
              {label}
              <ArrowUpRight size={22} />
            </Link>
          ))}
          <p className="eyebrow">Applied intelligence. Kampala, Uganda.</p>
        </nav>
      )}
    </header>
  );
}
