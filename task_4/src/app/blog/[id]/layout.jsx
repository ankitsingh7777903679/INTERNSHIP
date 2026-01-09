import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "BlogPage ",
//   description: "A simple blog application",
// };

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `BlogPage ${id}`,
    description: `Blog post details page ${id}`,
  };
}

export default function BlogPostLayout({ children }) {
  return (
    <div className="min-h-screen bg-red-50">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
