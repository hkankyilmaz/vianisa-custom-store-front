import {Divider} from '@mui/material';
import {useMatches, NavLink} from '@remix-run/react';

export function Footer({menu}) {
  let array = [
    {
      title: 'services',
      route: 'services',
      children: [
        'jewelry-care',
        'ring-size-conversion-chart',
        'lifetime-warranty',
        'custom-made',
        'financing-options-with-affirm-and-shoppay',
      ],
    },
    {
      title: 'education',
      route: 'education',
      children: [
        'wedding-ring-guide',
        'engagement-ring-guide',
        'birthstone-jewelry-guide',
        'how-to-measure-your-ring-size',
        'lab-grown-vs-natural-diamonds',
        'moissanite-vs-diamond',
      ],
    },
    {
      title: 'about us',
      route: 'about',
      children: [
        'our-brand',
        'our-values',
        'conflict-free-diamonds',
        'contact-us',
      ],
    },
    {
      title: 'policies',
      route: 'policies',
      children: [
        'shipping-and-returns',
        'refund-policy',
        'terms-of-service',
        'privacy-policy',
      ],
    },
  ];
  return (
    <footer>
      <div className="footer pt-20 ">
        {/* <nav>
          <p>SERVİCES</p>
          <ul>
            <li>
              <NavLink
                end
                to={'/services/jewelry-care'}
                prefetch="intent"
                style={activeLinkStyle}
              >
                JEWELRY CARE
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/services/ring-size-conversion-chart'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                RİNG SİZE CONVERSİON CHART
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/services/lifetime-warranty'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                LİFETİME WARRANTY
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/services/custom-made'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                CUSTOM ORDERS
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/services/financing-options-with-affirm-and-shoppay'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                FINANCING WITH AFFIRM AND SHOPPAY
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <p>EDUCATİON</p>
          <ul>
            <li>
              <NavLink
                to={'/pages/wedding-ring-guide'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                WEDDING RING GUIDE
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/pages/engagement-ring-guide'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                ENGAGEMENT RING GUIDE
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/pages/birthstone-jewelry-guide'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                BIRTHSTONE JEWELRY GUIDE
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/pages/how-to-measure-your-ring-size'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                HOW TO MEASURE YOUR RING SIZE
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/pages/lab-grown-vs-natural-diamonds'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                LAB-GROWN VS. NATURAL DIAMONDS
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/pages/moissanite-vs-diamond'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                MOISSANITE VS. DIAMOND
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <p>ABOUT US</p>
          <ul>
            <li>
              <NavLink
                to={'/pages/our-brand'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                OUR BRAND
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/pages/our-values'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                OUR VALUES
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/pages/conflict-free-diamonds'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                CONFLICT FREE DIAMONDS
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/pages/contact-us'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                CONTACT US
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <p>POLICIES</p>
          <ul>
            <li>
              <NavLink
                to={'/pages/shipping-and-returns'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                FREE SHIPPING
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/policies/refund-policy'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                RETURN & EXCHANGE POLICY
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/policies/terms-of-service'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                TERMS OF SERVICE
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/policies/privacy-policy'}
                end
                prefetch="intent"
                style={activeLinkStyle}
              >
                PRIVACY POLICY
              </NavLink>
            </li>
          </ul>
        </nav> */}
        {/* flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: flex-start; */}
        {array.map((item) => (
          <nav className="mb-3">
            <p>{item.title.toUpperCase()}</p>
            <ul className="flex flex-nowrap items-start justify-center content-center flex-col gap-3">
              {item.children.map((alt) => (
                <li>
                  <NavLink
                    end
                    to={'/' + item.route + '/' + alt}
                    prefetch="intent"
                    style={activeLinkStyle}
                  >
                    {alt == 'refund-policy'
                      ? 'RETURN & EXCHANGE POLICY'
                      : alt.split('-').join(' ').toUpperCase()}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav>
          <p>CONTACT INFO</p>
          <ul className="text-[gray]">
            <li>Vianisa</li>
            <li>98 Cuttermill Road Suite #466</li>
            <li>Great Neck, NY 11021</li>
            <li>PHONE: +1 (323) 545 65 45</li>
            <li>EMAIL: hello@vianisa.com</li>
          </ul>
        </nav>
        <div className="Footer__Copyright center content-center justify-center justify-items-center">
          <a
            href="/"
            className="Footer__StoreName Heading u-h7 Link Link--secondary"
          >
            © Vianisa
          </a>
        </div>
      </div>

      {/* <Divider className="w-100% flex sm:hidden" /> */}

      <ul className="Footer__PaymentList HorizontalList flex items-center content-center justify-center flex-wrap	 gap-x-5 pt-[28px]	gap-y-2 my-[28px]  border-t-2">
        <li className="HorizontalList__Item w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            aria-labelledby="pi-american_express"
          >
            <title id="pi-american_express">American Express</title>
            <g fill="none">
              <path
                fill="#000"
                d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z"
                opacity=".07"
              ></path>
              <path
                fill="#006FCF"
                d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"
              ></path>
              <path
                fill="#FFF"
                d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"
              ></path>
            </g>
          </svg>
        </li>
        <li className="HorizontalList__Item w-fit">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            x="0"
            y="0"
            width="38"
            height="24"
            viewBox="0 0 165.521 105.965"
            xmlSpace="preserve"
            aria-labelledby="pi-apple_pay"
          >
            <title id="pi-apple_pay">Apple Pay</title>
            <path
              fill="#000"
              d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"
            ></path>
            <path
              fill="#FFF"
              d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"
            ></path>
            <g>
              <g>
                <path
                  fill="#000"
                  d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"
                ></path>
                <path
                  fill="#000"
                  d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"
                ></path>
              </g>
              <g>
                <path
                  fill="#000"
                  d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"
                ></path>
                <path
                  fill="#000"
                  d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"
                ></path>
                <path
                  fill="#000"
                  d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"
                ></path>
              </g>
            </g>
          </svg>
        </li>
        <li className="HorizontalList__Item w-fit">
          <svg
            viewBox="0 0 38 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="38"
            height="24"
            aria-labelledby="pi-diners_club"
          >
            <title id="pi-diners_club">Diners Club</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            ></path>
            <path
              fill="#fff"
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
            ></path>
            <path
              d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z"
              fill="#3086C8"
            ></path>
          </svg>
        </li>
        <li className="HorizontalList__Item w-fit">
          <svg
            viewBox="0 0 38 24"
            width="38"
            height="24"
            role="img"
            aria-labelledby="pi-discover"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="pi-discover">Discover</title>
            <path
              fill="#000"
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            ></path>
            <path
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
              fill="#fff"
            ></path>
            <path
              d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z"
              fill="#231F20"
            ></path>
            <path
              d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
              fill="url(#pi-paint0_linear)"
            ></path>
            <path
              opacity=".65"
              d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
              fill="url(#pi-paint1_linear)"
            ></path>
            <path
              d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z"
              fill="#231F20"
            ></path>
            <path
              d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z"
              fill="#231F20"
            ></path>
            <path
              d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z"
              fill="#F48120"
            ></path>
            <defs>
              <linearGradient
                id="pi-paint0_linear"
                x1="21.657"
                y1="12.275"
                x2="19.632"
                y2="9.104"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F89F20"></stop>
                <stop offset=".25" stopColor="#F79A20"></stop>
                <stop offset=".533" stopColor="#F68D20"></stop>
                <stop offset=".62" stopColor="#F58720"></stop>
                <stop offset=".723" stopColor="#F48120"></stop>
                <stop offset="1" stopColor="#F37521"></stop>
              </linearGradient>
              <linearGradient
                id="pi-paint1_linear"
                x1="21.338"
                y1="12.232"
                x2="18.378"
                y2="6.446"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F58720"></stop>
                <stop offset=".359" stopColor="#E16F27"></stop>
                <stop offset=".703" stopColor="#D4602C"></stop>
                <stop offset=".982" stopColor="#D05B2E"></stop>
              </linearGradient>
            </defs>
          </svg>
        </li>
        <li className="HorizontalList__Item w-fit">
          <svg
            width="38"
            height="24"
            role="img"
            aria-labelledby="pi-metapay"
            viewBox="0 0 38 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="pi-metapay">Meta Pay</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
              fill="#000"
            ></path>
            <path
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
              fill="#fff"
            ></path>
            <path
              d="M4.983 12.986c0 .348.076.614.176.776a.6.6 0 00.524.3c.257 0 .491-.063.943-.688.362-.5.788-1.204 1.076-1.645l.486-.747c.337-.518.728-1.095 1.176-1.486.366-.319.76-.496 1.158-.496.667 0 1.302.386 1.788 1.111.532.794.79 1.793.79 2.825 0 .613-.12 1.064-.326 1.42-.2.345-.587.688-1.238.688v-.981c.558 0 .697-.513.697-1.1 0-.836-.195-1.764-.624-2.427-.305-.47-.7-.757-1.134-.757-.47 0-.848.354-1.274.986-.226.336-.457.745-.718 1.207l-.287.508c-.576 1.02-.722 1.254-1.01 1.637-.504.672-.935.927-1.502.927-.674 0-1.1-.291-1.363-.73C4.106 13.956 4 13.486 4 12.95l.983.035z"
              fill="#0081FB"
            ></path>
            <path
              d="M4.775 10.18C5.225 9.486 5.875 9 6.622 9c.432 0 .861.128 1.31.494.49.4 1.013 1.06 1.665 2.146l.234.39c.565.94.886 1.424 1.074 1.652.242.293.411.38.631.38.558 0 .697-.512.697-1.099l.867-.027c0 .613-.12 1.064-.326 1.42-.2.345-.587.688-1.238.688-.405 0-.764-.088-1.16-.462-.306-.287-.663-.798-.937-1.257l-.816-1.363c-.41-.684-.785-1.194-1.003-1.425-.234-.249-.534-.549-1.014-.549-.388 0-.718.273-.994.69l-.837-.498z"
              fill="url(#pi-paint0_linear_1164_3)"
            ></path>
            <path
              d="M6.606 9.988c-.388 0-.718.273-.994.69-.39.588-.629 1.466-.629 2.308 0 .348.076.614.176.776l-.838.552C4.106 13.956 4 13.486 4 12.95c0-.973.267-1.987.775-2.77C5.225 9.485 5.875 9 6.622 9l-.016.988z"
              fill="url(#pi-paint1_linear_1164_3)"
            ></path>
            <path
              d="M15.01 9.191h1.138l1.933 3.498 1.934-3.498h1.112v5.747h-.928v-4.405l-1.695 3.05h-.87l-1.696-3.05v4.405h-.927V9.191zm9.023 2.143c-.665 0-1.066.5-1.162 1.12h2.258c-.046-.638-.415-1.12-1.096-1.12zm-2.081 1.474c0-1.305.843-2.254 2.097-2.254 1.234 0 1.971.937 1.971 2.323v.255h-3.148c.111.674.559 1.129 1.28 1.129.576 0 .936-.176 1.277-.497l.493.603c-.465.427-1.055.674-1.803.674-1.358 0-2.167-.99-2.167-2.233zm5.193-1.392h-.854v-.76h.854V9.402h.895v1.256h1.297v.76H28.04v1.924c0 .657.21.89.726.89.236 0 .371-.02.57-.053v.752c-.248.07-.485.102-.742.102-.966 0-1.45-.528-1.45-1.584v-2.032zm5.96.739a1.207 1.207 0 00-1.17-.788c-.766 0-1.256.543-1.256 1.428 0 .863.451 1.433 1.22 1.433.603 0 1.034-.351 1.206-.788v-1.285zM34 14.938h-.878v-.6c-.246.353-.693.703-1.417.703-1.164 0-1.941-.975-1.941-2.246 0-1.283.796-2.241 1.99-2.241.591 0 1.055.236 1.368.653v-.55H34v4.281z"
              fill="#000000"
            ></path>
            <defs>
              <linearGradient
                id="pi-paint0_linear_1164_3"
                x1="5.93"
                y1="12.703"
                x2="12.196"
                y2="13.019"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0064E1"></stop>
                <stop offset=".4" stopColor="#0064E1"></stop>
                <stop offset=".83" stopColor="#0073EE"></stop>
                <stop offset="1" stopColor="#0082FB"></stop>
              </linearGradient>
              <linearGradient
                id="pi-paint1_linear_1164_3"
                x1="5.424"
                y1="13.399"
                x2="5.424"
                y2="11.089"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0082FB"></stop>
                <stop offset="1" stopColor="#0064E0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </li>
        <li className="HorizontalList__Item w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            aria-labelledby="pi-google_pay"
          >
            <title id="pi-google_pay">Google Pay</title>
            <path
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
              fill="#000"
              opacity=".07"
            ></path>
            <path
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              fill="#FFF"
            ></path>
            <path
              d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z"
              fill="#5F6368"
            ></path>
            <path
              d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z"
              fill="#4285F4"
            ></path>
            <path
              d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z"
              fill="#34A853"
            ></path>
            <path
              d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z"
              fill="#FBBC04"
            ></path>
            <path
              d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z"
              fill="#EA4335"
            ></path>
          </svg>
        </li>
        <li className="HorizontalList__Item w-fit">
          <svg
            viewBox="0 0 38 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="38"
            height="24"
            aria-labelledby="pi-master"
          >
            <title id="pi-master">Mastercard</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            ></path>
            <path
              fill="#fff"
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
            ></path>
            <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
            <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
            <path
              fill="#FF5F00"
              d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
            ></path>
          </svg>
        </li>
        <li className="HorizontalList__Item w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            aria-labelledby="pi-shopify_pay"
          >
            <title id="pi-shopify_pay">Shop Pay</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
              fill="#000"
            ></path>
            <path
              d="M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z"
              fill="#5A31F4"
            ></path>
            <path
              d="M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003zM15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577zM20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492zM28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z"
              fill="#fff"
            ></path>
          </svg>
        </li>
        <li className="HorizontalList__Item w-fit">
          <svg
            viewBox="0 0 38 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="38"
            height="24"
            aria-labelledby="pi-visa"
          >
            <title id="pi-visa">Visa</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            ></path>
            <path
              fill="#fff"
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
            ></path>
            <path
              d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
              fill="#142688"
            ></path>
          </svg>
        </li>
      </ul>
    </footer>
  );
}

function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? undefined : undefined,
    color: isPending ? 'grey' : 'gray',
  };
}
