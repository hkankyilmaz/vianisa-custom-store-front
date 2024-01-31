import {useMatches} from '@remix-run/react';

export function Title() {
  console.log(useMatches());

  const title = useMatches()
    .map((match) => {
      let breadcrumb = match.handle?.breadcrumb;
      if (typeof breadcrumb === 'function') breadcrumb = breadcrumb(match);
      return breadcrumb;
    })
    .filter(Boolean)
    .join(' / ');

  console.log('title', title);
  return <p>{title}</p>;
}
