import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import { PG } from "@/app/components/common/enums/PG";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { MenuBar } from "@/app/atoms/toggle/MenuBar";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
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

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = parseCookies().accessToken;

    const processToken = () => {
      if (!token) {
        console.log("Token is missing");
        return null;
      }

      let decoded: any;
      try {
        decoded = jwtDecode(token);
        console.log("User id in Profile:", decoded.id);
        return decoded.id;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    };

    const userIdFromToken = processToken();
    if (userIdFromToken) {
      setUserId(userIdFromToken);
    }
  }, []);

  if (open) {
    document.body.style.paddingLeft = "220px";
    document.body.style.transition = "padding-left 0.3s";
  } else {
    document.body.style.paddingLeft = "0";
  }

  const payment = userId ? `${PG.PAY}/${userId}` : `${PG.PAY}/undefined`;
  const item = userId ? `${PG.ITEM}/${userId}` : `${PG.ITEM}/undefined`;

  return (
    <div>
      <MenuBar bar={() => setOpen(!open)} />
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          onClose: toggleDrawer(false),
          style: { zIndex: 0 },
        }}
      >
        <Box
          sx={{
            width: "220px",
            height: "100%",
            backgroundColor: "var(--background)",
          }}
          role="presentation"
        >
          <div className="flex items-center justify-center mt-20">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Logo"
                src="/logo/logo.png"
                className="h-8 w-auto hidden dark:block"
              />
              <img
                alt="Logo"
                src="/logo/favicon.ico"
                className="h-8 w-auto dark:hidden"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 bg-none hover:bg-none shadow-none"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 text-base font-semibold leading-7 bg-none shadow-none">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7  hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
