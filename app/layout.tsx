import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Portfolio - Baron Tshibasu",
  description: "Portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col overflow-x-hidden bg-slate-950">
        <div className="bubble-container pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {Array.from({ length: 20 }).map((_, index) => (
            <span key={index} className={`bubble bubble-${index + 1}`}></span>
          ))}
        </div>

        <Header />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}