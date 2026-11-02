import type { ClassroomSummary, TeacherProfile } from "@/app/_data";

interface FeedHeaderProps {
  readonly teacher: TeacherProfile;
  readonly classroom: ClassroomSummary;
}

export function FeedHeader({ teacher, classroom }: FeedHeaderProps) {
  return (
    <div className="mb-6">
      <div className="mb-1 text-[12.5px] font-extrabold uppercase tracking-[0.8px] text-[#D9583C]">
        {classroom.badgeLabel} · {classroom.name}
      </div>
      <h1 className="font-display text-3xl font-semibold">Buenas, {teacher.firstName}</h1>
      <p className="mt-[5px] text-[14.5px] text-[#94887B]">
        {classroom.childrenCount} niños · {classroom.dateLabel}
      </p>
    </div>
  );
}
