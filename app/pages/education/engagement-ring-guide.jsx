import {Divider} from '@mui/material';
import Schema1 from '../../components/Blogs/Schema1';
import {Image} from '@shopify/hydrogen';
export const meta = ({data}) => {
  return [{title: 'wedding ring guide'}];
};

export default function Product() {
  /*  let texts = [
    {
      title: 'WEDDING RING GUIDE',
      tithead: [''],
      body: [
        {
          type: 'text',
          content: [
            <p>
              Discovering the perfect wedding band amidst various styles becomes
              effortless with our comprehensive guide on selecting a wedding
              ring. In Vianisa's Wedding Ring Guide, you will explore different
              finishes and metal types for the most significant piece of jewelry
              in your life. This guide also serves as inspiration for custom
              designing your own unique gold jewelry in 10k, 14k, and 18k.
              Whether you're torn between rose gold, yellow gold, or white gold
              or contemplating milgrain edge versus beveled edge, this guide is
              your ultimate resource!
            </p>,
          ],
        },
      ],
    },
    {
      title: 'THE FINISH OF A WEDDING RING',
      tithead: [
        "The 'finish' of a ring refers to its final surface appearance, achieved through meticulous craftsmanship. Each finish possesses a distinct look and character that enhances your style. Below, you'll find the different finishes available at Vianisa. It's important to note that gold is a soft metal and can be lightly scratched by harder objects in daily use. Therefore, all finishes will require occasional repolishing, although some may need it more frequently than others.",
      ],
      body: [
        {
          type: 'text',
          title: 'POLISHED',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  Polished finish rings boast a shiny, reflective surface that
                  catches the eye. Crafted by using polishing compounds and a
                  fast-spinning brush, this finish is the most common choice for
                  wedding bands and jewelry overall. While polished surfaces are
                  smooth to the touch, they may show scratches more explicitly
                  than matte-finished bands. However, periodic touch-ups can
                  restore their original luster, just like any other finish.{' '}
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD01-4-120-S-HY_21a31030-742f-4f2e-b45b-d28dbe27257e_480x480.jpg?v=1655281730',
              alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
              w: 480,
              h: 480,
            },
          ],
        },
        {
          type: 'text',
          title: 'MATTE',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  Matte brushed finish offers a smooth texture and exudes an
                  elegant charm. It reflects light in a softer manner compared
                  to polished rings. Achieved by brushing the gold surface in a
                  consistent direction with a fine-grit surface, this finish
                  requires less maintenance than polished finishes due to its
                  naturally dulled sheen.
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD01-4-120-M-HY_387adb21-074d-4886-920b-63b671589611_480x480.jpg?v=1655281958',
              alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
              w: 480,
              h: 480,
            },
          ],
        },
        {
          type: 'text',
          title: 'HAMMERED',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  The Hammered finish showcases an exquisite and distinctive
                  appearance that preserves the inherent character of gold.
                  Crafted by delicately tapping the smoothed-out gold surface
                  with a polished hammer, this finish is polished further to
                  achieve the desired effect.{' '}
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD01-4-120-H-HY_e9b8ad4b-afcf-477b-8c5a-46f654f734b1_480x480.jpg?v=1655359096',
              alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
              w: 480,
              h: 480,
            },
          ],
        },
        {
          type: 'text',
          title: 'STARDUST',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  The Stardust finish exudes whimsy, authenticity, and texture.
                  When touched with your fingertips, it offers a slight sandy
                  feel. This unique finish is created by marking the gold
                  surface with a diamond tool tip, resulting in a roughened
                  texture that beautifully catches and refracts light.{' '}
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD03-4-150-D-HY_d850533d-0423-4966-8883-63e5316e81f7_480x480.jpg?v=1655359407',
              alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
              w: 480,
              h: 480,
            },
          ],
        },
        {
          type: 'text',
          title: 'ICE MATTE',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  Ice matte finish epitomizes sophistication and masculinity,
                  presenting a timeless option. Similar to matte brushed finish,
                  but with brushing done in various directions, this finish is
                  highly durable and able to withstand everyday wear.
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/BD01-4-120-l-HY_2e38bf48-65a8-4b2c-92d8-049f5777ccac_480x480.jpg?v=1655359669',
              alt: 'custom palladium wedding band, vintage wedding ring, unique details, diamond fine jewelry, design, eternate',
              w: 480,
              h: 480,
            },
          ],
        },
      ],
    },
    {
      title: 'THE PROFILE',
      tithead: '',
      body: [
        {
          type: 'text',
          title: 'DOME',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  The Dome profile wedding band is a popular choice for both
                  genders, available in all sizes and widths. This profile
                  features a curved design on both the inside and outside,
                  providing a comfortable fit and a rounded appearance.
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/dome_480x480.jpg?v=1655359815',
              alt: 'dome profile wedding ring, gold wedding bands, 14k,18k,  comfort fit rings',
              w: 175,
              h: 175,
            },
          ],
        },
        {
          type: 'text',
          title: 'FLAT',
          content: [
            {
              type: 'text',
              content: [
                'The flat profile wedding band at Vianisa features a flat outer surface while maintaining a curved (domed) inner surface, ensuring comfort fit. This profile offers a contemporary style that appeals to both men and women.',
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/flat_e2e937e7-334d-47c9-a739-07224097e45f_480x480.jpg?v=1655362731',
              alt: 'dome profile wedding ring, gold wedding bands, 14k,18k,  comfort fit rings',
              w: 175,
              h: 175,
            },
          ],
        },
      ],
    },
    {
      title: 'THE EDGE',
      tithead: '',
      body: [
        {
          type: 'text',
          title: 'BEVELED EDGE',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  A beveled edge adds depth and dimension to a traditional
                  wedding band by angling the edges rather than leaving them
                  perpendicular. Beveled wedding bands also feature a curved
                  inner surface for maximum comfort. With endless customization
                  options at Vianisa, you can choose different finishes or
                  metals for beveled edges.
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/beveld_480x480.jpg?v=1655360096',
              alt: 'dome profile wedding ring, gold wedding bands, 14k,18k,  comfort fit rings',
              w: 480,
              h: 480,
            },
          ],
        },
        {
          type: 'text',
          title: 'MILGRAIN EDGE',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  The Milgrain edge showcases intricate details along the
                  borders of the ring. This edge style has long been favored in
                  wedding rings due to its unique craftsmanship. Like beveled
                  edges, you have the
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/milgrain_0e5c1c85-7844-4b03-bb56-7e51beb63f03_480x480.jpg?v=1655380575',
              alt: 'beveled edge wedding band, 18k gold wedding ring, fine jewelry',
              w: 480,
              h: 480,
            },
          ],
        },
        {
          type: 'text',
          title: 'ROUND EDGE',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  The rounded edge is a classic and popular choice for wedding
                  rings. It features a smooth, rounded edge without any
                  additional details. This soft and rounded look is versatile
                  and can be paired with various finishes and metals to create
                  your desired style. At Vianisa, we offer endless customization
                  options for rounded edge wedding bands, allowing you to find
                  the perfect ring that reflects your individuality.
                </p>,
              ],
            },
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/round-edge_1_480x480.jpg?v=1655360342',
              alt: 'round edge wedding band, 18k gold wedding ring, handcrafted, fine jewelry',
              w: 480,
              h: 480,
            },
          ],
        },
      ],
    },
    {
      title: 'THE WIDTH',
      tithead: '',
      body: [
        {
          type: 'text',
          title: '',
          content: [
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/witdh_480x480.jpg?v=1655360419',
              alt: 'rose gold 14k 18k wedding rings, 2mm, 3mm, 4mm, 5mm, 6mm width wedding, different widths, fine jewelry band',
              w: 334,
              h: 334,
            },
            {
              type: 'text',
              content: [
                <p>
                  The width of a wedding band is measured in millimeters (mm).
                  At Vianisa, we offer a range of popular width options,
                  typically ranging from 2mm to 6mm. However, we can craft your
                  ring in any width you prefer. When selecting the width, it's
                  important to consider your hand and finger size to find the
                  perfect fit and aesthetic. There are no set rules for choosing
                  the width; it ultimately comes down to your personal style,
                  preference, and visual taste. Women commonly opt for widths
                  between 2-4mm, while men tend to choose widths between 5-8mm.
                  To get a better sense of the width, you can compare it to the
                  thickness of a 5-cent coin, which measures 1.95mm.
                  Additionally, you can stack multiple coins to visualize
                  different width options.
                </p>,
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'THE SIZE',
      tithead: '',
      body: [
        {
          type: 'text',
          title: '',
          content: [
            {
              type: 'image',
              src: 'https://cdn.shopify.com/s/files/1/0484/1429/4167/files/E_0318_0949659a-793d-418b-a808-13e8eb773208_480x480.jpg?v=1655360563',
              alt: 'rose gold 14k 18k wedding rings, 2mm, 3mm, 4mm, 5mm, 6mm width wedding, different widths, fine jewelry band',
              w: 365,
              h: 365,
            },
            {
              type: 'text',
              content: [
                <p>
                  The width of a wedding band is measured in millimeters (mm).
                  At Vianisa, we offer a range of popular width options,
                  typically ranging from 2mm to 6mm. However, we can craft your
                  ring in any width you prefer. When selecting the width, it's
                  important to consider your hand and finger size to find the
                  perfect fit and aesthetic. There are no set rules for choosing
                  the width; it ultimately comes down to your personal style,
                  preference, and visual taste. Women commonly opt for widths
                  between 2-4mm, while men tend to choose widths between 5-8mm.
                  To get a better sense of the width, you can compare it to the
                  thickness of a 5-cent coin, which measures 1.95mm.
                  Additionally, you can stack multiple coins to visualize
                  different width options.
                </p>,
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'THE METAL',
      tithead: '',
      body: [
        {
          type: 'text',
          title: '',
          content: [
            {
              type: 'text',
              content: [
                <p>
                  At Vianisa, we combine traditional iron forging techniques
                  with modern die-making methods to create wedding bands with
                  exceptional surface quality and non-porous, tensile metal
                  properties. Our meticulous process involves purifying and
                  blending various metals and alloys to achieve stunning colors
                  and a brilliant shine. Regardless of the metal you choose, our
                  extensive in-house expertise ensures that you receive
                  exquisite and long-lasting jewelry.
                </p>,
                <p>
                  When it comes to selecting the metal for your wedding band,
                  there are no hard and fast rules or limitations. You have the
                  freedom to coordinate it with your engagement ring or even opt
                  for mixed metals if you prefer a multi-color look. At Vianisa,
                  we encourage you to explore all options, as we are committed
                  to customizing your jewelry according to your desires.
                </p>,
                <p>
                  As part of our dedication to environmental responsibility, we
                  use recycled gold in our manufacturing process. Through
                  purification, we enhance the longevity of our jewelry while
                  minimizing our ecological footprint. Since gold is a soft
                  metal, it requires the addition of other metals to enhance its
                  strength and create different hues. The purity of gold is
                  measured in "karats," and Vianisa offers three options: 18K,
                  14K, and 10K, containing 75%, 58.5%, and 41.7% gold,
                  respectively.
                </p>,
              ],
            },
          ],
        },
      ],
    },
  ]; */

  function newkomp() {
    return (
      <div>
        <div className="main_parag flex flex-col text-left mb-5">
          <p className="font-body text-sm">
            When faced with numerous diamond shapes and ring styles to choose
            from, it can be challenging to decide on the style for your gold
            engagement ring. Vianisa's Engagement Ring Guide offers a
            straightforward and useful resource to help you select your ring. It
            covers everything from the unique features of each diamond shape to
            the intricacies of setting styles, providing you with the necessary
            information to choose or personalize your diamond engagement ring.
          </p>
        </div>
        <div>
          <h2>design styles</h2>
          <div>
            <h3>Solitaire</h3>
            <div className="flex flex-col  items-center">
              <Image
                width={239}
                height={480}
                alt="fine elegant jewelry, solitaire design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Solitaire_Engagement_Ring_94e8061c-4225-4e04-8a77-91227dff20b7_480x480.jpg?v=1660044518"
              />
            </div>
            <p>
              When it comes to engagement rings, the image of a solitaire
              immediately comes to mind. This iconic style has been featured in
              countless romantic movies, representing everlasting love and the
              deep connection between partners with its single diamond.
              Solitaire rings possess a simple yet breathtaking elegance, making
              them an ideal choice to commemorate your relationship. While round
              and princess are the most popular diamond shapes for this design,
              it can accommodate any shape, allowing for a high level of
              customization. Solitaire designs offer both 4 and 6 prong
              settings, with the diamond cradled by metal clamps that provide
              secure support.
            </p>
          </div>
          <div>
            <h3>Side Stone</h3>
            <div className="flex flex-col  items-center">
              <Image
                width={239}
                height={480}
                alt="fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Side_Stone_Engagement_Ring_e2588fc6-d990-4643-a9e5-890048159d1c_480x480.jpg?v=1660044538"
              />
            </div>
            <p>
              Who can resist the allure of extra sparkle? And why settle for
              just a little when you can have even more? Enhance the brilliance
              of your engagement ring by incorporating additional gemstones
              alongside the center stone. Whether you opt for a full row of
              small diamonds or symmetrically aligned gems on the bands, this
              style offers exceptional customization options that can
              accommodate any diamond shape. It's also an excellent choice for
              incorporating colorful gems, allowing you to create a stunning
              array of hues. This design will beautifully highlight the
              centerpiece of your diamond, regardless of the color or
              arrangement you choose, making it a splendid choice to elevate
              your proposal.
            </p>
          </div>
          <div>
            <h3>Three Stone</h3>
            <div className="flex flex-col  items-center">
              <Image
                width={239}
                height={480}
                alt="fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Three_Stone_Engagement_Ring_5b2eb879-9e6f-45fa-872f-fd7b0fceca87_480x480.jpg?v=1660044579"
              />
            </div>
            <p>
              In this design, there is one rule: your engagement ring must
              feature three exquisite gemstones. While the traditional approach
              involves selecting a larger center stone with smaller stones on
              either side, you have the freedom to determine the size difference
              or opt for stones of equal size. Enhance the allure of your center
              stone by incorporating complementary stones in different colors or
              shapes. Believe us, Three Stone engagement rings offer far more
              than what meets the eye! Vianisa is here to customize them
              according to your preferences, ensuring they exceed your
              expectations.
            </p>
          </div>
          <div>
            <h3>Halo</h3>
            <div className="flex flex-col  items-center">
              <Image
                width={239}
                height={480}
                alt="fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Halo_Engagement_Ring_47bb7458-8531-41dd-af8c-dbafe3b3790d_480x480.jpg?v=1660044678"
              />
            </div>
            <p>
              Halo engagement rings express your love through a dazzling display
              of stones! They showcase a single row of small diamonds encircling
              the center stone, but who says it can't be two rows? Regardless of
              the diamond shape you select, it will exude even more radiance,
              prominence, and awe when adorned with a halo. While this design
              may offer fewer customization options compared to others, it
              remains one of the most breathtaking choices available.
            </p>
          </div>
          <div>
            <h3>Vintage</h3>
            <div className="flex flex-col  items-center">
              <Image
                width={239}
                height={480}
                alt="fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Vintage_Engagement_Ring_fb7a8638-5734-498d-82e2-f0eced221a99_480x480.jpg?v=1660044702"
              />
            </div>
            <p>
              Vintage designs transcend time, enduring and thriving to this day.
              They encompass elements from various eras, with certain features
              like filigree, engraving, and milgrain being particularly
              associated with the "vintage" aesthetic. By incorporating
              different metals, diamond shapes, and a wide range of
              customization options, a vintage engagement ring can be the
              perfect choice for those seeking a timeless and unique piece.
            </p>
          </div>
          <div>
            <h3>Cluster</h3>
            <div className="flex flex-col  items-center">
              <Image
                width={239}
                height={480}
                alt="fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Cluster_Engagement_Ring_e7b8e9cb-73b9-4d53-a762-b2da831627dc_480x480.jpg?v=1660044724"
              />
            </div>
            <p>
              Cluster designs give birth to the most exquisite rings,
              symbolizing your unparalleled love through the arrangement of
              multiple larger stones. You have the option to create a cluster
              ring akin to a halo design, with larger stones encircling the
              central gem, or embrace the captivating asymmetry that cluster
              designs can offer. Regardless of your choice, cluster engagement
              rings exude an elegant whimsy and captivating allure that is
              simply irresistible.
            </p>
          </div>
          <div>
            <h3>Cathedral</h3>
            <div className="flex flex-col  items-center">
              <Image
                width={239}
                height={480}
                alt="fine elegant jewelry, side stone design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Cathedral_Engagement_Ring_df5334a5-212a-4994-bb04-e9fb900c4885_480x480.jpg?v=1660044744"
              />
            </div>
            <p>
              The graceful structure of this design mirrors that of a cathedral,
              with two pairs of arches extending from the band and gracefully
              cradling the diamond on either side. The cathedral engagement ring
              exudes a mesmerizing effect, enhancing the prominence of the
              center stone. With the ability to customize the cathedral
              engagement ring by incorporating additional gemstones, selecting
              different metals, or exploring a range of colors, this design
              preserves its inherent elegance and stands as a distinctive choice
              to complement your individual style.
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-bold">setting styles</h2>
          <div>
            <div className="flex flex-col  items-center">
              <Image
                width={480}
                height={260}
                alt="fine elegant jewelry, solitaire design 14k, 18k solid gold moissanite engagement ring, high customization, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Claw_Setting_ee4c2b11-99a0-4d1f-b887-b04b38acf49a_480x480.jpg?v=1660044829"
              />
            </div>
            <p>
              <strong>Claw Setting: </strong>The claw setting is a popular
              choice for securing center stones, using metal clamps to hold the
              stone securely. True to its name, this setting showcases curved
              nails reminiscent of a bird's claw. The number of claws needed
              varies depending on the diamond's shape. Typically, round diamonds
              are set with either four or six claws, while square and
              rectangular shapes like princess cuts require four claws. Other
              cuts such as marquise and pear shapes benefit from V-shaped claws
              that provide protection for the diamond's pointed ends.
            </p>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={260}
                alt="fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Prong_Setting_480x480.jpg?v=1660044790"
              />
            </div>
            <p>
              <strong>Prong Setting: </strong>The prong setting closely
              resembles the claw setting in its function. It securely holds the
              stone in place on the ring's band, and instead of claws, it
              features either round or pointed pins that secure the diamond.
              Prong settings can be categorized as either "shared" or "high,"
              depending on personal preference.
            </p>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={260}
                alt="fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Micro_Pave_Setting_480x480.jpg?v=1660044860"
              />
            </div>
            <p>
              <strong>Micro Pave Setting: </strong>The technique used to
              minimize the presence of metal on the ring and create a stunning,
              sparkling band while ensuring the security of gemstones.
              preference.
            </p>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={260}
                alt="fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Bezel_Setting_480x480.jpg?v=1660044881"
              />
            </div>
            <p>
              <strong>Bezel Setting: </strong>The method used to encircle the
              stone with a slender metal rim, securing it to the ring. This
              setting gives the impression of the diamond or gemstone being
              intricately engraved into the band of the ring. However, it is
              important to note that compared to other settings, the bezel
              setting covers a larger portion of the stone, potentially hiding
              more of its surface.
            </p>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={260}
                alt="fine elegant jewelry, claw setting 14k, 18k solid gold moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Channel_Setting_480x480.jpg?v=1660044901"
              />
            </div>
            <p>
              <strong>Channel Setting: </strong>This particular technique
              involves creating a channel within the band of your ring where
              stones are placed. The stones are arranged in a continuous row
              within this channel, appearing seamlessly aligned and securely
              nestled. This design not only ensures the stones are held in place
              but also showcases their beauty in a captivating manner that is
              sure to leave you in awe.
            </p>
          </div>
        </div>
        <div className="shapes">
          <div>
            <h2>shapes</h2>
            <p>
              Shapes refer to the geometric outline and physical form of a
              diamond. The shape of a diamond plays a significant role in its
              overall appearance, and each shape has specific requirements and
              technical characteristics. Before we explore the various diamond
              shapes, it's essential to familiarize ourselves with the anatomy
              of a diamond. Understanding the different parts of a diamond will
              provide a solid foundation for appreciating and evaluating the
              distinct features of each shape.
            </p>
            <p>The anatomy of the diamond</p>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={334}
                alt="anatomy of a diamond, fine elegant jewelry, solitaire design 14k solid gold, round cut, prong setting moissanite engagement ring, custom made, options of white gold, rose gold and platinum, custom rings"
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Diamond-Anatomy_1_480x480.jpg?v=1660045764"
              />
            </div>
            <div className="mb-4">
              <p>Table: The largest facet of a diamond.</p>
              <p>
                Crown: The section of the diamond that extends from the girdle
                to the table.
              </p>
              <p>
                Girdle: The rim that separates the crown from the pavilion. It
                serves as a mounting point for setting the diamond in jewelry.
              </p>
              <p>
                Diameter: The measurement across the widest part of the diamond,
                which is typically the girdle.
              </p>
              <p>
                Pavilion: The portion of the diamond that extends from the
                girdle to the culet.
              </p>
              <p>
                Culet: The tip or point of a gemstone. The culet is usually
                small and ideally not visible to the untrained eye.
              </p>
              <p>
                Depth: The measurement from the culet to the table, representing
                the vertical height of the diamond. The table is the largest
                flat facet on the diamond's top surface.
              </p>
            </div>
          </div>
          <div>
            <h3>Round</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Round_480x480.jpg?v=1660045214"
              />
            </div>
            <p>
              The round diamond is the most popular choice when it comes to
              diamond shapes, primarily because of its optimal light return and
              brilliance. Diamond manufacturers have made significant
              advancements in both theory and technology to create the cuts we
              now see in round diamonds. Round diamonds with very good and
              excellent cuts are known for their exceptional radiance. They
              excel in achieving a well-balanced combination of cut, color, and
              clarity grades, while still delivering the desired sparkle you
              seek.
            </p>
          </div>
          <div>
            <h3>Princess</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Princess_480x480.jpg?v=1660045296"
              />
            </div>
            <p>
              Among non-round diamond shapes, the princess shape is the most
              widely favored. Typically featuring pointed corners in a square
              shape, it can also be found in a rectangular variant. One
              characteristic of princess-shaped diamonds is that they may
              exhibit color more prominently in the corners compared to round
              diamonds. Opting for this shape may necessitate a higher color
              grade, which can contribute to a higher cost. However, thanks to
              its geometric advantages, the princess shape minimizes wastage and
              tends to offer a slightly lower price per carat when compared to
              other diamond shapes.
            </p>
          </div>
          <div>
            <h3>Emerald</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Emerald_480x480.jpg?v=1660045327"
              />
            </div>
            <p>
              If you opt for an Emerald shape diamond, it is advisable to
              consider a higher clarity grade. This particular shape accentuates
              a diamond's clarity, as its geometric form allows for a more
              visible view of any inclusions or blemishes. The emerald shape is
              characterized by its cuts on the bottom part and its large, open
              upper part, which together create its unique appearance. Rather
              than the traditional sparkle of a round diamond, the emerald
              diamond showcases a distinctive aesthetic with its interplay of
              dark and light planes, creating a captivating hall-of-mirrors
              effect.
            </p>
          </div>
          <div>
            <h3>Asscher</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Asscher_480x480.jpg?v=1660045353"
              />
            </div>
            <p>
              This elegantly refined shape bears a striking resemblance to the
              emerald-cut diamond, but with a square silhouette. If you opt for
              a lower clarity grade, it's important to note that inclusions and
              blemishes may be more noticeable, similar to the emerald shape.
              Additionally, this shape has a tendency to reveal color in the
              corners, akin to the princess shape, so considering a higher color
              grade may be worthwhile. The modern Asscher cut diamond features
              larger step facets, a taller crown, and a smaller table compared
              to a square emerald cut. This combination often results in
              enhanced brilliance when compared to the emerald cut.
            </p>
          </div>
          <div>
            <h3>Marquise</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Marquise_480x480.jpg?v=1660045396"
              />
            </div>
            <p>
              The marquise diamond exhibits a distinctive shape with wider
              facets than any other diamond shape, resulting in a visually
              larger appearance for the same carat weight. Its elongated form is
              known to be flattering to the fingers, creating the illusion of
              slender hands. While the marquise diamond may resemble an eye, you
              have the freedom to customize its proportions, whether you prefer
              a narrower or wider shape.
            </p>
          </div>
          <div>
            <h3>Oval</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Oval_480x480.jpg?v=1660045431"
              />
            </div>
            <p>
              Oval diamonds offer the advantage of creating the illusion of a
              larger carat weight due to their elongated shape. The slender
              profile of an oval diamond can also enhance the appearance of
              longer and slimmer fingers. If you appreciate the classic appeal
              of a round diamond but desire something more distinctive, the oval
              shape is an excellent choice. It exhibits comparable fire and
              brilliance to round diamonds while offering a touch of uniqueness.
            </p>
          </div>
          <div>
            <h3>Pear</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Pear_480x480.jpg?v=1660045465"
              />
            </div>
            <p>
              The pear-shaped diamond, also referred to as a teardrop, features
              a single point and a rounded edge. Its unique and recognizable
              appearance makes it a favored option for a variety of diamond
              jewelry pieces. When worn on the hand, the slender end of the
              pear-shaped diamond points towards the fingers, creating a subtle
              slimming effect. Similar to marquise and oval cuts, the
              pear-shaped diamond is available in both narrow and broader
              variations, providing flexibility in choosing the desired shape.
            </p>
          </div>
          <div>
            <h3>Cushion</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Cushion_480x480.jpg?v=1660045561"
              />
            </div>
            <p>
              Cushion diamonds offer a range of options, whether you prefer a
              square or rectangular shape. This unique diamond shape features
              rounded edges and numerous facets that enhance its brilliance.
              However, due to the larger facets, it is important to note that
              inclusions may be more visible in cushion diamonds compared to
              other shapes. Therefore, it is advisable to consider a higher
              clarity grade to ensure the desired level of clarity for your
              diamond.
            </p>
          </div>
          <div>
            <h3>Radiant</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={210}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Radiant_480x480.jpg?v=1660045588"
              />
            </div>
            <p>
              Radiant diamonds serve as a wonderful combination of the cushion
              and princess shapes, featuring a square-like shape with trimmed
              corners. These distinct corners are a defining characteristic of
              the radiant shape, contributing to its widespread appeal. Radiant
              diamonds are highly sought after, especially when set alongside
              baguette or round diamonds, making them a popular choice within
              the diamond community.
            </p>
          </div>
        </div>
        <div className="metals">
          <div>
            <h2>metals</h2>

            <div className="mb-4">
              <p>
                At Vianisa, we combine traditional iron forging techniques with
                modern die-making methods to create wedding bands with
                exceptional surface quality and non-porous, tensile metal
                properties. Our meticulous process involves purifying and
                blending various metals and alloys to achieve stunning colors
                and a brilliant shine. Regardless of the metal you choose, our
                extensive in-house expertise ensures that you receive exquisite
                and long-lasting jewelry.
              </p>
              <p>
                When it comes to selecting the metal for your wedding band,
                there are no hard and fast rules or limitations. You have the
                freedom to coordinate it with your engagement ring or even opt
                for mixed metals if you prefer a multi-color look. At Vianisa,
                we encourage you to explore all options, as we are committed to
                customizing your jewelry according to your desires.
              </p>
              <p>
                As part of our dedication to environmental responsibility, we
                use recycled gold in our manufacturing process. Through
                purification, we enhance the longevity of our jewelry while
                minimizing our ecological footprint. Since gold is a soft metal,
                it requires the addition of other metals to enhance its strength
                and create different hues. The purity of gold is measured in
                "karats," and Vianisa offers three options: 18K, 14K, and 10K,
                containing 75%, 58.5%, and 41.7% gold, respectively.
              </p>
            </div>
          </div>
          <div className="yellow_gold">
            <h3>Yellow Gold</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={305}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Yellow_480x480.jpg?v=1660045627"
              />
            </div>
            <p>
              Yellow gold is a classic and timeless choice for wedding rings.
              Its warm and lustrous appearance never goes out of fashion.
            </p>
          </div>
          <div className="rose_gold">
            <h3>Rose Gold</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={305}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Rose_480x480.jpg?v=1660045627"
              />
            </div>
            <p>
              A blend of yellow gold and copper gives rose gold its soft,
              romantic pink hue. This option exudes a delicate and enchanting
              aura.
            </p>
          </div>
          <div className="white_gold">
            <h3>White Gold</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={305}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/White_480x480.jpg?v=1660045627"
              />
            </div>
            <p>
              White gold, achieved through a mixture of yellow gold, zinc,
              nickel, and other metals, displays an elegant silver-white
              complexion. It radiates a noble and luminous tone, adding a touch
              of sophistication to your jewelry.
            </p>
            <p>Other options may be:</p>
          </div>
          <div className="platinum">
            <h3>Platinum</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={305}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Platinum_480x480.jpg?v=1660045937"
              />
            </div>
            <p>
              Platinum is a luxurious choice since it is rarer than other
              precious metals. It appears naturally white and is a very durable
              metal, perfect for pieces that require strength, such as stone set
              rings.
            </p>
          </div>
          <div className="palladium">
            <h3>Palladium</h3>
            <div className="flex flex-col items-center">
              <Image
                width={480}
                height={305}
                src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/Palladium_480x480.jpg?v=1660045966"
              />
            </div>
            <p>
              Coming from the same family as platinum, palladium offers a
              naturally white finish. It shares many desirable characteristics
              with platinum but is lighter and more affordable. Palladium
              presents an elegant and modern alternative.
            </p>
          </div>
        </div>
        {/* <Divider /> */}
      </div>
    );
  }
  return (
    <>
      <Schema1
        children={newkomp()}
        title={'ENGAGEMENT RING GUIDE'}
        className={'!max-w-[1000px]'}
      />
    </>
  );
}
