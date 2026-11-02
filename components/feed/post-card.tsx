import Link from "next/link";
import type { FeedPost } from "@/app/_data";
import { Avatar } from "@/components/ui/avatar";
import { HeartIcon, ImageIcon, MegaphoneIcon, MessageIcon } from "@/components/ui/icons";
import { PostBadge } from "./post-badge";

interface PostCardProps {
  readonly post: FeedPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-[20px] border border-[#ECE0D0] bg-[#FFFDF9] p-4 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)] sm:px-[22px] sm:py-5">
      <div className="mb-[14px] flex flex-wrap items-center gap-3">
        <Avatar
          className="size-11 text-[17px]"
          style={{ backgroundColor: post.avatarBg, color: post.avatarText }}
        >
          {post.authorIcon === "megaphone" ? (
            <MegaphoneIcon className="size-5" />
          ) : (
            post.authorInitial
          )}
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[16.5px] font-semibold">{post.authorName}</div>
          <div className="text-[12.5px] text-[#A89A8B]">
            {post.timeLabel} · {post.publishedByLabel}
          </div>
        </div>
        <PostBadge category={post.category} />
      </div>

      <div className="mb-2.5 text-[12.5px] text-[#A89A8B]">{post.recipientLabel}</div>
      <p className="text-[15.5px] leading-[1.55] text-[#4A4038]">{post.content}</p>

      {post.photoCaption && (
        <div className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]">
          <ImageIcon className="size-[30px]" />
          <span className="text-[13.5px]">Foto · {post.photoCaption}</span>
        </div>
      )}

      <div className="mt-4 flex items-center gap-[18px] border-t border-[#F0E6D8] pt-[14px]">
        <span className="flex items-center gap-[7px] text-sm font-bold text-[#E0654A]">
          <HeartIcon filled className="size-[19px]" />
          {post.likesCount}
        </span>
        <span className="flex items-center gap-[7px] text-sm font-bold text-[#94887B]">
          <MessageIcon className="size-[18px]" />
          {post.commentsCount}
        </span>
        <span className="flex-1" />
        <Link href="#" className="text-sm font-extrabold text-[#C5503A]">
          Editar
        </Link>
      </div>
    </article>
  );
}
