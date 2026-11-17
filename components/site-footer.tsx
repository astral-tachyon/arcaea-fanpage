import { Logo } from "@/components/ui/logo";
import { nav, site, stores } from "@/lib/site";

const linkClass = "text-ink-soft transition-colors hover:text-violet";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-6">
          <Logo className="-ml-3 h-16" />
          <p className="mt-5 max-w-sm text-sm text-ink-soft">
            An unofficial, fan-made concept page. Arcaea, its artwork, characters and music belong to lowiro and
            their respective creators. This site is not affiliated with or endorsed by lowiro.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.24em]">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.24em]">Get the game</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {stores.map((store) => (
              <li key={store.id}>
                <a href={store.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {store.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a href={site.official} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Official website
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-ink-soft md:px-10">
          Fan project, {new Date().getFullYear()}. Artwork and trademarks © lowiro.
        </p>
      </div>
    </footer>
  );
}
