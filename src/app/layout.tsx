import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../context/LanguageContext";
import TopProgressBar from "../components/TopProgressBar";
import SmoothScroll from "../components/SmoothScroll";
import ChatBot from "../components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "PakWatch - Intelligence on your wrist",
  description: "Khám phá chiếc đồng hồ thông minh theo dõi sức khỏe ứng dụng AI tân tiến nhất thế giới.",
  openGraph: {
    title: "PakWatch - Trí tuệ nhân tạo trên cổ tay bạn",
    description: "Khám phá chiếc đồng hồ thông minh theo dõi sức khỏe ứng dụng AI tân tiến nhất thế giới.",
    url: "https://tts-it-website-phan-anh-khoa.vercel.app/",
    siteName: "PakWatch",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://tts-it-website-phan-anh-khoa.vercel.app/apw5.png",
        width: 1200,
        height: 630,
        alt: "PakWatch - Smartwatch AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PakWatch - Intelligence on your wrist",
    description: "Khám phá chiếc đồng hồ thông minh theo dõi sức khỏe ứng dụng AI tân tiến nhất thế giới.",
    images: ["https://tts-it-website-phan-anh-khoa.vercel.app/apw5.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <TopProgressBar />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScroll>
              {children}
              <ChatBot />
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
