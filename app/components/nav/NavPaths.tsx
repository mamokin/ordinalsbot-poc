'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HEADER_NAV_PATHS,
  NAV_PATH_LABELS,
  ROUTES
} from '../../lib/constants/routes';
import { Navbar } from '../navbar/Navbar';

export function NavPaths() {
  const currentPath = usePathname();
  const paths = Object.entries(HEADER_NAV_PATHS) as [ROUTES, string][];

  return (
    <>
      {paths.map(([key, value]) => {
        const isActive = currentPath === value;

        return (
          <Navbar.Item key={`path--${key}`} isDisabled={false}>
            <Link
              href={value}
              className={isActive ? 'active' : ''}
              aria-disabled={false}
            >
              {NAV_PATH_LABELS[key]}
            </Link>
          </Navbar.Item>
        );
      })}
    </>
  );
}
