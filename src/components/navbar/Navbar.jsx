import React, { useState } from "react";
import "./Navbar.css";
import img1 from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";

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
import supabase from "../../helper/supabaseClient";

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

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const signOut = async () => {
    const {error} = await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <header className="border-b border-b-(--white)">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8 bg-(--grey)"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="navbar-logo-text">
            <span className="text-(--red) navbar-logo-text">Black</span>hole
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" />
          </button>
        </div>

        {/* Desktop menu */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-base font-semibold text-white">
              Product
              <ChevronDownIcon className="size-5" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-(--grey) outline outline-(--white) transition data-closed:translate-y-1 data-closed:opacity-0"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-(--less-white) transition"
                  >
                    <div className="flex size-11 items-center justify-center rounded-lg bg-(--grey)">
                      <item.icon className="size-6 text-white transition" />
                    </div>

                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-white group-hover:text-(--grey) transition"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>

                      <small className="mt-1 text-(--less-white) group-hover:text-(--grey) transition">
                        {item.description}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 divide-x border-t-(--white) border-t divide-(--white) bg-(--grey)">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-(--less-white) hover:text-(--grey)"
                  >
                    <item.icon className="size-5" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="#" className="text-base font-semibold text-white">
            Features
          </a>
          <a href="#" className="text-base font-semibold text-white">
            Marketplace
          </a>
          <a href="#" className="text-base font-semibold text-white">
            Company
          </a>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a onClick={signOut} className="text-base font-semibold text-white cursor-pointer">
            Log out →
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-(--grey) p-6 sm:max-w-sm sm:ring-1 sm:ring-(--white)">
          <div className="flex items-center justify-between">
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="mt-6">
            <Disclosure>
              <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 px-3 text-lg font-semibold text-white hover:bg-(--less-white) hover:text-(--grey)">
                Product
                <ChevronDownIcon className="size-5" />
              </DisclosureButton>

              <DisclosurePanel className="mt-2 space-y-2">
                {[...products, ...callsToAction].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg py-2 px-6 text-lg font-semibold text-white hover:bg-(--less-white) hover:text-(--grey)"
                  >
                    {item.name}
                  </a>
                ))}
              </DisclosurePanel>
            </Disclosure>

            {["Features", "Marketplace", "Company"].map((item) => (
              <a
                key={item}
                href="#"
                className="block rounded-lg px-3 py-2 text-lg font-semibold text-white hover:bg-(--less-white) hover:text-(--grey)"
              >
                {item}
              </a>
            ))}

            <a
              href="#"
              className="mt-4 block rounded-lg px-3 py-2 text-lg font-semibold text-white hover:bg-(--less-white) hover:text-(--grey)"
            >
              Log in
            </a>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
