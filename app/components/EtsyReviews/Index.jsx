import * as React from 'react';
import {Link} from '@remix-run/react';
import useEmblaCarousel from 'embla-carousel-react';
import {useEffect, useState, useCallback} from 'react';
import Autoplay from 'embla-carousel-autoplay';

export default function EtsyReview({collection, className}) {
  let array = [
    {
      Image:
        'https://i.etsystatic.com/iap/b8ef28/5692611241/iap_300x300.5692611241_gj3hhsxp.jpg?version=0',
      Star: 5,
      Content: 'Beautiful band stacked nicely with my engagement ring',
      User: 'Adian',
      User_link: 'https://www.etsy.com/people/adinarobello1?ref=shop_review',
      Date: 'Jan 7,2024',
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
      Date: 'Jan 5,2024',
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
      Date: 'Jan 5,2024',
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
      Date: 'Jan 2,2024',
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
      Date: 'Jan 6,2024',
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
      Date: 'Jan 1,2024',
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
      Date: 'Dec 21,2023',
      Reviews_link:
        'https://www.etsy.com/listing/1266355095/half-eternity-moissanite-wedding-band?ref=shop_review',
    },
  ];
  // const [emblaRef, emblaApi] = useEmblaCarousel({loop: false});
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  /*
  return (
    <div className={className}>
      {array.map((it) => (
        <ReviewItem
          Image={it.Image}
          Title={it.Title}
          Content={it.Content}
          User={it.User}
          Date={it.Date}
        />
      ))}
    </div>
  ); */
  return (
    <>
      <div className="overflow-hidden m-24 " ref={emblaRef}>
        <div className="flex gap-6">
          {array.map((it) => (
            <ReviewItem
              Image={it.Image}
              Title={it.Title}
              Content={it.Content}
              User={it.User}
              User_link={it.User_link}
              Date={it.Date}
              Reviews_link={it.Reviews_link}
            />
          ))}
        </div>
      </div>
      {/* <button className="" onClick={scrollPrev}>
        Prev
      </button>
      <button className="" onClick={scrollNext}>
        Next
      </button> */}
    </>
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
  return (
    <div className=" flex-[0_0_25%] min-w-0 first:ml-8">
      <div className="bg-[#fafafb] rounded-md mb-5 ">
        <div className="flex flex-row justify-between mt-3 py-3">
          <div class="flex items-center ">
            <svg
              class="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <div className="mr-3">
            <p>Etsy</p>
          </div>
        </div>
        <div className="text-left p-2 flex flex-col">
          <div className="mb-2">
            <p className="font-body_light text-sm ">{Content}</p>
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
          className="font-body_light text-sm text-blue-500 hover:underline"
          to={User_link}
        >
          {User}
        </Link>
        {/* <p className="font-body_light text-sm">{User}</p> */}
        <p className="font-body_light text-sm">{Date}</p>
      </div>
    </div>
  );
}
