import Link from "next/link";
import { LinkButton } from "./Button";

export function Navbar() {
  return (
    <header className="border-b border-line-soft bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-700 font-display text-[15px] text-white">
            T
          </span>
          <span className="font-display text-[19px] text-ink">TransferAI</span>
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <Link href="/#how-it-works" className="text-[15px] text-ink-soft hover:text-ink">
            How it works
          </Link>
          <Link href="/#sample-data" className="text-[15px] text-ink-soft hover:text-ink">
            About the data
          </Link>
        </nav>
        <LinkButton href="/plan/start" className="!px-4 !py-2 text-[14px]">
          Start your plan
        </LinkButton>
      </div>
    </header>
  );
}
