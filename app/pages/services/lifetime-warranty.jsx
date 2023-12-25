import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from '@remix-run/react';
import Schema1 from '../../components/Blogs/Schema1';
export const meta = ({data}) => {
  return [{title: `Refund Policy`}];
};

export async function loader({params, context}) {
  return json({});
}

export default function Policy() {
  let text = [
    {
      title:
        'Discover Timeless Jewelry with Vianisa: Embrace Joyful Memories and Hassle-free Returns',
      context:
        "At Vianisa, our mission is simple yet profound - to bring our valued customers timeless pieces of jewelry that evoke joy and create lasting memories. We understand that preferences can change, and to ensure your utmost satisfaction, we offer a complimentary 30-day return and exchange policy for all our customers in the US. Whether you wish to exchange an item for a different size or style, or opt for a refund, rest assured, we've got you covered. In this article, we will walk you through our seamless process for returns and exchanges, as well as highlight some essential guidelines to ensure a smooth and delightful experience.",
    },
    {
      title: 'Complimentary Returns and Exchanges: Your Happiness Matters',
      context:
        "At Vianisa, we want you to cherish every jewelry piece you purchase from us. Hence, we extend a 30-day window for hassle-free returns and exchanges, starting from the date of shipping. If, within this period, you find yourself not completely satisfied with your purchase, take advantage of our complimentary return and exchange service - it's all about ensuring your happiness.",
    },
    {
      title: 'For Exchanges: Simple Steps to Discover the Perfect Piece',
      body: [
        {
          title: 'Reach Out to Our Dedicated Customer Service Team:',
          context:
            'To initiate the exchange process, all you need to do is contact our dedicated customer service team at hello@vianisa.com. They are always ready to assist you with warmth and professionalism.',
        },
        {
          title: 'Prepaid Return Shipping Label:',
          context:
            "We understand the importance of convenience, which is why we'll send you a prepaid return shipping label. This way, you can effortlessly send the item back to us for exchange.",
        },
        {
          title: 'Enjoy Your New Item:',
          context:
            "Once we receive the returned item, we won't keep you waiting. We promptly send you the new item of your choice, ensuring you find the perfect piece to complement your style.",
        },
      ],
    },
    {
      title: 'For Returns: A Straightforward Approach to Ease Your Mind',
      body: [
        {
          title: 'Initiate the Return Process: ',
          context:
            "If you decide to return an item, our customer service team is just an email away. Reach out to them at hello@vianisa.com, and they'll guide you through the return process with utmost care.",
        },
        {
          title: 'Prepaid Return Shipping Label:',
          context:
            "We value your time, and that's why we provide you with a prepaid return shipping label. Experience a hassle-free return, as we've got everything covered for you.",
        },
        {
          title: 'Refund Processing: ',
          context:
            'Once we receive the returned item, we process the refund promptly. Our refund process typically takes 3-5 business days, ensuring you receive your money back swiftly.',
        },
      ],
    },
  ];

  let newkomp = text.map((it) => {
    return (
      <div className="mb-[20.8px] ">
        <h3 className="mb-[20.8px] font-title">{it.title}</h3>
        {it.body ? (
          <ul className="mb-[20.8px] text-[13px] font-body pl-9">
            {it.body.map((punk) => (
              <li>
                <strong>{punk.title}</strong> {''}
                {punk.context}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px]">{it.context}</p>
        )}
      </div>
    );
  });
  return (
    <div className=" page max-w- m-auto px-[20px] pb-20">
      <Schema1 title="refund policy" children={newkomp}></Schema1>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;
