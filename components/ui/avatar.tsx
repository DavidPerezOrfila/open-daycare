import type { CSSProperties, ReactNode } from "react";

interface AvatarProps {
  readonly bgClassName?: string;
  readonly textClassName?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly children: ReactNode;
}

export function Avatar({
  bgClassName = "",
  textClassName = "",
  className = "size-11 text-[17px]",
  style,
  children,
}: AvatarProps) {
  return (
    <div
      style={style}
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-semibold ${bgClassName} ${textClassName} ${className}`}
    >
      {children}
    </div>
  );
}
