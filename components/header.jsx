import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";


const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Welth Logo"
            width={36}
            height={36}
            className="h-9 w-auto object-contain"
          />
          <span className="text-2xl font-bold tracking-tight">Welth</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Show when="signed-out">
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              Features
            </a>

            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600"
            >
              Testimonials
            </a>
          </Show>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">
                  Dashboard
                </span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">
                  Add Transaction
                </span>
              </Button>
            </Link>
          </Show>

          <Show when="signed-out">
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">
                Login
              </Button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Header;