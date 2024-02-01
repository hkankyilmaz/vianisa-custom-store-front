import {useMatches} from '@remix-run/react';
import {Link} from '@remix-run/react';

export function Title() {
  const matchs = useMatches().filter(Boolean);

  return (
    <p className="my-3 font-avenir-light max-w-[1330px] mx-auto pl-2 md:pl-[50px] [&>*]:text-[#999999]">
      {(() => {
        return (
          <>
            <Link className="hover:underline" to="/">
              Home
            </Link>{' '}
            &nbsp;<span>/</span>&nbsp;
            {matchs.map((match, idx) =>
              idx === 1 ? match?.handle?.breadcrumb(match) : undefined,
            )}
          </>
        );
      })()}
    </p>
  );
}
