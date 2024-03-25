import {Link} from '@remix-run/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import {useCallback, useEffect, useRef, useState} from 'react';

export default function JudgemeReview({collection, className}) {
  const array = collection
    // .map((coll) => {
    //   const date = new Date(coll.created_at);
    //   const formattedDate = date.toLocaleDateString('en-US', {
    //     month: 'short',
    //     day: 'numeric',
    //     year: 'numeric',
    //   });

    //   return {
    //     Verified: coll.verified == 'buyer' || coll.verified == 'admin',
    //     Title: coll.title,
    //     Image: coll.pictures[0]?.urls.original,
    //     Star: coll.rating,
    //     Content: coll.body,
    //     User: coll.reviewer.name,
    //     User_link:
    //       'https://www.etsy.com/people/ej9iihqo7lm9rtnt?ref=shop_review',
    //     Date: formattedDate,
    //     Reviews_link:
    //       'https://www.etsy.com/listing/1255126452/minimalist-moissanite-engagement-ring?ref=shop_review',
    //   };
    // })
    .filter((item) => item.Image !== undefined);

  //   const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()]);
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, []);
  const [shuffledArray, setShuffledArray] = useState([...array]);
  shuffledArray.sort(() => Math.random() - 0.5);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  let stars = [1, 1, 1, 1, 1];
  return (
    <div className="w-full flex flex-col items-center md:px-12">
      <div className="w-full flex justify-center items-start">
        <button className="mt-56 h-0" onClick={scrollPrev}>
          <svg
            className="w-10 h-min cursor-pointer fill-zinc-700 hover:fill-zinc-500 dark:fill-white hover:dark:fill-gray-300 transition-colors md:mr-6"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="-100 -960 660 960"
            width="24"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>

        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="w-full flex max-md:gap-12 md:gap-6">
            {shuffledArray.map((it, idx) => (
              <ReviewItem
                Image={it.Image}
                Title={it.Title}
                Star={it.Star}
                Content={it.Content}
                User={it.User}
                User_link={it.User_link}
                Date={it.Date}
                Reviews_link={it.Reviews_link}
                Verified={it.Verified}
                key={idx}
              />
            ))}
          </div>
        </div>
        <button className="mt-56  h-0" onClick={scrollNext}>
          <svg
            className="w-10 h-min rotate-180 cursor-pointer fill-zinc-700 hover:fill-zinc-500 dark:fill-white hover:dark:fill-gray-300 transition-colors md:ml-6"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="-100 -960 660 960"
            width="24"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
        {/* 
      </div>
      <div className="etsy-footer flex gap-3 justify-center items-center mt-4">
        <a href="https://www.etsy.com/shop/vianisa#reviews">
          <img
            className="w-[50px] "
            src="https://cdn.etsy.reputon.com/img/img-logo-etsy.svg"
            alt=""
            srcSet=""
          />
        </a>
        <div className="flex flex-col justify-start items-start">
          <a
            href="https://www.etsy.com/shop/vianisa#reviews"
            className="text-base text-[#666]"
          >
            Vianisa
          </a>
          <div className="flex items-center ">
            <a
              className="flex items-center"
              href="https://www.etsy.com/shop/vianisa#reviews"
            >
              <p className="text-[#ff9900] text-lg font-bold mr-2">4.8</p>
              {stars.map((item, id) => (
                <svg
                  className="w-4 h-4 text-[#ff9900] me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                  key={id}
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </a>
          </div>
          <a
            href="https://www.etsy.com/shop/vianisa#reviews"
            className="text-xs text-[#666] hover:underline"
          >
            1334 reviews
          </a>
        </div> */}
      </div>
    </div>
  );
}

function ReviewItem({
  Image,
  Star,
  Title,
  Content,
  User,
  Date,
  User_link,
  Reviews_link,
  Verified,
}) {
  let stars = new Array(5);
  stars.fill(true, 0, Star);
  const start2 = [...stars];
  let fullStars = stars.filter((x) => x === true);
  let emptyStars = start2.filter((x) => x !== true);
  const TextWithToggle = ({text}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandable, setIsExpandable] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
      // Check if the text is taller than three lines initially
      const checkExpandable = () => {
        const newIsExpandable =
          textRef.current.scrollHeight >
          3 * parseFloat(getComputedStyle(textRef.current).lineHeight) + 1;

        if (newIsExpandable !== isExpandable) {
          setIsExpandable(newIsExpandable);

          // Auto-expand if not expandable initially
          /* if (!newIsExpandable) {
            setIsExpanded(true);
          } */
        }
      };

      checkExpandable();

      window.addEventListener('resize', checkExpandable);
      return () => {
        // Clean up state when component unmounts
        window.removeEventListener('resize', checkExpandable);
      };
    }, [isExpandable, text]);

    const toggleText = () => {
      setIsExpanded(!isExpanded);
    };

    const textClass = isExpanded ? 'line-clamp-none' : 'line-clamp-3';
    const shadowClass = isExpandable ? (isExpanded ? '' : 'white-shadow') : '';

    return (
      <div style={{textAlign: 'left'}}>
        <div
          ref={textRef}
          className={`text-sm text-[#777] leading-[1.45] ${textClass} relative w-full`}
        >
          <div
            className={`${shadowClass} font-avenir-medium`}
            style={{textAlign: 'left'}}
          >
            {text}
          </div>
        </div>

        {isExpandable ? (
          <button
            className="underline hover:no-underline text-sm"
            onClick={toggleText}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        ) : (
          ''
        )}
      </div>
    );
  };
  return (
    <div
      //   className="flex-[0_0_25%] min-w-[200px] first:ml-8"
      className="flex-grow min-w-[300px] first:ml-8"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="bg-[#fafafb] p-5 rounded-md"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          borderRadius: 10,
          // boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <div className="flex items-center " style={{marginBottom: 40}}>
          {fullStars.map((star, id) => (
            <svg
              className="w-4 h-4 text-[#545454] ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
              key={id}
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          {emptyStars.map((star, id) => (
            <svg
              className="w-4 h-4 ms-1"
              stroke="#ccc"
              strokeWidth="2"
              fill="#fafafb"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 20"
              key={id}
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          {Verified && (
            <img
              className="w-5 "
              src="https://cdn.shopify.com/s/files/1/0732/4434/4619/files/verified-check-blue.svg?v=1705402957"
              alt=""
              style={{marginLeft: 10, filter: 'hue-rotate(204deg)'}}
            />
          )}
        </div>
        <div className="mb-2  flex flex-col items-start justify-start">
          <TextWithToggle text={Content} />
        </div>
        {Image ? (
          <div style={{marginTop: 'auto'}}>
            {/* <Link to={Reviews_link}> */}
            <img
              alt={User}
              src={Image}
              className="rounded-md"
              style={{maxHeight: 300, objectFit: 'cover', width: '100%'}}
            />
            {/* </Link> */}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-col text-left" style={{padding: 20}}>
        <h1 className="text-sm font-bold text-[#427fed] hover:underline leading-[24px]">
          {User}
        </h1>
        <p className="text-[13px] text-[#999]">{Date}</p>
      </div>
    </div>
  );
}
