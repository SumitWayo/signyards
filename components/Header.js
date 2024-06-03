import { useState } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"; // Import the ShoppingCartIcon
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";

const navigation = [
  { name: "Become a partner", href: "/partner" },
  { name: "MarketPlace", href: "/productScreen" },

  { name: "ContactUs", href: "/contact-us" },
  { name: "AboutUs", href: "#company" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthenticate, setShowAuthenticate] = useState(false);
  const router = useRouter();

  const toggleAuthenticate = () => {
    router.push("/Authent");
  };

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center">
            <Link href="/">
              <img
                className="-m-1.5 p-1.5 h-8 w-auto"
                src="/assets/logo2.jpg"
                alt="Company Logo"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-400"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/cart" className="text-gray-400 mr-4">
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
            <button
              onClick={toggleAuthenticate}
              className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-400 cursor-pointer"
            >
              <span>Log in</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm"
            style={{ background: "#111827" }}
          >
            <div className="flex items-center justify-between">
              <Link href="/">
                <img
                  className="-m-1.5 p-1.5 h-8 w-auto"
                  src="/assets/logo2.jpg"
                  alt="Company Logo"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-400 hover:bg-gray-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="py-6">
                  <button
                    onClick={toggleAuthenticate}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-400 hover:bg-gray-300"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Authentication Section */}
      {showAuthenticate && (
        <div
          id="authenticate"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
        >
          {/* Your authentication component goes here */}
        </div>
      )}
    </div>
  );
};

export default Header;
