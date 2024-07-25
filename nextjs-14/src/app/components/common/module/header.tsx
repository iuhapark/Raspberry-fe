"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PG } from "@/app/components/common/enums/PG";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { text } from "stream/consumers";
import { Box } from "@mui/material";
import Profile from "./profile";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function Header() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const friends = `${PG.USER}/list`;
  const chats = `${PG.CHAT}`;

  return (
    <nav
      aria-label="Global"
      className="fixed top-0 right-0 z-50 rounded-b-2xl transition-all duration-300 p-6 w-full"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      <div className="flex">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <span
            className="text-xl font-semibold cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Box
              sx={{
                color: "var(--logo)",
                fontFamily: "harper",
                fontSize: "25px",
              }}
            >
              
              Raspberry
            </Box>
          </span>
        </a>

        <div className="flex-grow flex items-center justify-center">
          <PopoverGroup className="hidden lg:flex lg:gap-x-12 item">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 bg-none w-auto h-auto m-0 shadow-none border-none">
                juhapark
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute -left-8 top-full mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                style={{ backgroundColor: "var(--form-background)" }}
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-600"
                          style={{ color: "var(--text-color)", }}
                        />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 ">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6  hover:bg-gray-100"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <a href="#" className="text-sm font-semibold leading-6">
              Feed
            </a>
            <a href={friends} className="text-sm font-semibold leading-6 ">
              Friends
            </a>
            <a href={chats} className="text-sm font-semibold leading-6 ">
              Chats
            </a>
          </PopoverGroup>
        </div>
      </div>
      <div className="hidden lg:flex lg:items-center">
        <Profile />
      </div>
    </nav>
  );
}
export default Header;
