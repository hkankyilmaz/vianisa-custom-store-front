import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'title',
      content: 'MOISSANITE VS. DIAMOND: A COMPARISON',
    },
    {
      type: 'text',
      content: [
        "When considering gemstone options, moissanite stands as a top choice after diamonds. It boasts exceptional brilliance, durability comparable to diamonds, and a conflict-free origin. As a result of lab-growing, moissanite offers ethical and consistent quality, making it an affordable alternative. At Vianisa, we design engagement rings primarily with moissanite, but we can accommodate other gemstone preferences upon request. Let's delve deeper into moissanite and help you decide between diamonds and moissanite.",
      ],
    },
    {
      type: 'combinedText',
      content: [
        'ORIGIN: ',
        'Discovered by Henri Moissan in 1893, moissanite is a rare mineral found in a meteorite-formed crater. While its origin can be traced back to the stars, the only available versions of moissanite are lab-created.',
      ],
      classNames: {
        text: 'first:font-optima-medium',
      },
    },
    {
      type: 'combinedText',
      content: [
        'PRICING: ',
        "Moissanite is particularly favored in engagement rings due to its favorable pricing compared to diamonds, while still offering comparable quality in many aspects. The price range of natural diamonds is determined by cut, clarity, color, and carat weight. In contrast, moissanite's price varies primarily based on color and size. Opting for a larger, higher-quality moissanite often costs less than choosing a smaller, lower-quality natural diamond for your engagement ring.",
      ],
      classNames: {
        text: 'first:font-optima-medium',
      },
    },
    {
      type: 'combinedText',
      content: [
        'SIZE & SHAPE: ',
        'Let\'s clarify the concept of "size." A 6.5 mm diamond weighs 1.0 carat (0.2 grams), while a 6.5 mm moissanite weighs 0.88 carats. Although moissanite is not measured in carats, we use this terminology to illustrate that the stone appears similar in size to a 1.0-carat diamond. When you purchase a 1.0-carat moissanite, the stone will be 6.5 mm, just like a diamond.',
      ],
      classNames: {
        text: 'first:font-optima-medium',
      },
    },
    {
      type: 'text',
      content: [
        'Moreover, moissanite is available in all the same shapes as diamonds, and we use the same names to refer to them.',
      ],
    },
    {
      type: 'combinedText',
      content: [
        'COLOR & CLARITY: ',
        'Due to its lab-created nature, moissanite comes in two options: "colorless" (comparable to D, E, F in diamonds) and "near colorless" (similar to G, H, I in diamonds). At Vianisa, all our moissanites are colorless. Additionally, these lab-grown gems typically exhibit the desirable clarity level of "VSI" (very slightly included) according to the GIA diamond clarity scale. Vianisa features high-quality moissanites in our designs, ensuring captivating engagement rings.',
      ],
      classNames: {
        text: 'first:font-optima-medium',
      },
    },
    {
      type: 'combinedText',
      content: [
        'HARDNESS & DURABILITY: ',
        'The Mohs Scale of Hardness measures the scratch resistance of minerals. Diamond, with a score of 10 on the scale, is the hardest naturally occurring mineral on Earth, making it exceptionally durable for everyday wear. Moissanite follows closely behind, scoring between 9.25 and 9.50 on the Mohs scale. It remains an excellent option for daily wear, offering impressive durability without significant abrasion.',
      ],
      classNames: {
        text: 'first:font-optima-medium',
      },
    },
    {
      type: 'text',
      content: [
        'Moissanite surpasses all gemstones, including diamonds, in brilliance and fire. This gemstone exhibits exceptional refractivity, emitting maximum white light and creating a dazzling sparkle. Unlike diamonds, moissanites also display rainbow-colored light, with the intensity increasing as the stone size grows. Overall, moissanite takes the lead in brilliance and fire, surpassing diamonds.',
      ],
    },
    {
      type: 'combinedText',
      content: [
        'ETHICAL SOURCING: ',
        "One of the significant advantages of moissanite's lab-grown origin is its complete ethical and sustainable nature. Moissanite is not involved in any social or environmental conflicts, allowing you to choose it with a clear conscience.",
      ],
      classNames: {
        text: 'first:font-optima-medium',
        wrapper: '!mb-0',
      },
    },
  ];

  return (
    <>
      <BlogSchema title={'moissanite vs. diamond'}>
        <BlogContent content={content} />
      </BlogSchema>
    </>
  );
}
