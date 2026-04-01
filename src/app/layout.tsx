import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boardroom Brain | Sales Call Intelligence by Kent Clothier",
  description: "AI-powered sales call intelligence platform. Analyze calls, coach reps, and close more deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
