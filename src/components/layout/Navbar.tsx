"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/80 backdrop-blur-lg shadow-sm border-b border-dark/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto section-padding flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <span className="font-heading text-xl md:text-2xl font-bold text-primary cursor-default">
          Quant Mate
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <span
              key={link.href}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-200 cursor-default"
            >
              {link.label}
            </span>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Đăng nhập
          </Button>
          <Button size="sm">Thử ngay</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-cream/95 backdrop-blur-lg border-b border-dark/5"
          >
            <div className="section-padding py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <span
                  key={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-secondary hover:text-primary transition-colors cursor-default"
                >
                  {link.label}
                </span>
              ))}
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" size="sm">
                  Đăng nhập
                </Button>
                <Button size="sm">Thử ngay</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
