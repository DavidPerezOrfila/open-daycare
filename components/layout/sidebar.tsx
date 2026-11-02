"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ClassroomSummary, NavItem, TeacherProfile } from "@/app/_data";
import { Avatar } from "@/components/ui/avatar";
import { CloseIcon, LogOutIcon, MenuIcon, PlusIcon, SunIcon } from "@/components/ui/icons";
import { NavItemLink } from "./nav-item";

interface SidebarProps {
  readonly teacher: TeacherProfile;
  readonly classroom: ClassroomSummary;
  readonly navItems: readonly NavItem[];
}

function Brand({ classroomName }: { readonly classroomName: string }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(155deg,#F8C3A8,#F2937A)]">
        <SunIcon className="size-[21px] text-white" />
      </div>
      <div>
        <div className="font-display text-[17px] font-semibold leading-none">OpenDayCare</div>
        <div className="mt-0.5 text-[11.5px] text-[#A89A8B]">{classroomName}</div>
      </div>
    </Link>
  );
}

interface SidebarContentProps extends SidebarProps {
  readonly onClose?: () => void;
}

function SidebarContent({ teacher, classroom, navItems, onClose }: SidebarContentProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-2 px-2 pt-1 pb-[22px]">
        <Brand classroomName={classroom.name} />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="flex size-8 items-center justify-center rounded-[10px] bg-[#F6ECDF] text-[#94887B]"
          >
            <CloseIcon className="size-4" />
          </button>
        )}
      </div>

      <Link
        href="#"
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] p-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <PlusIcon className="size-[17px]" />
        Nueva publicación
      </Link>

      <nav className="flex flex-1 flex-col gap-1" onClick={onClose}>
        {navItems.map((item) => (
          <NavItemLink key={item.id} item={item} />
        ))}
      </nav>

      <div className="mt-2.5 border-t border-[#ECE0D0] pt-3.5">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <Avatar
            bgClassName="bg-[#F2937A]"
            className="size-[38px] text-base text-white"
          >
            {teacher.initial}
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold">{teacher.fullName}</div>
            <div className="truncate text-xs text-[#A89A8B]">{teacher.roleLabel}</div>
          </div>
          <Link
            href="#"
            aria-label="Cerrar sesión"
            className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[#F6ECDF] text-[#94887B]"
          >
            <LogOutIcon className="size-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

export function Sidebar({ teacher, classroom, navItems }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#ECE0D0] bg-[#FFFDF9] px-4 py-3 md:hidden">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          className="flex size-9 items-center justify-center rounded-[10px] bg-[#F6ECDF] text-[#94887B]"
        >
          <MenuIcon className="size-[18px]" />
        </button>
        <Brand classroomName={classroom.name} />
      </header>

      <aside className="hidden w-[248px] shrink-0 flex-col border-r border-[#ECE0D0] bg-[#FFFDF9] px-4 py-6 md:sticky md:top-0 md:flex md:h-screen">
        <SidebarContent teacher={teacher} classroom={classroom} navItems={navItems} />
      </aside>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={close}
            className="fixed inset-0 z-40 bg-[#3F362E]/40 backdrop-blur-[1px] md:hidden"
          />
          <aside
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-[#ECE0D0] bg-[#FFFDF9] px-4 py-6 md:hidden"
          >
            <SidebarContent
              teacher={teacher}
              classroom={classroom}
              navItems={navItems}
              onClose={close}
            />
          </aside>
        </>
      )}
    </>
  );
}
