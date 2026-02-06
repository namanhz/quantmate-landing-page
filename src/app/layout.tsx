import type { Metadata } from "next";
import { playfair, beVietnam, jetbrainsMono } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quant Mate — Trợ lý nghiên cứu AI cho sinh viên Việt Nam",
  description:
    "Quant Mate giúp sinh viên Việt Nam hiểu và thực hiện nghiên cứu định lượng — từ chọn phương pháp đến phân tích dữ liệu với giải thích chi tiết.",
  keywords: [
    "nghiên cứu khoa học",
    "NCKH",
    "luận văn",
    "SPSS",
    "PLS-SEM",
    "OLS",
    "sinh viên Việt Nam",
    "AI",
    "econometrics",
  ],
  openGraph: {
    title: "Quant Mate — Trợ lý nghiên cứu AI cho sinh viên Việt Nam",
    description:
      "Nghiên cứu khoa học không còn là nỗi sợ. AI giúp bạn phân tích dữ liệu và hiểu kết quả.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${playfair.variable} ${beVietnam.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
