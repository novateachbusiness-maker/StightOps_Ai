import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '../utils/seo.ts';

export interface BreadcrumbCrumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullItems = [{ name: 'Home', path: '/' }, ...items];

  // Also prepare schema for structured data
  const breadcrumbSchema = generateBreadcrumbSchema(
    fullItems.map((item) => ({ name: item.name, url: item.path }))
  );

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ol className="flex items-center flex-wrap gap-2 text-xs text-slate-300 font-medium">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span className="text-white font-semibold" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center gap-1 text-slate-300 hover:text-[#00D2FF] transition-colors"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
