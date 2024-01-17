import {Link} from '@remix-run/react';
import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'title',
      content: 'WHAT ARE MY FINANCING OPTIONS?',
    },
    {
      type: 'text',
      content: [
        "Vianisa provides convenient loan services through trusted partners, allowing you to easily afford your durable jewelry. With ShopPay, powered by Affirm, you can make your jewelry purchase now and pay the agreed-upon amount later. Choose the payment method that suits you best and divide your purchase into weekly or monthly payments to own your desired jewelry. Simply select your preferred payment option at the checkout or apply for a virtual credit card through their websites or apps. It's a simple, secure, and authentic process!",
      ],
    },
    {
      type: 'title',
      content: 'WHAT IS THE DIFFERENCE BETWEEN AFFIRM AND SHOPPAY?',
    },
    {
      type: 'text',
      content: [
        'ShopPay is powered by Affirm, with the only distinction being that ShopPay offers a faster checkout experience after your initial purchase by allowing you to save your email address, credit card, and billing information.',
      ],
    },
    {
      type: 'title',
      content: 'ARE THERE ANY FEES FOR USING ALTERNATIVE PAYMENT METHODS?',
    },
    {
      type: 'text',
      content: [
        'No, Vianisa does not charge any fees for financing your jewelry with alternative payment methods. Additionally, Affirm and ShopPay do not charge fees for splitting your purchase. However, the interest rates will vary based on the payment plan you choose, and these details will be determined between you and the selected loan service provider.',
      ],
    },
    {
      type: 'title',
      content: 'DOES AFFIRM OR SHOPPAY AFFECT MY CREDIT SCORE?',
    },
    {
      type: 'text',
      content: [
        'Creating an account, checking your eligibility, or exploring payment plans will not impact your credit score. However, if you choose to split your purchase monthly using these methods, your credit score may be affected.',
      ],
    },
    {
      type: 'title',
      content: 'WHAT DO I NEED TO APPLY FOR AFFIRM/SHOPPAY?',
    },
    {
      type: 'text',
      content: ['To use Affirm, customers must:'],
    },
    {
      type: 'list',
      content: [
        'Be a resident of the United States (including U.S. territories)',
        "Be at least 18 years old (19 if you're a ward of the state in Nebraska)",
        'Have a social security number',
        'Own a phone number registered in the United States or U.S. territories that can receive SMS messages',
      ],
    },
    {
      type: 'title',
      content: 'WHAT ARE MY PAYMENT OPTIONS?',
    },
    {
      type: 'text',
      content: ['ShopPay offers various payment options, including:'],
    },
    {
      type: 'list',
      content: [
        'Splitting your purchase into four payments every two weeks with no interest',
        'Choosing 3, 6, or 12 monthly payments with interest rates ranging from 10% to 36% APR. For example, on a $700 purchase, you may pay $63.18 per month for 12 months at a 15% APR.',
      ],
    },
    {
      type: 'title',
      content: 'CAN I RETURN A FINANCED ITEM?',
    },
    {
      type: 'text',
      content: [
        "Yes, you can. Financed items can be returned following Vianisa's standard return process. The same rules and conditions apply: the item should be in its original condition, and you will need to provide the receipt. For more information, please visit our website.",
      ],
    },
  ];

  return (
    <BlogSchema title="financing options with affirm and shoppay">
      <BlogContent content={content} />
      <p>
        For additional assistance, please visit:{' '}
        <Link
          to="https://www.affirm.com/help"
          target="_blank"
          className="underline"
        >
          www.affirm.com/help
        </Link>
      </p>
    </BlogSchema>
  );
}
