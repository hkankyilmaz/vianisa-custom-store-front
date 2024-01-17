import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'text',
      content: [
        'Welcome to Vianisa, where sustainability meets timeless elegance. Established in the late 2010s, Vianisa has a rich history in the fine jewelry industry, initially reaching customers through third-party retailers. However, we recognized the power of being a direct manufacturer-to-customer brand—a privilege that allows us to offer high-quality, customizable designs at fair prices, while fostering a deeper connection with you, our valued customers.',
      ],
    },
    {
      type: 'text',
      content: [
        'By eliminating intermediaries, we bypass unnecessary costs and bridge the gap between us, ensuring that your unique desires and preferences are heard and understood. Our dedicated team of artisans combines traditional craftsmanship with modern techniques, bringing forth exceptional pieces that seamlessly blend durability and style. Each creation is meticulously crafted, reflecting our commitment to delivering the finest jewelry that will be cherished for a lifetime.',
      ],
    },
    {
      type: 'text',
      content: [
        "At Vianisa, sustainability is at the core of our brand philosophy. We are proud to incorporate recycled gold into our designs, reducing the environmental impact of mining while preserving the beauty and value of this precious metal. In harmony with our commitment to ethical practices, we embrace Moissanite as diamond's perfect companion. This exquisite gemstone possesses even greater brilliance than diamonds, captivating the eye with its dazzling sparkle. With remarkable hardness, surpassing that of ruby, emerald, and many other beloved gemstones, Moissanite is an enduring symbol of beauty and resilience.",
      ],
    },
    {
      type: 'text',
      content: [
        "We invite you to discover the captivating story of Moissanite—a gem that originated from the stars in 1983. Today, Moissanite can only be found in lab-created versions, ensuring that every stone we use is entirely ethical and conflict-free. This scintillating gem has quickly become the crown jewel of Vianisa's designs, offering you an affordable luxury without compromising on beauty or sustainability.",
      ],
    },
    {
      type: 'text',
      content: [
        'Choose Vianisa for sustainable engagement rings and bridal sets that capture the essence of your love story. Experience the perfect blend of artistry, sustainability, and affordability as you embark on this exciting chapter of your life. Our dedicated team is here to guide you every step of the way, transforming your vision into a cherished piece that reflects your unique style and commitment to a better world.',
      ],
    },
    {
      type: 'text',
      content: [
        'Join us on this journey and let Vianisa be the symbol of your everlasting love.',
      ],
      className: '!mb-0',
    },
  ];

  return (
    <BlogSchema title="Our Brand">
      <BlogContent content={content} />
    </BlogSchema>
  );
}
