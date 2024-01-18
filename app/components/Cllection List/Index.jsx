import {Link} from '@remix-run/react';

import bracelets from '~/assets/images/bracelets.webp';
import goldBands from '~/assets/images/gold-bands.webp';
import moissaniteBands from '~/assets/images/moissanite-bands.webp';
import moissaniteRings from '~/assets/images/moissanite-rings.webp';

function CollectionList({
  className = '',
  classNames = {
    item: '',
  },
}) {
  const items = [
    {
      title: 'MOISSANITE ENGAGEMENT RINGS',
      photo: moissaniteRings,
      to: 'collections/moissanite-engagement-rings',
    },
    {
      title: 'MOISSANITE BANDS',
      photo: moissaniteBands,
      to: 'collections/moissanite-bands',
    },
    {
      title: 'PLAIN GOLD BANDS',
      photo: goldBands,
      to: 'classic-wedding-bands',
    },
    {
      title: 'BRACELETS',
      photo: bracelets,
      to: 'collections/bracelets',
    },
  ];
  return (
    <div className={`mb-[100px] font-avenir-medium w-full h-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 m-3 sm:m-[15px]">
        {items.map((item, index) => (
          <Item key={index} {...item} className={classNames.item} />
        ))}
      </div>
    </div>
  );
}

function Item({title, photo, to, className = ''}) {
  return (
    <div
      className={`m-3 sm:m-[15px] overflow-hidden cursor-pointer ${className}`}
    >
      <Link to={to} className="relative group">
        <img
          className="w-full h-[500px] object-center object-cover duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-125 overflow-hidden"
          src={photo}
        />

        <div className="absolute left-0 bottom-6 px-6 sm:bottom-10 sm:px-10 min-[1140px]:bottom-[50px] min-[1140px]:px-[50px] flex flex-col gap-5 lg:gap-[30px] font-avenir-medium z-10">
          <h2 className="text-white -mt-[0.325em] text-left text-[16px] sm:text-[21px] transition-[color] duration-200 ease-css-ease-in-out uppercase tracking-[.2em]">
            {title}
          </h2>
          <button className="text-[11px] py-[14px] px-[28px] border border-solid border-white font-extrabold text-[var(--col-list-btn-fg)] bg-white hover:text-white hover:bg-transparent transition-all duration-[350ms] ease-css-ease uppercase tracking-[.2em] max-w-fit">
            See More
          </button>
        </div>
      </Link>
    </div>
  );
}

export default CollectionList;
