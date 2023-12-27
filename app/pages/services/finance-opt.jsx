import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import Schema1 from '../../components/Blogs/Schema1';

export const meta = ({data}) => {
  return [{title: `Jewelry Care`.toUpperCase() + ' - Vianisa'}];
};

export async function loader({params, context}) {
  return json({});
}

export default function Page() {
  let text = [
    {
      title: 'WHAT ARE MY FINANCING OPTIONS?',
      context: [
        "Vianisa provides convenient loan services through trusted partners, allowing you to easily afford your durable jewelry. With ShopPay, powered by Affirm, you can make your jewelry purchase now and pay the agreed-upon amount later. Choose the payment method that suits you best and divide your purchase into weekly or monthly payments to own your desired jewelry. Simply select your preferred payment option at the checkout or apply for a virtual credit card through their websites or apps. It's a simple, secure, and authentic process!",
      ],
      type: 0,
    },
    {
      title: 'WHAT IS THE DIFFERENCE BETWEEN AFFIRM AND SHOPPAY?',
      context: [
        'ShopPay is powered by Affirm, with the only distinction being that ShopPay offers a faster checkout experience after your initial purchase by allowing you to save your email address, credit card, and billing information.',
      ],
      type: 0,
    },
    {
      title: 'ARE THERE ANY FEES FOR USING ALTERNATIVE PAYMENT METHODS?',
      context: [
        'No, Vianisa does not charge any fees for financing your jewelry with alternative payment methods. Additionally, Affirm and ShopPay do not charge fees for splitting your purchase. However, the interest rates will vary based on the payment plan you choose, and these details will be determined between you and the selected loan service provider.',
      ],
      type: 0,
    },
    {
      title: 'DOES AFFIRM OR SHOPPAY AFFECT MY CREDIT SCORE?',
      context: [
        'Creating an account, checking your eligibility, or exploring payment plans will not impact your credit score. However, if you choose to split your purchase monthly using these methods, your credit score may be affected.',
      ],
      type: 0,
    },
    {
      title: 'WHAT DO I NEED TO APPLY FOR AFFIRM/SHOPPAY?',
      subtitle: 'To use Affirm, customers must:',
      context: [
        'Be a resident of the United States (including U.S. territories)',
        "Be at least 18 years old (19 if you're a ward of the state in Nebraska)",
        'Have a social security number',
        'Own a phone number registered in the United States or U.S. territories that can receive SMS messages',
      ],
      type: 1,
    },
    {
      title: 'WHAT ARE MY PAYMENT OPTIONS?',
      subtitle: 'ShopPay offers various payment options, including:',
      context: [
        'Splitting your purchase into four payments every two weeks with no interest',
        'Choosing 3, 6, or 12 monthly payments with interest rates ranging from 10% to 36% APR. For example, on a $700 purchase, you may pay $63.18 per month for 12 months at a 15% APR.',
      ],
      type: 1,
    },
    {
      title: 'CAN I RETURN A FINANCED ITEM?',
      context: [
        "Yes, you can. Financed items can be returned following Vianisa's standard return process. The same rules and conditions apply: the item should be in its original condition, and you will need to provide the receipt. For more information, please visit our website.",
      ],
      type: 0,
    },
  ];

  let newkomp = (
    <div>
      {text.map((it) => (
        <div className="mb-[20.8px] ">
          <h3 className="mb-[20.8px] font-title">{it.title}</h3>
          {it.type === 0 ? (
            it.context.map((item) => <p>{item}</p>)
          ) : it.type === 1 ? (
            <>
              <p>{it.subtitle}</p>
              <ul className="mb-[20.8px] text-[13px] font-body pl-9">
                {it.context.map((li) => (
                  <li>{li}</li>
                ))}
              </ul>
            </>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
  return (
    <div className=" page max-w- m-auto px-[20px] pb-20 ">
      <Schema1 title="refund policy" children={newkomp}></Schema1>
    </div>
  );
}
