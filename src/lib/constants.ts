export const SECTION_IDS = {
  hero: "hero",
  pain: "pain-points",
  features: "features",
  howItWorks: "how-it-works",
  socialProof: "social-proof",
  waitlist: "waitlist",
  cta: "cta",
} as const;

export const NAV_LINKS = [
  { label: "Tính năng", href: `#${SECTION_IDS.features}` },
  { label: "Cách hoạt động", href: `#${SECTION_IDS.howItWorks}` },
  { label: "Đánh giá", href: `#${SECTION_IDS.socialProof}` },
] as const;
