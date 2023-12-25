import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import Schema1 from '../../components/Blogs/Schema1';

export const meta = ({data}) => {
  return [{title: `Jewelry Care`.toUpperCase() + ' - Vianisa'}];
};

export async function loader({params, context}) {
  return json({});
}

export default function Page() {
  let text = [
    {
      // title: '',
      context:
        'Here at Vianisa, every piece is handmade with solid gold. Bear in mind that solid gold jewelry can develop scratches over time due to regular wear and contact with hard surfaces. Although scratches are inevitable to some extent, here are some tips to minimize the amount:',
    },

    {
      // title: 'For Exchanges: Simple Steps to Discover the Perfect Piece',
      body: [
        {
          context:
            'Store each piece of gold jewelry separately in a soft cloth or individual jewelry pouch to prevent them from rubbing against each other. This helps minimize surface contact and reduces the likelihood of scratches.',
        },
        {
          context:
            'Avoid wearing your gold jewelry during activities that may expose them to rough surfaces or potential impacts.',
        },
        {
          context:
            'Remove your gold jewelry before engaging in tasks such as gardening, cleaning, or sports.',
        },
        {
          context:
            'Be mindful of how you handle your gold jewelry and avoid contact with abrasive materials.',
        },
        {
          context:
            'When cleaning your gold jewelry, use a soft-bristled brush or cloth to gently remove any dirt or debris, avoiding harsh scrubbing that could cause scratches.',
        },
      ],
    },
    {
      context:
        'By adopting these practices, you can help preserve the beauty and shine of your solid gold jewelry and minimize the occurrence of scratches.',
    },
    {
      title: 'GENERAL JEWELRY CARE GUIDELINES',
      body: [
        {
          title: 'Cleaning techniques:',
          context:
            'Create a solution of warm water and mild dish soap, and soak the jewelry for a few minutes. Use a soft brush to gently scrub away dirt and debris. Rinse the jewelry with clean water and pat dry with a soft cloth.',
        },
        {
          title: 'Storing jewelry:',
          context:
            'Store jewelry in separate compartments or pouches to prevent scratching. Keep it in a cool, dry place away from direct sunlight and humidity, as exposure to moisture can cause tarnishing and damage.',
        },
        {
          title: 'Handling and wearing jewelry:',
          context:
            'Remove jewelry before engaging in activities such as swimming, exercising, or using cleaning chemicals. Avoid exposing jewelry to harsh chemicals, including perfumes, lotions, and hair sprays, as they can cause discoloration or damage.',
        },
        {
          title: 'Proper removal and storage:',
          context:
            'When removing jewelry, gently handle it by the metal parts, avoiding pulling or tugging on delicate components. Store each piece individually in soft cloth or pouches to prevent tangling and scratching.',
        },
        {
          title: 'Activities to avoid:',
          context:
            'Remove jewelry before engaging in activities that may subject it to excessive force, such as heavy lifting or contact sports. Additionally, avoid wearing jewelry while doing household chores or working with harsh chemicals that can damage or discolor metals and gemstones.',
        },
      ],
    },
    {
      context:
        'We strongly recommend contacting a professional jeweler periodically to have your jewelry assessed and cleaned in a safe way. Depending on the type of jewelry piece, you may need repolishing or replating services, both of which should be done by experts.',
    },
    {
      context:
        'Feel free to contact us if you have any questions about your jewelry and our team of experts will help you with the best practices in the industry.',
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
