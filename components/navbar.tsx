"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

import logo from "@/app/assets/images/logo.png";
import { SwitchTeam } from "./SwitchTeam";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Houses", href: "/houses" },
  { label: "Cars", href: "/cars" },
  { label: "Wish List", href: "/wish" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 dark:text-zinc-400 flex items-center gap-2"
        >
          <Image
            src={logo}
            alt="Broker Logo"
            className="dark:invert-75"
            width={40}
            height={40}
          />
          Broker
        </Link>

        {/* Team switcher */}
        <SwitchTeam />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {open ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 dark:bg-zinc-900">
              <SheetHeader>
                <SheetTitle className="text-zinc-900 dark:text-white">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="w-full mt-4">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

// ????????????????????????????????????????????????????????
// ????????????????????????????????????????????????????????
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetTrigger,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import Image from "next/image";

// import logo from "@/app/assets/images/logo.png";
// import { SwitchTeam } from "./SwitchTeam";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Houses", href: "/houses" },
//   { label: "Cars", href: "/cars" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// export function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
//       <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo / Brand */}
//         <Link
//           href="/"
//           className="text-xl font-bold text-blue-600 flex flex-nowrap justify-center items-center gap-2 flex-row"
//         >
//           <Image src={logo} alt="Broker Logo" width={50} height={50} />
//           Broker
//         </Link>

//         {/* team switcher */}
//         <SwitchTeam />

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center gap-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="text-sm text-muted-foreground hover:text-primary transition"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <Button asChild>
//             <Link href="/dashboard">Dashboard</Link>
//           </Button>
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 {open ? <X /> : <Menu />}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-64">
//               <SheetHeader>
//                 <SheetTitle>Menu</SheetTitle>
//               </SheetHeader>
//               <div className="mt-4 space-y-4">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     onClick={() => setOpen(false)}
//                     className="block text-sm text-muted-foreground hover:text-primary"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//                 <Button asChild className="w-full mt-4">
//                   <Link href="/dashboard">Dashboard</Link>
//                 </Button>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// }
