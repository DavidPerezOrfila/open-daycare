export type PostCategory = "logro" | "actividad" | "anuncio";

export type NavIconName = "home" | "users" | "bell" | "user";

export interface TeacherProfile {
  readonly id: string;
  readonly firstName: string;
  readonly fullName: string;
  readonly initial: string;
  readonly roleLabel: string;
  readonly avatarBg: string;
  readonly avatarText: string;
}

export interface ClassroomSummary {
  readonly id: string;
  readonly badgeLabel: string;
  readonly name: string;
  readonly childrenCount: number;
  readonly dateLabel: string;
}

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon: NavIconName;
  readonly active?: boolean;
}

export interface FeedPost {
  readonly id: string;
  readonly authorName: string;
  readonly authorInitial?: string;
  readonly authorIcon?: "megaphone";
  readonly avatarBg: string;
  readonly avatarText: string;
  readonly timeLabel: string;
  readonly publishedByLabel: string;
  readonly category: PostCategory;
  readonly recipientLabel: string;
  readonly content: string;
  readonly photoCaption?: string;
  readonly likesCount: number;
  readonly commentsCount: number;
}

export interface HomeFeedPageData {
  readonly teacher: TeacherProfile;
  readonly classroom: ClassroomSummary;
  readonly navItems: readonly NavItem[];
  readonly posts: readonly FeedPost[];
}
