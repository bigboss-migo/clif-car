import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

const useScrollOnNavigate = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
};

export default function SiteLayout() {
  useScrollOnNavigate();
  return (
    <div className="flex min-h-screen flex-col pb-[72px] md:pb-0">
      <Header />
      <main data-testid="site-main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
