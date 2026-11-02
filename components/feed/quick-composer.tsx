import Link from "next/link";
import type { TeacherProfile } from "@/app/_data";
import { Avatar } from "@/components/ui/avatar";
import { CameraIcon } from "@/components/ui/icons";

interface QuickComposerProps {
  readonly teacher: TeacherProfile;
}

export function QuickComposer({ teacher }: QuickComposerProps) {
  return (
    <Link
      href="#"
      className="mb-6 flex items-center gap-3.5 rounded-[18px] border border-[#ECE0D0] bg-[#FFFDF9] px-[18px] py-3.5 shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
    >
      <Avatar bgClassName="bg-[#F2937A]" className="size-10 text-base text-white">
        {teacher.initial}
      </Avatar>
      <span className="flex-1 text-[15px] text-[#A89A8B]">Compartí un momento…</span>
      <span className="flex size-[38px] items-center justify-center rounded-xl bg-[#FBE3D8] text-[#E0654A]">
        <CameraIcon className="size-[19px]" />
      </span>
    </Link>
  );
}
