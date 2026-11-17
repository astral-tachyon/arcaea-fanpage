import { ArcDivider } from "@/components/arc-divider";
import { Characters } from "@/components/characters";
import { Collabs } from "@/components/collabs";
import { Download } from "@/components/download";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Reviews } from "@/components/reviews";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Socials } from "@/components/socials";
import { Songs } from "@/components/songs";
import { Stats } from "@/components/stats";
import { Story } from "@/components/story";
import { Trailers } from "@/components/trailers";
import { Worlds } from "@/components/worlds";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-btn-bg focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-btn-fg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Stats />
        <Features />
        <ArcDivider />
        <Worlds />
        <Songs />
        <ArcDivider flip />
        <Characters />
        <Story />
        <Collabs />
        <Reviews />
        <Faq />
        <Trailers />
        <Download />
        <Socials />
      </main>
      <SiteFooter />
    </>
  );
}
