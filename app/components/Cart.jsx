import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {useVariantUrl} from '~/utils';

export function CartMain({layout, cart}) {
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes.filter((code) => code.applicable).length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;

  return (
    <div className={className + ' z-auto'}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
    </div>
  );
}

function CartDetails({layout, cart}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <div className="cart-details">
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

function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <li key={id} className="cart-line overflow-hidden">
      {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          data={image}
          height={100}
          loading="lazy"
          width={100}
        />
      )}

      <div>
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
          <p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px]">
            <strong>{product.title}</strong>
          </p>
        </Link>
        <p>
          {selectedOptions.map((option) => option.value).join(' / ')}
          {/*  {selectedOptions.map((option) => (
            <li key={option.name}>
              <small>
                {option.name}: {option.value}
              </small>
            </li>
          ))} */}
        </p>
        <CartLinePrice line={line} as="span" />

        <CartLineQuantity line={line} />
      </div>
    </li>
  );
}

function CartCheckoutActions({checkoutUrl, cost}) {
  if (!checkoutUrl) return null;

  return (
    <div className="bg-gray-950 text-slate-100 max-w-xs max-h-10 mb-5 flex self-center justify-center items-center">
      <a href={checkoutUrl} target="_self">
        {/* <p>Continue to Checkout &rarr;</p> */}
        <div className="flex self-center items-center text-center justify-center">
          <p className="uppercase">Checkout </p>
          <p className="uppercase">. </p>
          {cost?.subtotalAmount?.amount ? (
            <Money className="uppercase" data={cost?.subtotalAmount} />
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
          <p>Add Order Note</p>

          <p>Shipping & taxes calculated at checkout</p>
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
      <button className="font-body_light text-sm underline  " type="submit">
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
    <div className="cart-line-quantiy flex flex-col">
      <div className="flex flex-col gap-1">
        {attributes.map((attribute) => (
          <small className="font-body_light italic">
            {attribute.key}: {attribute.value}
          </small>
        ))}

        {/* <small>Quantity: {quantity} &nbsp;&nbsp;</small> */}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex border px-5 py-1 ">
          <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
            <button
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              name="decrease-quantity"
              value={prevQuantity}
            >
              <span>&#8722; </span>
            </button>
          </CartLineUpdateButton>
          <p className="mx-5 text-sm my-0 flex justify-center items-center">
            {quantity}
          </p>
          <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
              aria-label="Increase quantity"
              name="increase-quantity"
              value={nextQuantity}
            >
              <span>&#43;</span>
            </button>
          </CartLineUpdateButton>
          &nbsp;
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
        className="text-sm"
        withoutTrailingZeros
        {...passthroughProps}
        data={moneyV2}
      />
    </div>
  );
}

export function CartEmpty({hidden = false, layout = 'aside'}) {
  return (
    <div hidden={hidden}>
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link
        to="/collections"
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/collections';
          }
        }}
      >
        Continue shopping →
      </Link>
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
