'use client';

import * as React from 'react';
import Link from 'next/link';
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ComponentWrapper from '@/components/common/component-wrapper';
import { SearchMenu } from '@/components/common/search-commands';
import { Prisma } from '@prisma/client';
import IconRenderer from '@/components/common/icon-render';
import Logo from './logo';
import { CleanBackground } from '../common/section-backgrounds';
import { authClient } from '@/lib/auth-client';

const supportCategories = [
  {
    title: 'Documentation',
    description: 'Guides and resources',
    iconName: 'FaBookOpen',
    href: '/docs',
  },
  {
    title: 'Book a call',
    description: 'Schedule a one-on-one session',
    iconName: 'FaStethoscope',
    href: '/book-a-call',
  },
  {
    title: 'Contact Us',
    description: 'Get in touch via email',
    iconName: 'FaEnvelope',
    href: '/contact',
  },
];

const exploreCategories = [
  {
    title: 'Blog',
    description: 'Latest news and articles',
    iconName: 'FaBookOpen',
    href: '/blog',
  },
  {
    title: 'Case Studies',
    description: 'Real results from our clients',
    iconName: 'FaChartLine',
    href: '/case-studies',
  },
  {
    title: 'Offers',
    description: 'Current promotions & discounts',
    iconName: 'FaDollarSign',
    href: '/offers',
  },
  {
    title: 'Careers',
    description: 'Join our team',
    iconName: 'FaUser',
    href: '/careers',
  },
];

const blogPost = {
  id: '1',
  title: 'How to Scan If My Site Is Hacked or Blacklisted in 2025',
  url: '/blog/how-to-scan-if-my-site-is-hacked-or-blacklisted-in-2025',
  description:
    'Learn how to quickly scan your website for malware, blacklists, and suspicious behavior in 2025 using free and advanced tools.',
  imageUrl: '/scan.png',
};

const otherMenus = [
  { title: 'Templates', href: '/templates' },
  { title: 'Support', items: supportCategories, blogPost },
  { title: 'Explore', items: exploreCategories, blogPost },
];

// --- TYPES (Unchanged) ---

type CategoryWithServices = Prisma.CategoryGetPayload<{
  include: { services: true };
}>;

type SerializedCategoryWithServices = Omit<CategoryWithServices, 'services'> & {
  services: (Omit<
    CategoryWithServices['services'][0],
    'price' | 'originalPrice' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > & {
    price: number | null;
    originalPrice: number | null;
  })[];
};

// --- CHILD COMPONENTS ---

const MobileNavbar = ({
  services,
  session,
}: {
  services: SerializedCategoryWithServices[];
  session: any;
}) => (
  <div className='md:hidden flex justify-between items-center w-full'>
    <Logo />
    <div className='flex items-center gap-2'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost'>Services</Button>
        </SheetTrigger>
        <SheetContent side='bottom' className='h-[85vh]'>
          <SheetHeader>
            <SheetTitle>Our Services</SheetTitle>
            <SheetDescription>
              Explore our range of professional services.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className='pr-4 h-[calc(85vh-80px)]'>
            <CleanBackground>
              <Accordion
                type='single'
                collapsible
                className='w-full'
                defaultValue={services.length > 0 ? services[0].id : undefined}>
                {services.map((cat) => (
                  <AccordionItem value={cat.id} key={cat.id}>
                    <AccordionTrigger className='text-base'>
                      <div className='flex items-center gap-2'>
                        <IconRenderer iconName='FaCode' />
                        {cat.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-col items-start gap-1 ml-2 pl-4 border-l-2'>
                        {cat.services.map((p) => (
                          <SheetClose asChild key={p.id}>
                            <Link
                              href={`/${p.slug}`}
                              className='py-2 w-full text-muted-foreground hover:text-foreground'>
                              {p.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CleanBackground>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <Button asChild size='sm'>
        <Link href='/book-a-call'>Book a Call</Link>
      </Button>
      <Button asChild size='sm'>
        <Link href={session ? '/dashboard' : '/login'}>
          {session ? 'Dashboard' : 'Login'}
        </Link>
      </Button>
    </div>
  </div>
);

const DesktopNavbar = ({
  services,
  session,
}: {
  services: SerializedCategoryWithServices[];
  session: any;
}) => {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null,
  );
  const activeCategoryData = services.find((s) => s.name === activeCategory);

  return (
    <div className='hidden md:flex justify-between items-center w-full'>
      <div className='flex items-center gap-4'>
        <div className='mr-4'>
          <Logo />
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {/* Services mega menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className='bg-transparent text-base'>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className='!w-[950px]'>
                <div className='flex p-4'>
                  <ScrollArea className='flex-1 pr-4 border-r h-[400px]'>
                    {services.map((cat) => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.name)}
                        className={cn(
                          'hover:bg-accent p-3 rounded-md transition-colors',
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
                  <ScrollArea className='flex-[2] pl-4 h-[400px]'>
                    {activeCategoryData ? (
                      <>
                        <h3 className='mb-2 font-medium text-base'>
                          {activeCategoryData.name} Services
                        </h3>
                        <div className='gap-4 grid grid-cols-2'>
                          {activeCategoryData.services.map((p) => (
                            <NavigationMenuLink key={p.id} asChild>
                              <Link
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
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className='flex justify-center items-center h-full text-muted-foreground'>
                        Hover over a category to see services
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Other menus */}
            {otherMenus.map((menu) => (
              <NavigationMenuItem key={menu.title}>
                {'items' in menu ? (
                  <>
                    <NavigationMenuTrigger className='bg-transparent text-base'>
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='!w-[800px]'>
                      <div className='flex p-4'>
                        <div className='flex-1 space-y-4 pr-4 border-r'>
                          {menu.items!.map((item) => (
                            <NavigationMenuLink key={item.title} asChild>
                              <Link
                                href={item.href}
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
                            </NavigationMenuLink>
                          ))}
                        </div>
                        <div className='flex-1 pl-4'>
                          <NavigationMenuLink asChild>
                            <Link
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
                          </NavigationMenuLink>
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
                      {menu.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className='flex items-center gap-4'>
        <SearchMenu />
        <div className='flex items-center gap-x-2'>
          <Button asChild size='sm' className='w-24'>
            <Link href='/book-a-call'>Book a Call</Link>
          </Button>
          <Button
            asChild
            size='sm'
            className='bg-gradient-to-r from-orange-600 to-orange-700 border-0 w-24 text-white'>
            <Link href={session ? '/dashboard' : '/login'}>
              {session ? 'Dashboard' : 'Login'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN NAVBAR COMPONENT ---

export function Navbar({
  services,
}: {
  services: SerializedCategoryWithServices[];
}) {
  const { data: session } = authClient.useSession();

  return (
    <div className='top-0 z-50 sticky bg-white dark:bg-slate-900/95 backdrop-blur-lg border-slate-200/60 border-b border-b-slate-300/50 dark:border-b-slate-700/50'>
      <ComponentWrapper className='flex items-center mx-auto px-4 h-16 container'>
        {/* Renders the correct navbar based on screen size */}
        <MobileNavbar services={services} session={session} />
        <DesktopNavbar services={services} session={session} />
      </ComponentWrapper>
    </div>
  );
}
