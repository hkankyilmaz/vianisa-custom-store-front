import {Link} from '@remix-run/react';
import {CartForm, Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/utils';

export function CartMain({layout, cart}) {
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes.filter((code) => code.applicable).length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;

  return (
    <div className={className + ' z-auto h-full'}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
    </div>
  );
}

function CartDetails({layout, cart}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <div className="cart-details px-[30px]">
      <CartLines lines={cart?.lines} layout={layout} />
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout={layout}>
          {/* <CartDiscounts discountCodes={cart.discountCodes} /> */}
          <CartCheckoutActions
            checkoutUrl={cart.checkoutUrl}
            cost={cart.cost}
          />
        </CartSummary>
      )}
    </div>
  );
}

function CartLines({lines, layout}) {
  if (!lines) return null;
  return (
    <div aria-labelledby="cart-lines">
      <ul>
        {lines.nodes.map((line) => (
          <CartLineItem key={line.id} line={line} layout={layout} />
        ))}
      </ul>
    </div>
  );
}
//fix css wrap bug
function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <li key={id} className="flex items-center py-[30px] overflow-hidden">
      {image && (
        <Image
          alt={title}
          aspectRatio="4/3"
          data={image}
          height={100}
          loading="lazy"
          width={120}
        />
      )}

      <div className="pl-[25px] max-w-[220px]">
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              // close the drawer
              window.location.href = lineItemUrl;
            }
          }}
        >
          <p className="uppercase whitespace-nowrap overflow-hidden text-ellipsis font-avenir-medium text-[11px] tracking-widest mb-[5px]">
            {product.title}
          </p>
        </Link>
        <p className="uppercase font-avenir-medium text-[10px] tracking-widest">
          {selectedOptions.map((option) => option.value).join(' / ')}
          {/*  {selectedOptions.map((option) => (
            <li key={option.name}>
              <small>
                {option.name}: {option.value}
              </small>
            </li>
          ))} */}
        </p>

        <CartLineQuantity line={line} />
      </div>
    </li>
  );
}

function CartCheckoutActions({checkoutUrl, cost}) {
  if (!checkoutUrl) return null;

  return (
    <div
      className="border flex items-center justify-center w-full align-middle 
      mt-[15px] px-2 py-3 h-auto text-[11px] font-bold uppercase bg-[#2f2f2f]
    border-[#2f2f2f] tracking-[2.2px] text-white hover:bg-[#fff0e7] hover:text-[#2f2f2f]"
      style={{transition: 'all ease 150ms'}}
    >
      <a href={checkoutUrl} target="_self">
        {/* <p>Continue to Checkout &rarr;</p> */}
        <div className="flex self-center items-center text-center justify-center">
          <p className="uppercase text-[11px]">Checkout </p>
          <p className="uppercase mx-[18px] text-lg flex items-center h-1">·</p>
          {cost?.subtotalAmount?.amount ? (
            <>
              <Money
                className="uppercase font-avenir-medium text-[11px]"
                data={cost?.subtotalAmount}
              />
              &nbsp;
              <p className="font-avenir-medium text-[11px]">USD</p>
            </>
          ) : (
            '-'
          )}
        </div>
      </a>
      <br />
    </div>
  );
}

export function CartSummary({cost, layout, children = null}) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={className}>
      {/* <h4>Totals</h4> */}
      <dl className="cart-subtotal">
        {/* <dt>Subtotal</dt> */}
        <div className="flex flex-col">
          <p className="font-avenir-light text-[13px] text-[#2f2f2f]">
            Add Order Note
          </p>

          <p className="font-avenir-light text-[13px] text-[#2f2f2f] mt-1 mb-2">
            Shipping & taxes calculated at checkout
          </p>
        </div>
        {/* <dd>
          {cost?.subtotalAmount?.amount ? (
            <Money className="" data={cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd> */}
      </dl>
      {children}
    </div>
  );
}

function CartLineRemoveButton({lineIds}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        className="uppercase font-avenir-medium text-[8px] text-[#2f2f2f] tracking-[2px] link-underline link-underline-black "
        type="submit"
      >
        Remove
      </button>
    </CartForm>
  );
}

function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, attributes} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex flex-col">
      {attributes.map((attribute) => (
        <small className="uppercase font-avenir-medium text-[10px] italic tracking-widest mb-[4.5px]">
          {attribute.key}: {attribute.value}
        </small>
      ))}
      {/* <div className="cart-line-quantiy flex flex-col ">
         <small>Quantity: {quantity} &nbsp;&nbsp;</small> 
      </div> */}
      <CartLinePrice line={line} as="span" />
      <div className="flex justify-between items-center mt-[20px]">
        <div className="flex border ">
          <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
            <button
              className="px-[14px] pr-[20px] py-[3px] text-xl font-avenir-medium text-[#6a6a6a]"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              name="decrease-quantity"
              value={prevQuantity}
            >
              <span>&#8722; </span>
            </button>
          </CartLineUpdateButton>
          <p className="font-avenir-medium text-[12px] flex justify-center items-center">
            {quantity}
          </p>
          <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
              className="px-[14px] pl-[20px] py-[3px] text-xl font-avenir-medium text-[#6a6a6a]"
              aria-label="Increase quantity"
              name="increase-quantity"
              value={nextQuantity}
            >
              <span>&#43;</span>
            </button>
          </CartLineUpdateButton>
        </div>
        <CartLineRemoveButton lineIds={[lineId]} />
      </div>
    </div>
  );
}

function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return (
    <div>
      <Money
        className="uppercase font-avenir-medium text-[10px] tracking-widest"
        withoutTrailingZeros
        {...passthroughProps}
        data={moneyV2}
      />
    </div>
  );
}

export function CartEmpty({hidden = false, layout = 'aside'}) {
  return (
    <div hidden={hidden} className="h-full ">
      <div className="h-full flex items-center justify-center">
        <p className="font-avenir-medium text-[13px] tracking-[2.6px] text-[#2f2f2f]">
          YOUR CART IS EMPTY
        </p>
      </div>
      {/* <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>

      <Link
        to="/collections"
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/collections';
          }
        }}
      >
        Continue shopping →
      </Link> */}
    </div>
  );
}

function CartDiscounts({discountCodes}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div>
          <input type="text" name="discountCode" placeholder="Discount code" />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}
