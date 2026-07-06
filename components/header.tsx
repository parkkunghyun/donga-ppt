import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-[#F8F8F8]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo2.png"
            alt="동아쏘시오그룹"
            width={200}
            height={40}
            priority
            className="h-10 w-auto"
          />
          <span className="hidden h-5 w-px bg-border sm:block" />
          <p className="hidden text-[15px] font-bold text-[#231F20] sm:block">
            AX 성과 공유
          </p>
        </Link>
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/"
            className="text-[14px] font-medium text-[#231F20] hover:text-[#E05A5F]"
          >
            대시보드
          </Link>
        </nav>
      </div>
    </header>
  );
}
