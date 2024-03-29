import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'xLargeTitle',
      content: 'WEDDING RING GUIDE',
    },
    {
      type: 'text',
      content: [
        "Discovering the perfect wedding band amidst various styles becomes effortless with our comprehensive guide on selecting a wedding ring. In Vianisa's Wedding Ring Guide, you will explore different finishes and metal types for the most significant piece of jewelry in your life. This guide also serves as inspiration for custom designing your own unique gold jewelry in 10k, 14k, and 18k. Whether you're torn between rose gold, yellow gold, or white gold or contemplating milgrain edge versus beveled edge, this guide is your ultimate resource!",
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'xLargeTitle',
      content: 'THE FINISH OF A WEDDING RING',
    },
    {
      type: 'text',
      content: [
        "The 'finish' of a ring refers to its final surface appearance, achieved through meticulous craftsmanship. Each finish possesses a distinct look and character that enhances your style. Below, you'll find the different finishes available at Vianisa. It's important to note that gold is a soft metal and can be lightly scratched by harder objects in daily use. Therefore, all finishes will require occasional repolishing, although some may need it more frequently than others.",
      ],
    },
    {
      type: 'largeTitle',
      content: 'POLISHED',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'Polished finish rings boast a shiny, reflective surface that catches the eye. Crafted by using polishing compounds and a fast-spinning brush, this finish is the most common choice for wedding bands and jewelry overall. While polished surfaces are smooth to the touch, they may show scratches more explicitly than matte-finished bands. However, periodic touch-ups can restore their original luster, just like any other finish.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD01-4-120-S-HY_21a31030-742f-4f2e-b45b-d28dbe27257e_480x480.jpg?v=1655281730',
        alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
        width: 480,
        height: 480,
      },
    },
    {
      type: 'largeTitle',
      content: 'MATTE',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'Matte brushed finish offers a smooth texture and exudes an elegant charm. It reflects light in a softer manner compared to polished rings. Achieved by brushing the gold surface in a consistent direction with a fine-grit surface, this finish requires less maintenance than polished finishes due to its naturally dulled sheen.',
      ],
    },
    {
      type: 'space',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD01-4-120-M-HY_387adb21-074d-4886-920b-63b671589611_480x480.jpg?v=1655281958',
        alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
        width: 480,
        height: 480,
      },
    },
    {
      type: 'largeTitle',
      content: 'HAMMERED',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'The Hammered finish showcases an exquisite and distinctive appearance that preserves the inherent character of gold. Crafted by delicately tapping the smoothed-out gold surface with a polished hammer, this finish is polished further to achieve the desired effect.',
      ],
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD01-4-120-H-HY_e9b8ad4b-afcf-477b-8c5a-46f654f734b1_480x480.jpg?v=1655359096',
        alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
        width: 480,
        height: 480,
      },
    },
    {
      type: 'largeTitle',
      content: 'STARDUST',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'The Stardust finish exudes whimsy, authenticity, and texture. When touched with your fingertips, it offers a slight sandy feel. This unique finish is created by marking the gold surface with a diamond tool tip, resulting in a roughened texture that beautifully catches and refracts light.',
      ],
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD03-4-150-D-HY_d850533d-0423-4966-8883-63e5316e81f7_480x480.jpg?v=1655359407',
        alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
        width: 480,
        height: 480,
      },
    },
    {
      type: 'largeTitle',
      content: 'ICE MATTE',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'The Ice matte finish epitomizes sophistication and masculinity, presenting a timeless option. Similar to matte brushed finish, but with brushing done in various directions, this finish is highly durable and able to withstand everyday wear.',
      ],
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD01-4-120-l-HY_2e38bf48-65a8-4b2c-92d8-049f5777ccac_480x480.jpg?v=1655359669',
        alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
        width: 480,
        height: 480,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'xLargeTitle',
      content: 'THE PROFILE',
    },
    {
      type: 'space',
    },
    {
      type: 'largeTitle',
      content: 'DOME',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/dome_480x480.jpg?v=1655359815',
        alt: 'dome profile wedding ring, gold wedding bands, 14k,18k, comfort fit rings',
        width: 175,
        height: 175,
      },
    },
    {
      type: 'text',
      content: [
        'The Dome profile wedding band is a popular choice for both genders, available in all sizes and widths. This profile features a curved design on both the inside and outside, providing a comfortable fit and a rounded appearance.',
      ],
      className: '!mb-0',
    },
    {
      type: 'largeTitle',
      content: 'FLAT',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/flat_e2e937e7-334d-47c9-a739-07224097e45f_480x480.jpg?v=1655362731',
        alt: 'dome profile wedding ring, gold wedding bands, 14k,18k, comfort fit rings',
        width: 175,
        height: 175,
      },
    },
    {
      type: 'text',
      content: [
        'The flat profile wedding band at Vianisa features a flat outer surface while maintaining a curved (domed) inner surface, ensuring comfort fit. This profile offers a contemporary style that appeals to both men and women.',
      ],
      className: '!mb-0',
    },
    {
      type: 'divider',
    },
    {
      type: 'xLargeTitle',
      content: 'THE EDGE',
    },
    {
      type: 'space',
    },
    {
      type: 'largeTitle',
      content: 'BEVELED EDGE',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'A beveled edge adds depth and dimension to a traditional wedding band by angling the edges rather than leaving them perpendicular. Beveled wedding bands also feature a curved inner surface for maximum comfort. With endless customization options at Vianisa, you can choose different finishes or metals for beveled edges.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/beveld_480x480.jpg?v=1655360096',
        alt: 'beveled edge wedding band, 18k gold wedding ring, polished 14k unique jewelry',
        width: 480,
        height: 480,
      },
    },
    {
      type: 'largeTitle',
      content: 'MILGRAIN EDGE',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'The Milgrain edge showcases intricate details along the borders of the ring. This edge style has long been favored in wedding rings due to its unique craftsmanship. Like beveled edges, you have the',
      ],
    },
    {
      type: 'space',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/milgrain_0e5c1c85-7844-4b03-bb56-7e51beb63f03_480x480.jpg?v=1655380575',
        alt: 'beveled edge wedding band, 18k gold wedding ring, polished 14k unique jewelry',
        width: 480,
        height: 480,
      },
    },
    {
      type: 'largeTitle',
      content: 'ROUND EDGE',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'The rounded edge is a classic and popular choice for wedding rings. It features a smooth, rounded edge without any additional details. This soft and rounded look is versatile and can be paired with various finishes and metals to create your desired style. At Vianisa, we offer endless customization options for rounded edge wedding bands, allowing you to find the perfect ring that reflects your individuality.',
      ],
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/round-edge_1_480x480.jpg?v=1655360342',
        alt: 'round edge wedding band, 18k gold wedding ring, polished 14k unique jewelry',
        width: 480,
        height: 480,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'xLargeTitle',
      content: 'THE WIDTH',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/witdh_480x480.jpg?v=1655360419',
        alt: 'rose gold 14k 18k wedding rings, 2mm, 3mm, 4mm, 5mm, 6mm width wedding, different widths, fine jewelry band',
        width: 334,
        height: 334,
      },
    },
    {
      type: 'text',
      content: [
        "The width of a wedding band is measured in millimeters (mm). At Vianisa, we offer a range of popular width options, typically ranging from 2mm to 6mm. However, we can craft your ring in any width you prefer. When selecting the width, it's important to consider your hand and finger size to find the perfect fit and aesthetic. There are no set rules for choosing the width; it ultimately comes down to your personal style, preference, and visual taste. Women commonly opt for widths between 2-4mm, while men tend to choose widths between 5-8mm. To get a better sense of the width, you can compare it to the thickness of a 5-cent coin, which measures 1.95mm. Additionally, you can stack multiple coins to visualize different width options.",
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'xLargeTitle',
      content: 'THE SIZE',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/E_0318_0949659a-793d-418b-a808-13e8eb773208_480x480.jpg?v=1655360563',
        alt: 'rose gold 14k 18k wedding rings, 2mm, 3mm, 4mm, 5mm, 6mm width wedding, different widths, fine jewelry band',
        width: 365,
        height: 365,
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        "Finding the right ring size is crucial for a comfortable and enjoyable daily wearing experience. It's important to ensure that your ring neither slips off your finger nor causes any discomfort due to being too tight. At Vianisa, we understand the significance of an accurate ring size, which is why we meticulously craft our rings in quarter sizes and even offer options up to an eighth of a size.",
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'xLargeTitle',
      content: 'THE METAL',
    },
    {
      type: 'text',
      content: [
        'At Vianisa, we combine traditional iron forging techniques with modern die-making methods to create wedding bands with exceptional surface quality and non-porous, tensile metal properties. Our meticulous process involves purifying and blending various metals and alloys to achieve stunning colors and a brilliant shine. Regardless of the metal you choose, our extensive in-house expertise ensures that you receive exquisite and long-lasting jewelry.',
        'When it comes to selecting the metal for your wedding band, there are no hard and fast rules or limitations. You have the freedom to coordinate it with your engagement ring or even opt for mixed metals if you prefer a multi-color look. At Vianisa, we encourage you to explore all options, as we are committed to customizing your jewelry according to your desires.',
        "As part of our dedication to environmental responsibility, we use recycled gold in our manufacturing process. Through purification, we enhance the longevity of our jewelry while minimizing our ecological footprint. Since gold is a soft metal, it requires the addition of other metals to enhance its strength and create different hues. The purity of gold is measured in 'karats,' and Vianisa offers three options: 18K, 14K, and 10K, containing 75%, 58.5%, and 41.7% gold, respectively.",
      ],
    },
    {
      type: 'largeTitle',
      content: 'YELLOW GOLD',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'Yellow gold is a classic and timeless choice for wedding rings. Its warm and lustrous appearance never goes out of fashion.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/yellow_5b97d116-48a9-4ce2-a4bd-81c1486d738d_480x480.png?v=1655360764',
        alt: '18k yellow gold wedding band, 14k gold vintage wedding ring, diamond wedding band unique details, fine jewelry',
        width: 365,
        height: 365,
      },
    },
    {
      type: 'largeTitle',
      content: 'ROSE GOLD',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'A blend of yellow gold and copper gives rose gold its soft, romantic pink hue. This option exudes a delicate and enchanting aura.',
      ],
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/rose_1ba1e1c7-0253-45f8-a578-caeea31f2cf2_480x480.png?v=1655360868',
        alt: '18k rose gold wedding bands, 14k gold vintage wedding rings, unique details, eternate, diamond fine jewelry',
        width: 365,
        height: 365,
      },
    },
    {
      type: 'largeTitle',
      content: 'WHITE GOLD',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'White gold, achieved through a mixture of yellow gold, zinc, nickel, and other metals, displays an elegant silver-white complexion. It radiates a noble and luminous tone, adding a touch of sophistication to your jewelry.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/white_99fe0d7f-801a-4710-b464-219c2bcfc70c_480x480.png?v=1655360954',
        alt: '18k white gold wedding bands, 14k gold vintage wedding rings, unique details, eternate, diamond fine jewelry',
        width: 365,
        height: 365,
      },
    },
    {
      type: 'largeTitle',
      content: 'PLATINUM',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'Platinum is a luxurious choice since it is rarer than other precious metals. It appears naturally white and is a very durable metal, perfect for pieces that require strength, such as stone set rings.',
      ],
    },
    {
      type: 'space',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/platin_480x480.png?v=1655361023',
        alt: 'custom platinum wedding ring, vintage wedding band, diamond fine jewelry, unique details, design eternate',
        width: 365,
        height: 365,
      },
    },
    {
      type: 'largeTitle',
      content: 'PALLADIUM',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'Coming from the same family as platinum, palladium offers a naturally white finish. It shares many desirable characteristics with platinum but is lighter and more affordable. Palladium presents an elegant and modern alternative.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/palladium_480x480.png?v=1655361135',
        alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
        width: 365,
        height: 365,
      },
    },
  ];

  return (
    <BlogSchema title="wedding ring guide">
      <BlogContent content={content} />
    </BlogSchema>
  );
}
