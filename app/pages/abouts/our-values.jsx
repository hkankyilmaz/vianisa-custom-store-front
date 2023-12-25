import Title from '../../components/Blogs/Title';
import Schema1 from '../../components/Blogs/Schema1';

export const meta = ({data}) => {
  return [{title: 'Our Values'}];
};

export default function Product() {
  let texts = [
    {
      title: 'UNPARALLELED CUSTOMIZATION',
      body: "At Vianisa, we believe that every piece of jewelry should be as unique as the person wearing it. That's why we create each piece to order, ensuring that nothing is picked from stock. Whether it's adjusting the size, dimensions, material, or engraving, we welcome your special wishes and even offer the option to request a completely new design from scratch. With the skill and expertise of our in-house craftsmen, your vision will be transformed into a breathtaking reality.",
    },
    {
      title: 'CRAFTSMANSHIP OF UNCOMPROMISING QUALITY',
      body: 'We take pride in the fusion of traditional iron forging techniques and modern methods employed by our artisans. This harmonious blend results in exquisite and durable jewelry that stands the test of time. Every metal and alloy used in our process undergoes meticulous purification and mixing to achieve its enchanting color and brilliant shine. At Vianisa, we strive for the highest standards of craftsmanship, combining aesthetics with technical precision at every step of the creation process.',
    },
    {
      title: 'ETHICAL AND SUSTAINABLE SOURCING',
      body: 'At the heart of Vianisa lies our unwavering commitment to being a socially, ethically, and environmentally responsible brand. We go above and beyond to ensure that our jewelry reflects your values. In our designs, we utilize recycled metals and source conflict-free diamonds, guaranteeing a reliable and hassle-free experience for our customers. We adhere to the Kimberley Process, a global initiative aimed at preventing the flow of conflict diamonds and ensuring that they do not finance terrorism or illegal activities. Every diamond we use is traceable back to its source and certified as conflict-free. Our mission is to make affordable jewelry accessible to everyone without compromising on quality or ethical standards.',
    },
    {
      title: 'IMPECCABLE SERVICE',
      body: "Your satisfaction is our top priority at Vianisa. That's why we offer free shipping on all purchases, ensuring a seamless shopping experience. We understand that life is full of surprises, and we are here to accommodate your special requests, including rush orders. Whether you're placing your first order or have been a loyal customer for years, we strive to provide you with the best possible service. Every order is handled with care and meticulous attention to detail, ensuring that our customers receive the smooth and enjoyable experience they deserve.",
    },
    {
      title: 'FAIR AND TRANSPARENT PRICING',
      body: 'As a direct manufacturer-to-customer brand, Vianisa has the advantage of offering the highest quality jewelry at fair prices. By bypassing costly middlemen, we are able to provide you with the best value in the market. We are committed to maintaining this approach, ensuring that our customers can indulge in the finest jewelry that will be treasured for a lifetime.',
    },
    {
      title: 'LIFETIME MAINTENANCE',
      body: "Our relationship with you extends far beyond the initial purchase. We aim to become your personal jeweler, offering a range of maintenance services to keep your jewelry in impeccable condition. From prong tightening to re-polishing, rhodium plating, and cleaning, we are here to ensure that your cherished pieces continue to shine. All our jewelry comes with a manufacturer warranty, and if you believe there is any damage due to manufacturing, we encourage you to send it to us for evaluation. Any affirmed damages will be promptly repaired, or the piece will be replaced if necessary. Whether it's utilizing your lifetime warranty or seeking additional repair work, we are dedicated to taking care of your jewelry throughout its lifetime.",
    },
  ];
  let newkomp = texts.map((text) => {
    return (
      <>
        <h4 className="font-title mb-[20.8px] text-[13px] font-semibold text-[#2f2f2f]">
          {text.title}
        </h4>
        <p className="font-body mb-[40px] text-[13px] text-[#2f2f2f]">
          {text.body}
        </p>
        <br />
      </>
    );
  });

  return <Schema1 children={newkomp} title={'Our Values'} />;
}
