import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const metadata: Metadata = {
  title: "Kinsfolk Technology Private Limited",
  description:
    "Kinsfolk Technology Private Limited - Technology and digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}