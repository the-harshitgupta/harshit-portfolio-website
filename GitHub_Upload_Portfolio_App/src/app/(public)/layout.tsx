import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className="min-h-screen pt-[82px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
