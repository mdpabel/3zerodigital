'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';
import { SearchMenu } from '@/components/common/search-commands';
import { Prisma } from '@prisma/client';
import IconRenderer from '@/components/common/icon-render';
import Logo from './logo';
// static menus data

// 1. Support submenu items
const supportCategories = [
  {
    title: 'Documentation',
    description: 'Guides and resources',
    iconName: 'FaBookOpen',
  },
  {
    title: 'Book a call',
    description: 'Schedule a one-on-one session',
    iconName: 'FaStethoscope',
  },
  {
    title: 'Contact Us',
    description: 'Get in touch via email',
    iconName: 'FaEnvelope',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides and videos',
    iconName: 'FaPlay',
  },
];

// 2. Explore submenu items
const exploreCategories = [
  {
    title: 'Blog',
    description: 'Latest news and articles',
    iconName: 'FaBookOpen',
  },
  {
    title: 'Recent Projects',
    description: 'See our latest work',
    iconName: 'FaCube',
  },
  {
    title: 'Offers',
    description: 'Current promotions & discounts',
    iconName: 'FaDollarSign',
  },
  {
    title: 'Careers',
    description: 'Join our team',
    iconName: 'FaUser',
  },
];

// 3. Single featured blog post (shared for both menus or swap out per-menu if you like)
const blogPost = {
  id: '1',
  title: 'Integrating Our API',
  url: '/blog/integrating-our-api',
  description: 'A step-by-step guide to our public API.',
  imageUrl: '/images/blog/api-guide.png',
};

// 4. Top-level menus
const otherMenus = [
  { title: 'Shop', href: '/shop' },
  {
    title: 'Support',
    items: supportCategories,
    blogPost,
  },
  {
    title: 'Explore',
    items: exploreCategories,
    blogPost,
  },
];

type CategoryWithServices = Prisma.CategoryGetPayload<{
  include: { services: true };
}>;

type SerializedCategoryWithServices = Omit<CategoryWithServices, 'services'> & {
  services: (Omit<
    CategoryWithServices['services'][0],
    'price' | 'originalPrice'
  > & {
    price: number | null;
    originalPrice: number | null;
  })[];
};

export function Navbar({
  services,
}: {
  services: SerializedCategoryWithServices[];
}) {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null,
  );
  const activeCategoryData = services.find((s) => s.name === activeCategory);

  return (
    <div className='top-0 z-50 sticky bg-white dark:bg-slate-900/95 backdrop-blur-lg border-slate-200/60 border-b border-b-slate-300/50 dark:border-b-slate-700/50'>
      <ComponentWrapper className='flex items-center mx-auto px-4 h-16 container'>
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='md:hidden mr-2'>
              <Menu className='w-5 h-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
            <nav className='flex flex-col gap-4'>
              <Logo />
              <div className='space-y-2'>
                <div className='font-medium'>Services</div>
                <ScrollArea className='h-[300px]'>
                  {services.map((cat) => (
                    <div key={cat.id} className='space-y-2 pl-4'>
                      <div className='flex items-center gap-2'>
                        <IconRenderer iconName='FaCode' />
                        <span>{cat.name}</span>
                      </div>
                      <div className='space-y-1 pl-4'>
                        {cat.services.map((p) => (
                          <Link
                            key={p.id}
                            href={`/${p.slug}`}
                            className='block py-1 text-muted-foreground hover:text-foreground text-base'>
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <Link href='/shop' className='font-medium'>
                Shop
              </Link>
              <div className='space-y-2'>
                <div className='font-medium'>Support</div>
                {supportCategories.map((c) => (
                  <Link
                    key={c.title}
                    href='#'
                    className='block py-1 pl-4 text-muted-foreground hover:text-foreground text-base'>
                    {c.title}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className='mr-4'>
          <Logo />
        </div>

        {/* Desktop navigation */}
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList>
            {/* Services mega menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className='bg-transparent text-base'>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className='!w-[950px]'>
                <div className='flex p-4'>
                  {/* Left: categories */}
                  <ScrollArea className='flex-1 pr-4 border-r h-[400px]'>
                    {services.map((cat) => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.name)}
                        className={cn(
                          'rounded-md p-3 transition-colors hover:bg-accent',
                          activeCategory === cat.name && 'bg-accent',
                        )}>
                        <div className='flex items-center gap-2 font-medium text-base'>
                          <IconRenderer iconName='FaCode' />
                          {cat.name}
                        </div>
                        <p className='mt-1 text-muted-foreground text-base line-clamp-2'>
                          {cat.description || 'No description.'}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>

                  {/* Right: products */}
                  <ScrollArea className='flex-[2] pl-4 h-[400px]'>
                    {activeCategoryData ? (
                      <>
                        <h3 className='mb-2 font-medium text-base'>
                          {activeCategoryData.name} Services
                        </h3>
                        <div className='gap-4 grid grid-cols-2'>
                          {activeCategoryData.services.map((p) => (
                            <Link
                              key={p.id}
                              href={`/${p.slug}`}
                              className='block hover:bg-accent p-2 rounded-md transition'>
                              <div className='flex items-center gap-2 font-medium text-base'>
                                <IconRenderer iconName={p.icon || ''} />
                                {p.name}
                              </div>
                              <p className='mt-1 text-muted-foreground text-xs line-clamp-2'>
                                {p.description || 'No description.'}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className='flex justify-center items-center h-full text-muted-foreground'>
                        Hover over a category to see products
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Other menus (Shop, Support, …) */}
            {otherMenus.map((menu) => (
              <NavigationMenuItem key={menu.title}>
                {'items' in menu ? (
                  <>
                    <NavigationMenuTrigger className='bg-transparent text-base'>
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='!w-[800px]'>
                      <div className='flex p-4'>
                        {/* First column: support items */}
                        <div className='flex-1 space-y-4 pr-4 border-r'>
                          {menu.items!.map((item) => (
                            <Link
                              key={item.title}
                              href='#'
                              className='flex items-center gap-2 hover:bg-accent p-2 rounded-md transition'>
                              <IconRenderer iconName={item.iconName} />
                              <div>
                                <h4 className='font-medium text-base'>
                                  {item.title}
                                </h4>
                                <p className='text-muted-foreground text-xs line-clamp-2'>
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Second column: single blog post */}
                        <div className='flex-1 pl-4'>
                          <Link
                            key={menu.blogPost?.id}
                            href={menu.blogPost?.url!}
                            className='block hover:bg-accent p-2 rounded-md transition'>
                            <img
                              src={menu.blogPost?.imageUrl}
                              alt={menu.blogPost?.title}
                              className='mb-2 rounded w-full h-40 object-cover'
                            />
                            <h4 className='font-medium text-base'>
                              {menu.blogPost?.title}
                            </h4>
                            <p className='text-muted-foreground text-xs line-clamp-3'>
                              {menu.blogPost?.description}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent',
                    )}
                    asChild>
                    <Link href={menu.href!} passHref>
                      {menu.title}{' '}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search, Login, Signup */}
        <div className='flex items-center gap-4 ml-auto'>
          <SearchMenu />
          <div className='flex items-center gap-x-2'>
            <Link
              prefetch={true}
              href='/login'
              className='flex flex-shrink-0 justify-center items-center gap-x-2 space-x-1 bg-gray-50 aria-disabled:bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:aria-disabled:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 aria-disabled:opacity-75 disabled:opacity-75 shadow-sm px-3 py-2 rounded-md focus-visible:outline-0 focus:outline-none ring-1 ring-gray-300 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 dark:ring-gray-700 ring-inset w-auto font-medium text-gray-700 dark:text-gray-200 text-sm aria-disabled:cursor-not-allowed disabled:cursor-not-allowed'>
              <span>Login</span>
            </Link>

            <Link
              prefetch={true}
              href='/signup'
              className='flex flex-shrink-0 justify-center items-center gap-x-2 bg-gray-900 aria-disabled:bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:aria-disabled:bg-white dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white aria-disabled:opacity-75 disabled:opacity-75 shadow-sm px-3 py-2 rounded-md focus-visible:outline-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-inset w-auto font-medium !text-white dark:text-gray-900 text-sm aria-disabled:cursor-not-allowed disabled:cursor-not-allowed primary-color'>
              <span>Register</span>
            </Link>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
}
