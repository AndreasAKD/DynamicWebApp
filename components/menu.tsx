"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header ref={menuRef} className={`fixed top-0 left-0 w-full z-50 flex flex-col justify-between items-center py-4 ${isOpen ? 'h-auto' : 'h-[8vh]'} sm:h-[10vh]`} style={{ backgroundColor: 'var(--navbar-bg)', color: 'var(--navbar-text)' }}>
      <div className="flex items-center justify-between w-full px-4 sm:px-8">
        <div className="flex items-center space-x-4 sm:order-2">
          <button onClick={() => changeLanguage('sv')}>
            <Image src="/images/sweden.png" alt="Swedish" width={32} height={32} />
          </button>
          <button onClick={() => changeLanguage('en')}>
            <Image src="/images/united-kingdom.png" alt="English" width={32} height={32} />
          </button>
        </div>
        <div className="text-2xl font-bold sm:order-1">Andreas Dahlgren</div>
        <div className="sm:hidden sm:order-3">
          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none"
            style={{ color: 'var(--navbar-text)' }}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <nav className={`w-full sm:flex sm:justify-center ${isOpen ? 'bg-gray-800' : 'bg-gray-800'}`} style={{ backgroundColor: 'var(--navbar-bg)', color: 'var(--navbar-text)' }}>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-lg w-full sm:bg-transparent sm:text-inherit p-4 sm:p-0 sm:justify-center sm:mb-4`}
          style={{ backgroundColor: 'var(--navbar-bg)', color: 'var(--navbar-text)' }}
        >
          <li>
            <Link href="/" className="block py-2 font-bold sm:py-0 hover:underline" onClick={closeMenu}>
              {t('home')}
            </Link>
          </li>
          <li>
            <Link href="/about" className="block py-2 font-bold sm:py-0 hover:underline" onClick={closeMenu}>
              {t('about')}
            </Link>
          </li>
          <li>
            <Link href="/purpose" className="block py-2 font-bold sm:py-0 hover:underline" onClick={closeMenu}>
              {t('purpose')}
            </Link>
          </li>
          <li>
            <Link href="/services" className="block py-2 font-bold sm:py-0 hover:underline" onClick={closeMenu}>
              {t('services')}
            </Link>
          </li>
          <li>
            <Link href="/portfolio" className="block py-2 font-bold sm:py-0 hover:underline" onClick={closeMenu}>
              {t('portfolio')}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}