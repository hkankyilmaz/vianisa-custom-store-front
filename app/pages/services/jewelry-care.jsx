import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Page() {
  const content = [
    {
      type: 'text',
      content: [
        'Here at Vianisa, every piece is handmade with solid gold. Bear in mind that solid gold jewelry can develop scratches over time due to regular wear and contact with hard surfaces. Although scratches are inevitable to some extent, here are some tips to minimize the amount:',
      ],
    },
    {
      type: 'list',
      content: [
        'Store each piece of gold jewelry separately in a soft cloth or individual jewelry pouch to prevent them from rubbing against each other. This helps minimize surface contact and reduces the likelihood of scratches.',
        'Avoid wearing your gold jewelry during activities that may expose them to rough surfaces or potential impacts.',
        'Remove your gold jewelry before engaging in tasks such as gardening, cleaning, or sports.',
        'Be mindful of how you handle your gold jewelry and avoid contact with abrasive materials.',
        'When cleaning your gold jewelry, use a soft-bristled brush or cloth to gently remove any dirt or debris, avoiding harsh scrubbing that could cause scratches.',
      ],
    },
    {
      type: 'text',
      content: [
        'By adopting these practices, you can help preserve the beauty and shine of your solid gold jewelry and minimize the occurrence of scratches.',
      ],
    },
    {
      type: 'title',
      content: 'GENERAL JEWELRY CARE GUIDELINES',
    },
    {
      type: 'list',
      content: [
        'Cleaning techniques: Create a solution of warm water and mild dish soap, and soak the jewelry for a few minutes. Use a soft brush to gently scrub away dirt and debris. Rinse the jewelry with clean water and pat dry with a soft cloth.',
        'Storing jewelry: Store jewelry in separate compartments or pouches to prevent scratching. Keep it in a cool, dry place away from direct sunlight and humidity, as exposure to moisture can cause tarnishing and damage.',
        'Handling and wearing jewelry: Remove jewelry before engaging in activities such as swimming, exercising, or using cleaning chemicals. Avoid exposing jewelry to harsh chemicals, including perfumes, lotions, and hair sprays, as they can cause discoloration or damage.',
        'Proper removal and storage: When removing jewelry, gently handle it by the metal parts, avoiding pulling or tugging on delicate components. Store each piece individually in soft cloth or pouches to prevent tangling and scratching.',
        'Activities to avoid: Remove jewelry before engaging in activities that may subject it to excessive force, such as heavy lifting or contact sports. Additionally, avoid wearing jewelry while doing household chores or working with harsh chemicals that can damage or discolor metals and gemstones.',
      ],
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        'We strongly recommend contacting a professional jeweler periodically to have your jewelry assessed and cleaned in a safe way. Depending on the type of jewelry piece, you may need repolishing or replating services, both of which should be done by experts.',
      ],
    },
    {
      type: 'text',
      content: [
        'Feel free to contact us if you have any questions about your jewelry and our team of experts will help you with the best practices in the industry.',
      ],
      className: '!mb-0',
    },
  ];

  return (
    <BlogSchema title="jewelry care">
      <BlogContent content={content} />
    </BlogSchema>
  );
}
