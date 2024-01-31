import {Link} from '@remix-run/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import {useCallback, useEffect, useRef, useState} from 'react';

export default function EtsyReview({collection, className}) {
  let array = [
    {
      Image:
        'https://i.etsystatic.com/iap/0e16f0/5679463160/iap_640x640.5679463160_om7fmw41.jpg?version=0',
      Star: 5,
      Content: 'Beautiful ring and arrived very quickly!',
      User: 'John',
      User_link: 'https://www.etsy.com/people/ej9iihqo7lm9rtnt?ref=shop_review',
      Date: 'Jan 16, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1255126452/minimalist-moissanite-engagement-ring?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/e99841/5668622828/iap_300x300.5668622828_qykk6zqy.jpg?version=0',
      Star: 5,
      Content:
        'Amazing! Beautiful! Gorgeous! Stunning and such a sparkler, ring sparkles in the box when you open it from a little spotlight. Perfect quality. Dan and the team are super responsive and I am so impressed with the ring. 10,000 thank yous!',
      User: 'Kelly',
      User_link: 'https://www.etsy.com/people/tcjdkeog?ref=shop_review',
      Date: 'Jan 12, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1560408182/1-15-2-ct-marquise-shape-ring-moissanite?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/947291/5713344607/iap_300x300.5713344607_dztz5zyc.jpg?version=0',
      Star: 5,
      Content:
        'I absolutely LOVE this ring. It looks like it matches my engagement ring perfectly. So delicate and beautiful.',
      User: 'Madison',
      User_link: 'https://www.etsy.com/people/madisonanderson7?ref=shop_review',
      Date: 'Jan 11, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1401934363/vintage-marquise-moissanite-wedding-band?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/1d7663/5664868780/iap_300x300.5664868780_kjd7wzoi.jpg?version=0',
      Star: 5,
      Content:
        'This ring is beautiful! I got this for when I want to wear a different style of engagement ring and it was well worth it. I opted for the cz stone and it is beautiful and great quality. Shipped in a week and arrived in a cute ring box. I would definitely buy from this seller again.',
      User: 'Sarah',
      User_link: 'https://www.etsy.com/people/sarahmedel?ref=shop_review',
      Date: 'Jan 11, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1265733863/15-ct-emerald-cut-solitaire-moissanite?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/97ec4b/5708710115/iap_300x300.5708710115_k8smhlw8.jpg?version=0',
      Star: 5,
      Content:
        'The ring is absolutely beautiful! It matched my rose gold pink morganite ring perfect to make a beautiful wedding set! I collect wedding sets!!',
      User: 'Tracie',
      User_link: 'https://www.etsy.com/people/p5hotjun?ref=shop_review',
      Date: 'Jan 10, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1266355095/half-eternity-moissanite-wedding-band?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/dbb7a0/5702913789/iap_300x300.5702913789_pxlynkjn.jpg?version=0',
      Star: 5,
      Content:
        'The item is absolutely stunning and I couldn’t be happier. The customer service is SUPERB!',
      User: 'Krystal Vazquez',
      User_link: 'https://www.etsy.com/people/wtm5zbg8okx2b0ld?ref=shop_review',
      Date: 'Jan 8, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1251749152/marquise-accent-moissanite-engagement?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/dd3d39/5614493728/iap_300x300.5614493728_iuhviafu.jpg?version=0',
      Star: 5,
      Content:
        'Absolutely stunning ring! Excellent communication from the seller, fast shipping and prompt service. I actually bought 2 different rings to see which matched my engagement ring better - this is the one I ended up returning, but I was sad to send it back! It’s so beautiful! The return process was super simple and quick. Though the ring itself shipped from Turkey, the return was to a NY address which I was happy about. Overall I would highly recommend this ring and this seller, even though I didn’t end up keeping this ring myself. I will note if you have small hands/fingers (I am ring size 5) that the stones wrap halfway around your finger, not just sitting on top. Makes it look like a full eternity but I found it a little uncomfortable. But overall 10/10 experience and product.',
      User: 'Danielle',
      User_link: 'https://www.etsy.com/people/Delaks?ref=shop_review',
      Date: 'Dec 22, 2023',
      Reviews_link:
        'https://www.etsy.com/listing/1401921605/baguette-and-double-round-wedding-ring?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/b8ef28/5692611241/iap_300x300.5692611241_gj3hhsxp.jpg?version=0',
      Star: 5,
      Content: 'Beautiful band stacked nicely with my engagement ring',
      User: 'Adian',
      User_link: 'https://www.etsy.com/people/adinarobello1?ref=shop_review',
      Date: 'Jan 7, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1401934363/vintage-marquise-moissanite-wedding-band?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/3742fe/5695387207/iap_300x300.5695387207_t3odg8hp.jpg?version=0',
      Star: 5,
      Content:
        'Customer service was great I received a message shortly after I placed my order thanking me for my order and checking to make sure I ordered the right size because I ordered a 5 1/4. The ring came in today and it was a perfect fit. It is beautiful.',
      User: 'kristidelahoussaye',
      User_link:
        'https://www.etsy.com/people/kristidelahoussaye?ref=shop_review',
      Date: 'Jan 5, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1266355095/half-eternity-moissanite-wedding-band?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/12c37b/5645672014/iap_300x300.5645672014_aofxkezj.jpg?version=0',
      Star: 5,
      Content:
        'Gorgeous ring. Communication was wonderful. We definitely recommend and will purchase more items in the future.',
      User: 'Glenda',
      User_link: 'https://www.etsy.com/people/glenda2222?ref=shop_review',
      Date: 'Jan 5, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1265733863/15-ct-emerald-cut-solitaire-moissanite?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/4160b4/5686401341/iap_300x300.5686401341_m1yakwkn.jpg?version=0',
      Star: 5,
      Content:
        'My ring is absolutely beautiful! I ordered the 1.800 mm. It goes so perfectly with my engagement ring. The seller shipped super quickly and helped me decide what size to get.',
      User: 'Taylor',
      User_link: 'https://www.etsy.com/people/yzbhx1846nte9lj9?ref=shop_review',
      Date: 'Jan 2, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1266787651/14k-solid-gold-moissanite-full-eternity?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/42dfc9/5697763069/iap_300x300.5697763069_a94fgdqm.jpg?version=0',
      Star: 5,
      Content:
        'Couldn’t love our wedding rings any more!!! Exactly what we wanted!!',
      User: 'Santana Jasmine',
      User_link: 'https://www.etsy.com/people/2qns7xca41j9h65a?ref=shop_review',
      Date: 'Jan 6, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1254670418/art-deco-moissanite-bridal-set-14k-gold?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/f795a7/5683951481/iap_300x300.5683951481_kfpt8btx.jpg?version=0',
      Star: 5,
      Content:
        'This company was AMAZING! And SO helpful! I ordered the wrong color ring, they helped me with everything! They got me the right color ring and it shipped FAST!!! Especially since it is my wedding band! I loved them! Very kind, very helpful and also wonderful packaging. They know what they are doing for sure! I loved loved loved this company!!!!!',
      User: 'Sign in with Apple user',
      User_link: 'https://www.etsy.com/people/143635gowenzvtdn?ref=shop_review',
      Date: 'Jan 1, 2024',
      Reviews_link:
        'https://www.etsy.com/listing/1266355095/half-eternity-moissanite-wedding-band?ref=shop_review',
    },
    {
      Image:
        'https://i.etsystatic.com/iap/63fa3c/5660485981/iap_300x300.5660485981_2gockmht.jpg?version=0',
      Star: 5,
      Content:
        'Such great quality! It looks beautiful with my radiant cut engagement ring',
      User: 'Lindsay Abbott',
      User_link: 'https://www.etsy.com/people/qvlyopai?ref=shop_review',
      Date: 'Dec 21, 2023',
      Reviews_link:
        'https://www.etsy.com/listing/1266355095/half-eternity-moissanite-wedding-band?ref=shop_review',
    },
  ];
  // const [emblaRef, emblaApi] = useEmblaCarousel({loop: false});
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()]);
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
    <div className="w-full flex flex-col items-center mt-24 md:px-24">
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
        </div>
      </div>
    </div>
  );
}
function ReviewItem({
  Image,
  Star,
  Content,
  User,
  Date,
  User_link,
  Reviews_link,
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
      <div>
        <div
          ref={textRef}
          className={`text-sm text-[#777] leading-[1.45] ${textClass} relative w-full`}
        >
          <div className={`${shadowClass}`}> {text}</div>
        </div>

        {isExpandable ? (
          <button className="underline hover:no-underline" onClick={toggleText}>
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        ) : (
          ''
        )}
      </div>
    );
  };
  return (
    <div className=" flex-[0_0_25%] min-w-[200px] first:ml-8">
      <div className="bg-[#fafafb] rounded-md mb-5 ">
        <div className="flex flex-row justify-between mt-3 py-3">
          <div className="flex justify-center gap-2">
            <div className="flex items-center ">
              {fullStars.map((star, id) => (
                <svg
                  className="w-4 h-4 text-[#ff9900] ms-1"
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
            </div>
            <img
              className="w-5 "
              src="https://cdn.shopify.com/s/files/1/0732/4434/4619/files/verified-check-blue.svg?v=1705402957"
              alt=""
            />
          </div>
          <div className="mr-3">
            <img
              className="w-[30px] "
              src="https://cdn.etsy.reputon.com/img/img-logo-etsy.svg"
              alt=""
              srcSet=""
            />
          </div>
        </div>
        <div className="text-left p-2 flex flex-col">
          <div className="mb-2  flex flex-col items-start justify-start">
            <TextWithToggle text={Content} />
          </div>
          {Image ? (
            <div className="flex text-center items-center justify-center p-1 ">
              <Link to={Reviews_link}>
                <img alt={User} src={Image} className="rounded-md" />{' '}
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="flex flex-col text-left ">
        <Link
          className="text-sm font-bold text-[#427fed] hover:underline leading-[24px]"
          to={User_link}
        >
          {User}
        </Link>
        {/* <p className="font-avenir-light text-sm">{User}</p> */}
        <p className="text-[13px] text-[#999]">{Date}</p>
      </div>
    </div>
  );
}
