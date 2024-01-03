import Schema1 from '~/components/Blogs/Schema1';
import Title from '../../components/Blogs/Title';

export const meta = ({data}) => {
  return [{title: 'Our Brand'}];
};

export default function Product() {
  let newkomp = (
    <>
      <div className="text-[13px] font-body_light mb-[40px]">
        <h3 className="text-[13px] font-optima mb-[20.8px]">
          <strong>FREE SHIPPING</strong>
        </h3>
        <p className="text-[13px] font-body_light mb-[20.8px]">
          We are delighted to provide complimentary shipping on all purchases.
          For expedited delivery options, there may be an additional cost
          involved.
        </p>
        <p className="text-[13px] font-body_light mb-[20.8px]">
          If you require special express delivery, please reach out to us, and
          we will make every effort to accommodate your request. Please note
          that overnight delivery or Saturday delivery may incur an extra
          charge.
        </p>
      </div>
      <div className="text-[13px] font-body_light mb-[20.8px]">
        <h3 className="text-[13px] font-optima mb-[20.8px]">
          <strong>HASSLE-FREE RETURNS</strong>
        </h3>
        <p className="text-[13px] font-body_light mb-[20.8px]">
          Our commitment to your satisfaction extends beyond the delivery of
          your order. We offer the following services to ensure a seamless and
          enjoyable return experience:
        </p>
        <ul className="pl-[30px] font-body_light text-[13px] mb-[20.8px]">
          <li>
            <h4 className="text-[13px] font-optima mb-[20.8px]">
              <strong>30-Day Returns</strong>
            </h4>
            <p className="text-[13px] font-body_light mb-[20.8px]">
              We accept returns and offer refunds for all made-to-order pieces
              within 30 days of delivery.
            </p>
          </li>
          <li>
            <h4 className="text-[13px] font-optima mb-[20.8px]">
              <strong>Return Shipping Label</strong>
            </h4>
            <p className="text-[13px] font-body_light mb-[20.8px]">
              Simply contact us via email, and we will promptly provide you with
              a return shipping label sent directly to your email address.
            </p>
          </li>
          <li>
            <h4 className="text-[13px] font-optima mb-[20.8px]">
              <strong>Secure and Insured</strong>
            </h4>
            <p className="text-[13px] font-body_light mb-[20.8px]">
              Rest assured that our return label includes insurance coverage for
              your item, providing you with peace of mind during the return
              shipment.
            </p>
          </li>
        </ul>
        <p className="text-[13px] font-body_light mb-[20.8px]">
          Upon receiving and inspecting your return, we will promptly notify
          you. The refund will be automatically issued to your original payment
          method.
        </p>
        <p className="text-[13px] font-body_light mb-[20.8px]">
          Please note that terms may apply for returns & exchanges and for more
          information you can check our Refund Policy page.
        </p>
      </div>
    </>
  );

  return (
    <>
      <Schema1 children={newkomp} title={'free shipping'} />
    </>
  );
}
