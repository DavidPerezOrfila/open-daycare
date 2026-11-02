import Link from "next/link";
import type { NavItem } from "@/app/_data";
import { BellIcon, HomeIcon, UserIcon, UsersIcon } from "@/components/ui/icons";

const ICONS = {
  home: HomeIcon,
  users: UsersIcon,
  bell: BellIcon,
  user: UserIcon,
} as const;

interface NavItemLinkProps {
  readonly item: NavItem;
}

export function NavItemLink({ item }: NavItemLinkProps) {
  const Icon = ICONS[item.icon];
  const isActive = item.active === true;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] ${
        isActive
          ? "bg-[#FBE3D8] font-extrabold text-[#D9583C]"
          : "font-semibold text-[#6E6359]"
      }`}
    >
      <Icon className="size-[19px]" />
      {item.label}
    </Link>
  );
}
