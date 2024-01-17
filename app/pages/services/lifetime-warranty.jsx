import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'title',
      content: "WHAT DOES A LIFETIME MANUFACTURER'S WARRANTY MEAN?",
    },
    {
      type: 'text',
      content: [
        "A lifetime manufacturer's warranty signifies that the manufacturer stands by their products. It involves offering repair or replacement for products that have been damaged or contain defects resulting from the manufacturing process.",
      ],
    },
    {
      type: 'title',
      content: "DO I HAVE A LIFETIME MANUFACTURER'S WARRANTY WITH VIANISA?",
    },
    {
      type: 'text',
      content: [
        "Certainly! At Vianisa, all our products come with a lifetime manufacturer's warranty. We provide this assurance to our customers with confidence because our products are meticulously crafted and free from manufacturing defects. If you believe your jewelry has been damaged due to manufacturing, you can send it to us for evaluation. Once the defects are assessed and confirmed as manufacturing-related, we will repair them free of charge or replace the item if necessary.",
        'Additionally, as your personal jeweler, we offer care services at Vianisa. We are committed to being there for you even years after your purchase. Our care services include prong tightening, re-polishing, rhodium plating, and cleaning. If you wish to utilize your lifetime warranty or require additional repair work, you can simply mail us your jewelry, and we will gladly take care of it.',
      ],
    },
    {
      type: 'title',
      content: 'CONDITIONS AND EXCLUSIONS',
    },
    {
      type: 'text',
      content: [
        "The lifetime manufacturer's warranty and complimentary services mentioned above are only applicable to the individual who purchased the covered product from Vianisa.",
        "If you have any maintenance, repair, sizing, or other service performed by someone other than Vianisa, your manufacturer's warranty will become void.",
        "It's important to note that fine jewelry is not indestructible and can be affected by daily wear, activities, and physical damage. Regular usage of our hands exposes jewelry to various risks. Vianisa does not offer warranties for everyday wear and tear, product loss, stone loss, or theft. Damages or losses resulting from a failure to maintain the product adequately are also not covered. Here are some examples of situations that would not be considered as manufacturing defects:",
      ],
    },
    {
      type: 'list',
      content: [
        'Discoloration caused by exposure to chemicals such as bleach, body lotions, or swimming pools.',
        'Prongs and precious metals used in daily wear require cleaning and polishing every six months or once a year due to build-up.',
        'Prongs that have been bent, worn out, or distorted due to physical damage or regular wear may result in stone loss.',
      ],
    },
    {
      type: 'title',
      content: 'WHAT IS JEWELRY INSURANCE?',
    },
    {
      type: 'text',
      content: [
        'Jewelry insurance is a service that provides coverage for the total value of your insured jewelry, protecting you against loss, theft, damage, and mysterious disappearance.',
      ],
    },
    {
      type: 'title',
      content: 'SHOULD I INSURE MY JEWELRY, WEDDING RING, OR ENGAGEMENT RING?',
    },
    {
      type: 'text',
      content: [
        'Insuring your Vianisa jewelry allows you the freedom to wear your cherished pieces without worry, knowing they are protected by a legally binding arrangement. The decision to insure your jewelry is entirely up to you and your personal preferences. However, it is advisable to seek insurance services from professional insurance groups. Vianisa does not provide or collaborate with any insurance providers. Nevertheless, we do provide the necessary documentation, such as invoices and appraisals, for insurance purposes.',
      ],
      className: '!mb-0',
    },
  ];

  return (
    <BlogSchema title="lifetime warranty">
      <BlogContent content={content} />
    </BlogSchema>
  );
}
