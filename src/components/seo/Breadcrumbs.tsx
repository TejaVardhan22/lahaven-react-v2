import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { SITE_URL } from '@/utils/constants';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex flex-wrap items-center gap-1 font-sans text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0 text-[#6B5E55]/60"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  <span
                    className="font-semibold text-[#25313A]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-[#6B5E55] transition-colors duration-200 hover:text-[#365D60]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;

