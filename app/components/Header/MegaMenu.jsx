import React from 'react';
import gsap from 'gsap';

function MegaMenu({menu, megaMenu, setMegaMenu}) {
  const ref = React.useRef();
  const refTwo = React.useRef();
  const timeLineRef = React.useRef();
  timeLineRef.current = gsap.timeline({paused: true});
  const navElement = menu.items.filter((item) => item.title === megaMenu.title);
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(
      '--mega-menu-column',
      `${navElement[0]?.items.length}`,
    );
  }

  timeLineRef.current
    .set(refTwo.current, {display: 'none'})
    .to(ref.current, {height: 450})
    .to(refTwo.current, {display: 'grid'})
    .to(refTwo.current, {x: -100});

  // if (!megaMenu.isOpen) return undefined;
  return (
    <div
      ref={ref}
      onMouseLeave={() => {
        timeLineRef.current.play();
        //setMegaMenu({...megaMenu, isOpen: false});
        document.documentElement.style.setProperty('--mega-menu-height', '0px');
      }}
      className={`w-full py-14 absolute top-[100%] flex justify-center bg-white mega-menu`}
    >
      <div
        ref={refTwo}
        className="max-w-7xl grid grid-column-number gap-x-48 bg-white"
      >
        {navElement[0]?.items.map((item) => (
          <div className="flex flex-col items-start">
            <p className="mb-3 font-semibold">{item.title}</p>
            <ul>
              {item.items.map((item) => (
                <li className="capitalize"> {item.title} </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MegaMenu;
