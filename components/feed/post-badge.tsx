import type { PostCategory } from "@/app/_data";

interface CategoryStyle {
  readonly label: string;
  readonly containerClassName: string;
  readonly dotClassName: string;
  readonly textClassName: string;
}

const CATEGORY_STYLES: Record<PostCategory, CategoryStyle> = {
  logro: {
    label: "LOGRO",
    containerClassName: "bg-[#CFEBD8]",
    dotClassName: "bg-[#3E9B6C]",
    textClassName: "text-[#3E9B6C]",
  },
  actividad: {
    label: "ACTIVIDAD",
    containerClassName: "bg-[#C7E7F1]",
    dotClassName: "bg-[#2E89A6]",
    textClassName: "text-[#2E89A6]",
  },
  anuncio: {
    label: "ANUNCIO",
    containerClassName: "bg-[#CCD8F4]",
    dotClassName: "bg-[#4E72C8]",
    textClassName: "text-[#4E72C8]",
  },
};

export function PostBadge({ category }: { readonly category: PostCategory }) {
  const categoryStyle = CATEGORY_STYLES[category];

  return (
    <div
      className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${categoryStyle.containerClassName}`}
    >
      <span className={`size-2 rounded-full ${categoryStyle.dotClassName}`} />
      <span className={`text-xs font-extrabold tracking-[0.5px] ${categoryStyle.textClassName}`}>
        {categoryStyle.label}
      </span>
    </div>
  );
}
