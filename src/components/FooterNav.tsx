'use client';

import {
  HeartIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PathName } from '@/routers/types';
import MenuBar from '@/shared/MenuBar';
import isInViewport from '@/utils/isInViewport';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { set } from 'js-cookie';
import SearchFormMobile from '@/app/(client-components)/(HeroSearchFormMobile)/SearchFormMobile';

let WIN_PREV_POSITION = 0;
if (typeof window !== 'undefined') {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link?: PathName;
  icon: any;
}

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAuth } = useAuth();

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleEvent);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigationItems = useMemo(() => {
    if (isAuth) {
      return [
        {
          name: 'Explore',
          link: '/',
          icon: MagnifyingGlassIcon,
        },
        {
          name: 'Be a host',
          // @ts-ignore
          link: '/add-listing/1',
          icon: HomeIcon,
        },
        {
          name: 'Bookings',
          link: '/my-bookings',
          icon: HeartIcon,
        },
      ];
    }

    return [];
  }, [isAuth]);

  const handleEvent = () => {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(showHideHeaderMenu);
    }
  };

  const showHideHeaderMenu = () => {
    // if (typeof window === "undefined" || window?.innerWidth >= 768) {
    //   return null;
    // }

    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }

      containerRef.current.classList.add('FooterNav--hide');
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove('FooterNav--hide');
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  const renderItem = (item: any, index: number) => {
    const isActive = pathname === item.link;

    return item.link ? (
      <Link
        key={index}
        href={item.link}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
        }`}
      >
        <item.icon className={`w-6 h-6 ${isActive ? 'text-red-600' : ''}`} />
        <span
          className={`text-[11px] leading-none mt-1 ${
            isActive ? 'text-red-600' : ''
          }`}
        >
          {item.name}
        </span>
      </Link>
    ) : (
      <div
        key={index}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
        }`}
      >
        <item.icon iconClassName="w-6 h-6" className={``} />
        <span className="text-[11px] leading-none mt-1">{item.name}</span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav block md:!hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        <div className="flex lg:hidden flex-[3] max-w-lg !mx-auto md:px-3 ">
          <div className="self-center flex-1">
            <SearchFormMobile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
