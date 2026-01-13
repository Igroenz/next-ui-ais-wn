"use client";

import { AlignLeft, BookOpenText, BriefcaseBusiness, ClockFading, Grid2x2, LogOut, Package, UserCog, Users, UsersRound, UserStar } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";

const AppHamburgerMenu = () => {
  const items = [
    {
      title: 'Dashboard',
      icon: Grid2x2,
      href: '/dashboard'
    },
    {
      title: 'Periode Akademik',
      icon: ClockFading,
      href: '/periods'
    },
    {
      title: 'Program Studi',
      icon: BriefcaseBusiness,
      href: '/majors'
    },
    {
      title: 'Jabatan',
      icon: UserStar,
      href: '/positions'
    },
    {
      title: 'Mata Kuliah',
      icon: BookOpenText,
      href: '/courses'
    },
    {
      title: 'Kurikulum',
      icon: Package,
      href: '/curriculums'
    },
    {
      title: 'Operator',
      icon: UserCog,
      href: '/operators'
    },
    {
      title: 'Dosen',
      icon: Users,
      href: '/lecturers'
    },
    {
      title: 'Mahasiswa',
      icon: UsersRound,
      href: '/students'
    },
    {
      title: 'Mahasiswa',
      icon: UsersRound,
      href: '/students'
    },
    {
      title: 'Mahasiswa',
      icon: UsersRound,
      href: '/students'
    },
    {
      title: 'Mahasiswa',
      icon: UsersRound,
      href: '/students'
    },
  ]
  return (
    <div className="bg-gray-50/50 z-100 p-4 w-full border-b border-gray-400 shadow-md backdrop-blur-md">
      <div className="flex">
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" >
              <AlignLeft />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 relative ">
            <DropdownMenuGroup className="bg-white sticky top-0 z-90">
              <DropdownMenuItem>
                <div className="flex items-center justify-between space-x-1 w-full my-2">
                  <div className="bg-amber-700 h-16 w-16 rounded-full" />
                  <div className="flex flex-col w-2/3">
                    <span className="text-sm font-semibold overflow-hidden truncate">Muhammad Ikhwan Pilliang</span>
                    <span className="text-muted-foreground font-light">Mahasiswa</span>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              {items.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <Link
                    href={item.href}
                  >
                    <Button variant="ghost" size="sm">
                      <item.icon />
                      {item.title}
                    </Button>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuGroup className="bg-white sticky bottom-0 z-90">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="ghost" size="sm">
                  <LogOut />
                  Log Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default AppHamburgerMenu;