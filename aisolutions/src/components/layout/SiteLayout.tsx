import { useLocation } from "react-router-dom";
import { FrozenOutlet } from "./FrozenOutlet";
import { AnimatePresence } from "framer-motion";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { AuroraBackground, CursorGlow, PageTransition, ScrollProgress, SmoothScroll } from "@/components/fx";

export function SiteLayout() {
  const location = useLocation();
  return (
    <SmoothScroll>
      <AuroraBackground />
      <CursorGlow />
      <ScrollProgress />
      <SiteHeader />
      <AnimatePresence mode="wait">
        <main key={location.pathname} className="relative">
          <PageTransition>
            <FrozenOutlet />
          </PageTransition>
        </main>
      </AnimatePresence>
      <SiteFooter />
    </SmoothScroll>
  );
}
