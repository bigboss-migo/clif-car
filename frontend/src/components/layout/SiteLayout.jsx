import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

// Top on navigation; hash targets scroll into view, offset by html scroll-padding-top (--header-h).
const useScrollOnNavigate = () => {
  const { key, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [key, hash]);
};

export default function SiteLayout() {
  useScrollOnNavigate();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main data-testid="site-main" className="flex-1 pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
