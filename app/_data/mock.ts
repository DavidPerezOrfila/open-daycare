import type {
  ClassroomSummary,
  FeedPost,
  HomeFeedPageData,
  NavItem,
  TeacherProfile,
} from "./types";

const MOCK_TEACHER: TeacherProfile = {
  id: "caro-gimenez",
  firstName: "Caro",
  fullName: "Caro Giménez",
  initial: "C",
  roleLabel: "Maestra · Soles",
  avatarBg: "#F2937A",
  avatarText: "#FFFFFF",
};

const MOCK_CLASSROOM: ClassroomSummary = {
  id: "sala-soles",
  badgeLabel: "Guardería",
  name: "Sala Soles",
  childrenCount: 12,
  dateLabel: "martes 17 jun",
};

const MOCK_NAV_ITEMS: readonly NavItem[] = [
  { id: "feed", label: "Feed", href: "/", icon: "home", active: true },
  { id: "ninos", label: "Niños", href: "#", icon: "users" },
  { id: "avisos", label: "Avisos", href: "#", icon: "bell" },
  { id: "mi-cuenta", label: "Mi cuenta", href: "#", icon: "user" },
];

const MOCK_FEED_POSTS: readonly FeedPost[] = [
  {
    id: "post-logro",
    authorName: "Mateo",
    authorInitial: "M",
    avatarBg: "#A9D9E8",
    avatarText: "#1F7A93",
    timeLabel: "14:20",
    publishedByLabel: "publicado por vos",
    category: "logro",
    recipientLabel: "Para: familia de Mateo",
    content:
      "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likesCount: 3,
    commentsCount: 1,
  },
  {
    id: "post-actividad",
    authorName: "Mateo",
    authorInitial: "M",
    avatarBg: "#A9D9E8",
    avatarText: "#1F7A93",
    timeLabel: "09:40",
    publishedByLabel: "publicado por vos",
    category: "actividad",
    recipientLabel: "Para: familia de Mateo",
    content:
      "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photoCaption: "pintando con témperas",
    likesCount: 5,
    commentsCount: 2,
  },
  {
    id: "post-anuncio",
    authorName: "Anuncio general",
    authorIcon: "megaphone",
    avatarBg: "#CCD8F4",
    avatarText: "#4E72C8",
    timeLabel: "07:50",
    publishedByLabel: "publicado por vos",
    category: "anuncio",
    recipientLabel: "Para: toda la sala",
    content:
      "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likesCount: 8,
    commentsCount: 0,
  },
];

export function getCurrentTeacher(): TeacherProfile {
  return { ...MOCK_TEACHER };
}

export function getClassroomSummary(): ClassroomSummary {
  return { ...MOCK_CLASSROOM };
}

export function getNavigationItems(): readonly NavItem[] {
  return MOCK_NAV_ITEMS.map((item) => ({ ...item }));
}

export function getFeedPosts(): readonly FeedPost[] {
  return MOCK_FEED_POSTS.map((post) => ({ ...post }));
}

export function getHomeFeedPageData(): HomeFeedPageData {
  return {
    teacher: getCurrentTeacher(),
    classroom: getClassroomSummary(),
    navItems: getNavigationItems(),
    posts: getFeedPosts(),
  };
}
