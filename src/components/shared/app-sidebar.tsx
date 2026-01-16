"use client";

import { BookOpenText, BriefcaseBusiness, ChevronsLeftRight, ChevronsUpDown, ClockFading, Grid2x2, MoreHorizontal, Package, Settings, University, UserCog, Users, UsersRound, UserStar } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { featureRegistry } from "@/features/features.registry";
import { canAccessFeature } from "@/lib/permissions";
import { usePathname } from "next/navigation";

const AppSidebar = ({ role }: { role: string }) => {
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

  const pathname = usePathname();
  return (
    <div className="w-full h-screen p-1 sticky top-0">
      <aside className="bg-neutral-50 h-full relative overflow-auto border rounded-sm shadow-lg space-y-4">
        {/* Header */}
        <div className="bg-neutral-50/60 backdrop-blur-lg w-full h-fit py-4 space-y-2 flex flex-col items-center justify-center rounded-t-md border-b border-gray-500 sticky top-0">
          <div className="bg-blue-200 w-24 h-24 flex items-center justify-center rounded-full">
            <University className="h-16 w-16" />
          </div>
          <div className="flex flex-col space-x-0.5 items-center justify-center">
            <span className="tracking-wide text-base font-medium text-black">University</span>
            <span className="text-sm font-medium text-gray-500">of Gotham City</span>
          </div>
        </div>
        {/* Content */}
        <div className="">
          <div className="px-2 space-y-1">
            {/* {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition bg-transparent"
              >
                <item.icon className="w-5" />
                <span className="text-sm">{item.title}</span>
              </Link>
            ))} */}

            {featureRegistry
              .filter((feature) => canAccessFeature({ feature, role: "ADMIN", action: "view" }))
              .sort((a, b) => a.order - b.order)
              .map((feature) => {
                const Icon = feature.icon;
                const active = pathname.includes(feature.route);
                return (
                  <Link
                    key={feature.key}
                    href={feature.route}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition bg-transparent"
                  >
                    <Icon className="w-5" />
                    <span className="text-sm">{feature.label[role as keyof typeof feature.label]}</span>
                  </Link>
                )
              })
            }
          </div>
        </div>
        <div className="bg-neutral-50 w-full h-fit py-2 px-2 sticky bottom-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-between pl-3 py-2 test-sm">
                <div className="flex space-x-2">
                  <Settings className="w-5" /> <span className="text-sm">Pengaturan</span>
                </div>
                <Button variant="outline" size="icon-sm">
                  <ChevronsUpDown />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end">
              <DropdownMenuItem>
                <span>Profil Pengguna</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Ubah Password</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </div>
  )
}

export default AppSidebar;
