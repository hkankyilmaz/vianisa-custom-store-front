import {Link} from '@remix-run/react';

import photo1 from '../../assets/1.webp';
import photo2 from '../../assets/2.webp';
import photo3 from '../../assets/3.webp';
import photo4 from '../../assets/4.webp';

function CollectionList({
  className = '',
  classNames = {
    item: '',
  },
}) {
  const items = [
    {
      title: 'MOISSANITE ENGAGEMENT RINGS',
      photo: photo1,
      to: 'collections/moissanite-engagement-rings',
    },
    {
      title: 'MOISSANITE BANDS',
      photo: photo2,
      to: 'collections/moissanite-bands',
    },
    {
      title: 'PLAIN GOLD BANDS',
      photo: photo3,
      to: 'classic-wedding-bands',
    },
    {
      title: 'BRACELETS',
      photo: photo4,
      to: 'collections/bracelets',
    },
  ];
  return (
    <div className={`mb-[100px] font-montserratMd w-full h-full ${className}`}>
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

        <div className="absolute left-0 bottom-6 px-6 sm:bottom-10 sm:px-10 min-[1140px]:bottom-[50px] min-[1140px]:px-[50px] flex flex-col gap-5 lg:gap-[30px] font-montserratMd z-10">
          <h2 className="text-white -mt-[0.325em] !font-medium text-left text-[16px] sm:text-[21px] transition-[color] duration-200 ease-css-ease-in-out uppercase tracking-[.2em]">
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
