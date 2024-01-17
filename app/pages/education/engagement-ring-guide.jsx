import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'text',
      content: [
        "When faced with numerous diamond shapes and ring styles to choose from, it can be challenging to decide on the style for your gold engagement ring. Vianisa's Engagement Ring Guide offers a straightforward and useful resource to help you select your ring. It covers everything from the unique features of each diamond shape to the intricacies of setting styles, providing you with the necessary information to choose or personalize your diamond engagement ring.",
      ],
    },
    {
      type: 'title',
      content: 'DESIGN STYLES',
    },
    {
      type: 'title',
      content: 'Solitaire',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Solitaire_Engagement_Ring_94e8061c-4225-4e04-8a77-91227dff20b7_480x480.jpg?v=1660044518',
        alt: 'fine elegant jewelry, solitaire design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings',
        width: 239,
        height: 480,
      },
    },
    {
      type: 'text',
      content: [
        'When it comes to engagement rings, the image of a solitaire immediately comes to mind. This iconic style has been featured in countless romantic movies, representing everlasting love and the deep connection between partners with its single diamond. Solitaire rings possess a simple yet breathtaking elegance, making them an ideal choice to commemorate your relationship. While round and princess are the most popular diamond shapes for this design, it can accommodate any shape, allowing for a high level of customization. Solitaire designs offer both 4 and 6 prong settings, with the diamond cradled by metal clamps that provide secure support.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'title',
      content: 'Side Stone',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Side_Stone_Engagement_Ring_e2588fc6-d990-4643-a9e5-890048159d1c_480x480.jpg?v=1660044538',
        alt: 'fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings',
        width: 239,
        height: 480,
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        "Who can resist the allure of extra sparkle? And why settle for just a little when you can have even more? Enhance the brilliance of your engagement ring by incorporating additional gemstones alongside the center stone. Whether you opt for a full row of small diamonds or symmetrically aligned gems on the bands, this style offers exceptional customization options that can accommodate any diamond shape. It's also an excellent choice for incorporating colorful gems, allowing you to create a stunning array of hues. This design will beautifully highlight the centerpiece of your diamond, regardless of the color or arrangement you choose, making it a splendid choice to elevate your proposal.",
      ],
    },
    {
      type: 'title',
      content: 'Three Stone',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Three_Stone_Engagement_Ring_5b2eb879-9e6f-45fa-872f-fd7b0fceca87_480x480.jpg?v=1660044579',
        alt: 'fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings',
        width: 239,
        height: 480,
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        'In this design, there is one rule: your engagement ring must feature three exquisite gemstones. While the traditional approach involves selecting a larger center stone with smaller stones on either side, you have the freedom to determine the size difference or opt for stones of equal size. Enhance the allure of your center stone by incorporating complementary stones in different colors or shapes. Believe us, Three Stone engagement rings offer far more than what meets the eye! Vianisa is here to customize them according to your preferences, ensuring they exceed your expectations.',
      ],
    },
    {
      type: 'title',
      content: 'Halo',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Halo_Engagement_Ring_47bb7458-8531-41dd-af8c-dbafe3b3790d_480x480.jpg?v=1660044678',
        alt: 'fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings',
        width: 239,
        height: 480,
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        "Halo engagement rings express your love through a dazzling display of stones! They showcase a single row of small diamonds encircling the center stone, but who says it can't be two rows? Regardless of the diamond shape you select, it will exude even more radiance, prominence, and awe when adorned with a halo. While this design may offer fewer customization options compared to others, it remains one of the most breathtaking choices available.",
      ],
    },
    {
      type: 'title',
      content: 'Vintage',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Vintage_Engagement_Ring_fb7a8638-5734-498d-82e2-f0eced221a99_480x480.jpg?v=1660044702',
        alt: 'fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings',
        width: 239,
        height: 480,
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        'Vintage designs transcend time, enduring and thriving to this day. They encompass elements from various eras, with certain features like filigree, engraving, and milgrain being particularly associated with the "vintage" aesthetic. By incorporating different metals, diamond shapes, and a wide range of customization options, a vintage engagement ring can be the perfect choice for those seeking a timeless and unique piece.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'title',
      content: 'Cluster',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Cluster_Engagement_Ring_e7b8e9cb-73b9-4d53-a762-b2da831627dc_480x480.jpg?v=1660044724',
        alt: 'fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings',
        width: 239,
        height: 480,
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        'Cluster designs give birth to the most exquisite rings, symbolizing your unparalleled love through the arrangement of multiple larger stones. You have the option to create a cluster ring akin to a halo design, with larger stones encircling the central gem, or embrace the captivating asymmetry that cluster designs can offer. Regardless of your choice, cluster engagement rings exude an elegant whimsy and captivating allure that is simply irresistible.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'title',
      content: 'Cathedral',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Cathedral_Engagement_Ring_df5334a5-212a-4994-bb04-e9fb900c4885_480x480.jpg?v=1660044744',
        alt: 'fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings',
        width: 239,
        height: 480,
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        'The graceful structure of this design mirrors that of a cathedral, with two pairs of arches extending from the band and gracefully cradling the diamond on either side. The cathedral engagement ring exudes a mesmerizing effect, enhancing the prominence of the center stone. With the ability to customize the cathedral engagement ring by incorporating additional gemstones, selecting different metals, or exploring a range of colors, this design preserves its inherent elegance and stands as a distinctive choice to complement your individual style.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'title',
      content: 'SETTING STYLES',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Claw_Setting_ee4c2b11-99a0-4d1f-b887-b04b38acf49a_480x480.jpg?v=1660044829',
        alt: 'fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings',
        width: 480,
        height: 260,
      },
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'combinedText',
      content: [
        'Claw Setting: ',
        "The claw setting is a popular choice for securing center stones, using metal clamps to hold the stone securely. True to its name, this setting showcases curved nails reminiscent of a bird's claw. The number of claws needed varies depending on the diamond's shape. Typically, round diamonds are set with either four or six claws, while square and rectangular shapes like princess cuts require four claws. Other cuts such as marquise and pear shapes benefit from V-shaped claws that provide protection for the diamond's pointed ends.",
      ],
      classNames: {
        text: 'first:font-[optima-medium]',
      },
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Prong_Setting_480x480.jpg?v=1660044790',
        alt: 'fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings',
        width: 480,
        height: 260,
      },
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'combinedText',
      content: [
        'Prong Setting: ',
        'The prong setting closely resembles the claw setting in its function. It securely holds the stone in place on the ring\'s band, and instead of claws, it features either round or pointed pins that secure the diamond. Prong settings can be categorized as either "shared" or "high," depending on personal preference.',
      ],
      classNames: {
        text: 'first:font-[optima-medium]',
      },
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Micro_Pave_Setting_480x480.jpg?v=1660044860',
        alt: 'fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings',
        width: 480,
        height: 260,
      },
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'combinedText',
      content: [
        'Micro Pave Setting: ',
        'The technique used to minimize the presence of metal on the ring and create a stunning, sparkling band while ensuring the security of gemstones. preference.',
      ],
      classNames: {
        text: 'first:font-[optima-medium]',
      },
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Bezel_Setting_480x480.jpg?v=1660044881',
        alt: 'fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings',
        width: 480,
        height: 260,
      },
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'combinedText',
      content: [
        'Bezel Setting: ',
        'The method used to encircle the stone with a slender metal rim, securing it to the ring. This setting gives the impression of the diamond or gemstone being intricately engraved into the band of the ring. However, it is important to note that compared to other settings, the bezel setting covers a larger portion of the stone, potentially hiding more of its surface.',
      ],
      classNames: {
        text: 'first:font-[optima-medium]',
      },
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Channel_Setting_480x480.jpg?v=1660044901',
        alt: 'fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings',
        width: 480,
        height: 260,
      },
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'combinedText',
      content: [
        'Channel Setting: ',
        'This particular technique involves creating a channel within the band of your ring where stones are placed. The stones are arranged in a continuous row within this channel, appearing seamlessly aligned and securely nestled. This design not only ensures the stones are held in place but also showcases their beauty in a captivating manner that is sure to leave you in awe.',
      ],
      classNames: {
        text: 'first:font-[optima-medium]',
      },
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'title',
      content: 'SHAPES',
    },
    {
      type: 'text',
      content: [
        "Shapes refer to the geometric outline and physical form of a diamond. The shape of a diamond plays a significant role in its overall appearance, and each shape has specific requirements and technical characteristics. Before we explore the various diamond shapes, it's essential to familiarize ourselves with the anatomy of a diamond. Understanding the different parts of a diamond will provide a solid foundation for appreciating and evaluating the distinct features of each shape.",
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'text',
      content: ['The anatomy of the diamond'],
      className: '!mb-0',
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Diamond-Anatomy_1_480x480.jpg?v=1660045764',
        alt: 'anatomy of a diamond, fine elegant jewelry, solitaire design 14k solid gold, round cut, prong setting moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings',
        width: 480,
        height: 334,
      },
    },
    {
      type: 'text',
      content: ['Table: The largest facet of a diamond.'],
    },
    {
      type: 'text',
      content: [
        'Crown: The section of the diamond that extends from the girdle to the table.',
      ],
    },
    {
      type: 'text',
      content: [
        'Girdle: The rim that separates the crown from the pavilion. It serves as a mounting point for setting the diamond in jewelry.',
      ],
    },
    {
      type: 'text',
      content: [
        'Diameter: The measurement across the widest part of the diamond, which is typically the girdle.',
      ],
    },
    {
      type: 'text',
      content: [
        'Pavilion: The portion of the diamond that extends from the girdle to the culet.',
      ],
    },
    {
      type: 'text',
      content: [
        'Culet: The tip or point of a gemstone. The culet is usually small and ideally not visible to the untrained eye.',
      ],
    },
    {
      type: 'text',
      content: [
        "Depth: The measurement from the culet to the table, representing the vertical height of the diamond. The table is the largest flat facet on the diamond's top surface.",
      ],
      className: '!mb-0',
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'title',
      content: 'Round',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Round_480x480.jpg?v=1660045214',
        alt: '',
        width: 480,
        height: 210,
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        'The round diamond is the most popular choice when it comes to diamond shapes, primarily because of its optimal light return and brilliance. Diamond manufacturers have made significant advancements in both theory and technology to create the cuts we now see in round diamonds. Round diamonds with very good and excellent cuts are known for their exceptional radiance. They excel in achieving a well-balanced combination of cut, color, and clarity grades, while still delivering the desired sparkle you seek.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'title',
      content: 'Princess',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Princess_480x480.jpg?v=1660045296',
        alt: '',
        width: 480,
        height: 210,
      },
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'text',
      content: [
        'Among non-round diamond shapes, the princess shape is the most widely favored. Typically featuring pointed corners in a square shape, it can also be found in a rectangular variant. One characteristic of princess-shaped diamonds is that they may exhibit color more prominently in the corners compared to round diamonds. Opting for this shape may necessitate a higher color grade, which can contribute to a higher cost. However, thanks to its geometric advantages, the princess shape minimizes wastage and tends to offer a slightly lower price per carat when compared to other diamond shapes.',
      ],
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'title',
      content: 'Emerald',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Emerald_480x480.jpg?v=1660045327',
        alt: '',
        width: 480,
        height: 210,
      },
    },
    {
      type: 'space',
      className: '!mb-0',
    },
    {
      type: 'text',
      content: [
        "If you opt for an Emerald shape diamond, it is advisable to consider a higher clarity grade. This particular shape accentuates a diamond's clarity, as its geometric form allows for a more visible view of any inclusions or blemishes. The emerald shape is characterized by its cuts on the bottom part and its large, open upper part, which together create its unique appearance. Rather than the traditional sparkle of a round diamond, the emerald diamond showcases a distinctive aesthetic with its interplay of dark and light planes, creating a captivating hall-of-mirrors effect.",
      ],
    },
    {
      type: 'title',
      content: 'Asscher',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 210,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Asscher_480x480.jpg?v=1660045353',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        "This elegantly refined shape bears a striking resemblance to the emerald-cut diamond, but with a square silhouette. If you opt for a lower clarity grade, it's important to note that inclusions and blemishes may be more noticeable, similar to the emerald shape. Additionally, this shape has a tendency to reveal color in the corners, akin to the princess shape, so considering a higher color grade may be worthwhile. The modern Asscher cut diamond features larger step facets, a taller crown, and a smaller table compared to a square emerald cut. This combination often results in enhanced brilliance when compared to the emerald cut.",
      ],
    },
    {
      type: 'title',
      content: 'Marquise',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 210,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Marquise_480x480.jpg?v=1660045396',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'The marquise diamond exhibits a distinctive shape with wider facets than any other diamond shape, resulting in a visually larger appearance for the same carat weight. Its elongated form is known to be flattering to the fingers, creating the illusion of slender hands. While the marquise diamond may resemble an eye, you have the freedom to customize its proportions, whether you prefer a narrower or wider shape.',
      ],
    },
    {
      type: 'title',
      content: 'Oval',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 210,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Oval_480x480.jpg?v=1660045431',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'Oval diamonds offer the advantage of creating the illusion of a larger carat weight due to their elongated shape. The slender profile of an oval diamond can also enhance the appearance of longer and slimmer fingers. If you appreciate the classic appeal of a round diamond but desire something more distinctive, the oval shape is an excellent choice. It exhibits comparable fire and brilliance to round diamonds while offering a touch of uniqueness.',
      ],
    },
    {
      type: 'title',
      content: 'Pear',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 210,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Pear_480x480.jpg?v=1660045465',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'The pear-shaped diamond, also referred to as a teardrop, features a single point and a rounded edge. Its unique and recognizable appearance makes it a favored option for a variety of diamond jewelry pieces. When worn on the hand, the slender end of the pear-shaped diamond points towards the fingers, creating a subtle slimming effect. Similar to marquise and oval cuts, the pear-shaped diamond is available in both narrow and broader variations, providing flexibility in choosing the desired shape.',
      ],
    },
    {
      type: 'title',
      content: 'Cushion',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 210,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Cushion_480x480.jpg?v=1660045561',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'Cushion diamonds offer a range of options, whether you prefer a square or rectangular shape. This unique diamond shape features rounded edges and numerous facets that enhance its brilliance. However, due to the larger facets, it is important to note that inclusions may be more visible in cushion diamonds compared to other shapes. Therefore, it is advisable to consider a higher clarity grade to ensure the desired level of clarity for your diamond.',
      ],
    },
    {
      type: 'title',
      content: 'Radiant',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 210,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Radiant_480x480.jpg?v=1660045588',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'Radiant diamonds serve as a wonderful combination of the cushion and princess shapes, featuring a square-like shape with trimmed corners. These distinct corners are a defining characteristic of the radiant shape, contributing to its widespread appeal. Radiant diamonds are highly sought after, especially when set alongside baguette or round diamonds, making them a popular choice within the diamond community.',
      ],
    },
    {
      type: 'title',
      content: 'METALS',
    },
    {
      type: 'text',
      content: [
        'At Vianisa, we combine traditional iron forging techniques with modern die-making methods to create wedding bands with exceptional surface quality and non-porous, tensile metal properties. Our meticulous process involves purifying and blending various metals and alloys to achieve stunning colors and a brilliant shine. Regardless of the metal you choose, our extensive in-house expertise ensures that you receive exquisite and long-lasting jewelry.',
        'When it comes to selecting the metal for your wedding band, there are no hard and fast rules or limitations. You have the freedom to coordinate it with your engagement ring or even opt for mixed metals if you prefer a multi-color look. At Vianisa, we encourage you to explore all options, as we are committed to customizing your jewelry according to your desires.',
        'As part of our dedication to environmental responsibility, we use recycled gold in our manufacturing process. Through purification, we enhance the longevity of our jewelry while minimizing our ecological footprint. Since gold is a soft metal, it requires the addition of other metals to enhance its strength and create different hues. The purity of gold is measured in "karats," and Vianisa offers three options: 18K, 14K, and 10K, containing 75%, 58.5%, and 41.7% gold, respectively.',
      ],
    },
    {
      type: 'title',
      content: 'Yellow Gold',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 305,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Yellow_480x480.jpg?v=1660045627',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'Yellow gold is a classic and timeless choice for wedding rings. Its warm and lustrous appearance never goes out of fashion.',
      ],
    },
    {
      type: 'title',
      content: 'Rose Gold',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 305,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Rose_480x480.jpg?v=1660045627',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'A blend of yellow gold and copper gives rose gold its soft, romantic pink hue. This option exudes a delicate and enchanting aura.',
      ],
    },
    {
      type: 'title',
      content: 'White Gold',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 305,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/White_480x480.jpg?v=1660045627',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'White gold, achieved through a mixture of yellow gold, zinc, nickel, and other metals, displays an elegant silver-white complexion. It radiates a noble and luminous tone, adding a touch of sophistication to your jewelry.',
        'Other options may be:',
      ],
    },
    {
      type: 'title',
      content: 'Platinum',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 305,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Platinum_480x480.jpg?v=1660045937',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'Platinum is a luxurious choice since it is rarer than other precious metals. It appears naturally white and is a very durable metal, perfect for pieces that require strength, such as stone set rings.',
      ],
    },
    {
      type: 'title',
      content: 'Palladium',
      tag: 'h3',
    },
    {
      type: 'image',
      content: {
        width: 480,
        height: 305,
        src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Palladium_480x480.jpg?v=1660045966',
        alt: '',
      },
    },
    {
      type: 'text',
      content: [
        'Coming from the same family as platinum, palladium offers a naturally white finish. It shares many desirable characteristics with platinum but is lighter and more affordable. Palladium presents an elegant and modern alternative.',
      ],
    },
  ];

  return (
    <BlogSchema title="engagement ring guide">
      <BlogContent content={content} />
    </BlogSchema>
  );
}
