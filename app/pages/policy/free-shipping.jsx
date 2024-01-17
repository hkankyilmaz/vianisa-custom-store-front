import {Link} from '@remix-run/react';
import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'title',
      content: 'FREE SHIPPING',
    },
    {
      type: 'text',
      content: [
        'We are delighted to provide complimentary shipping on all purchases. For expedited delivery options, there may be an additional cost involved.',
        'If you require special express delivery, please reach out to us, and we will make every effort to accommodate your request. Please note that overnight delivery or Saturday delivery may incur an extra charge.',
      ],
    },
    {
      type: 'space',
    },
    {
      type: 'title',
      content: 'HASSLE-FREE RETURNS',
    },
    {
      type: 'text',
      content: [
        'Our commitment to your satisfaction extends beyond the delivery of your order. We offer the following services to ensure a seamless and enjoyable return experience:',
      ],
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            '30-Day Returns: ',
            'We accept returns and offer refunds for all made-to-order pieces within 30 days of delivery.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Return Shipping Label: ',
            'Simply contact us via email, and we will promptly provide you with a return shipping label sent directly to your email address.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Secure and Insured: ',
            'Rest assured that our return label includes insurance coverage for your item, providing you with peace of mind during the return shipment.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
      ],
    },
    {
      type: 'text',
      content: [
        'Upon receiving and inspecting your return, we will promptly notify you. The refund will be automatically issued to your original payment method.',
      ],
    },
  ];

  return (
    <BlogSchema title="free shipping">
      <BlogContent content={content} />
      <p>
        Please note that terms may apply for returns & exchanges and for more
        information you can check our{' '}
        <Link to="/policies/refund-policy" className="underline">
          Refund Policy
        </Link>{' '}
        page.
      </p>
    </BlogSchema>
  );
}
