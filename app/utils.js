import {useLocation, useMatches} from '@remix-run/react';
import {useMemo} from 'react';

import {useEffect, useLayoutEffect} from 'react';

export function useVariantUrl(handle, selectedOptions) {
  const {pathname} = useLocation();

  return useMemo(() => {
    return getVariantUrl({
      handle,
      pathname,
      searchParams: new URLSearchParams(),
      selectedOptions,
    });
  }, [handle, selectedOptions, pathname]);
}

export function getVariantUrl({
  handle,
  pathname,
  searchParams,
  selectedOptions,
}) {
  const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
  const isLocalePathname = match && match.length > 0;

  const path = isLocalePathname
    ? `${match[0]}products/${handle}`
    : `/products/${handle}`;

  selectedOptions.forEach((option) => {
    searchParams.set(option.name, option.value);
  });

  const searchString = searchParams.toString();

  return path + (searchString ? '?' + searchParams.toString() : '');
}

export function stripUrl(url) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  const newUrl =
    url.includes('myshopify.com') || url.includes(publicStoreDomain)
      ? new URL(url).pathname
      : url;

  return newUrl;
}

export function trim(str) {
  return str.replace(/\s+/g, ' ').trim();
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;




function randomNumber_(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
