'use client';

import { useState, useEffect, useRef } from 'react';
import { Command } from 'cmdk';
import { Search, X, FileText, Shield, Code, Database } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'blog' | 'case-study' | 'malware-log';
  slug: string;
  url: string;
}

interface SearchModalV1Props {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalV1Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const searchData = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      // Search services
      // const serviceResults: SearchResult[] = allServices
      //   .filter(
      //     (service) =>
      //       service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      //       service.description
      //         .toLowerCase()
      //         .includes(searchQuery.toLowerCase()),
      //   )
      //   .slice(0, 5)
      //   .map((service) => ({
      //     id: `service-${service.slug}`,
      //     title: service.title,
      //     description: service.description,
      //     type: 'service' as const,
      //     slug: service.slug,
      //     url: `/services/${service.slug}`,
      //   }));

      // Fetch blogs, case studies, and malware logs
      const [blogs, caseStudies] = await Promise.all([
        fetch(
          `/api/search?type=blog&q=${encodeURIComponent(searchQuery)}`,
        ).then((r) => r.json()),
        fetch(
          `/api/search?type=case-study&q=${encodeURIComponent(searchQuery)}`,
        ).then((r) => r.json()),
      ]);

      const blogResults: SearchResult[] =
        blogs.posts?.slice(0, 5).map((post: any) => ({
          id: `blog-${post.id}`,
          title: post.title,
          description: post.excerpt || 'Blog post',
          type: 'blog' as const,
          slug: post.slug,
          url: `/blog/${post.slug}`,
        })) || [];

      const caseStudyResults: SearchResult[] =
        caseStudies.posts?.slice(0, 5).map((post: any) => ({
          id: `case-study-${post.id}`,
          title: post.title,
          description: post.excerpt || 'Case study',
          type: 'case-study' as const,
          slug: post.slug,
          url: `/case-studies/${post.slug}`,
        })) || [];

      setResults([...blogResults, ...caseStudyResults]);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchData(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Code className='w-4 h-4' />;
      case 'blog':
        return <FileText className='w-4 h-4' />;
      case 'case-study':
        return <Shield className='w-4 h-4' />;
      case 'malware-log':
        return <Database className='w-4 h-4' />;
      default:
        return <Search className='w-4 h-4' />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service':
        return 'text-blue-400';
      case 'blog':
        return 'text-green-400';
      case 'case-study':
        return 'text-purple-400';
      case 'malware-log':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.type]) acc[result.type] = [];
      acc[result.type].push(result);
      return acc;
    },
    {} as Record<string, SearchResult[]>,
  );

  if (!isOpen) return null;

  return (
    <div className='z-50 fixed inset-0 bg-black/50 backdrop-blur-sm'>
      <div className='flex justify-center items-start px-4 pt-16 min-h-screen'>
        <div
          ref={modalRef}
          className='bg-slate-800 shadow-2xl border border-slate-700 rounded-lg w-full max-w-2xl'>
          <Command className='bg-transparent'>
            <div className='flex items-center gap-3 p-4 border-slate-700 border-b'>
              <Search className='w-5 h-5 text-slate-400' />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder='Search services, blogs, case studies...'
                className='flex-1 bg-transparent outline-none text-white placeholder-slate-400'
              />
              <button
                onClick={onClose}
                className='text-slate-400 hover:text-white transition-colors'>
                <X className='w-5 h-5 cursor-pointer' />
              </button>
            </div>

            <Command.List className='p-2 max-h-96 overflow-y-auto'>
              {loading && (
                <div className='p-4 text-slate-400 text-center'>
                  Searching...
                </div>
              )}

              {!loading && query && results.length === 0 && (
                <div className='p-4 text-slate-400 text-center'>
                  No results found for "{query}"
                </div>
              )}

              {Object.entries(groupedResults).map(([type, items]) => (
                <Command.Group
                  key={type}
                  heading={
                    <div className='flex items-center gap-2 px-2 py-1 font-medium text-slate-300 text-xs uppercase tracking-wider'>
                      {getIcon(type)}
                      {type.replace('-', ' ')}s
                    </div>
                  }>
                  {items.map((result) => (
                    <Command.Item
                      key={result.id}
                      value={`${result.type} ${result.title} ${result.description}`}
                      onSelect={() => handleSelect(result.url)}
                      className='flex items-start gap-3 hover:bg-slate-700 p-3 rounded-lg transition-colors cursor-pointer'>
                      <div className={`mt-1 ${getTypeColor(result.type)}`}>
                        {getIcon(result.type)}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='font-medium text-white truncate'>
                          {result.title}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: result.description,
                          }}
                          className='mt-1 text-slate-400 text-sm line-clamp-2'></div>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
