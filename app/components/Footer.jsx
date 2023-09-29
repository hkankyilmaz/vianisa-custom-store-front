import {useMatches, NavLink} from '@remix-run/react';

export function Footer({menu}) {
  return (
    <footer className="footer mt-20">
      <nav>
        <p>SERVİCES</p>
        <ul>
          <li>
            <NavLink
              end
              to={'/pages/jewelry-care'}
              prefetch="intent"
              style={activeLinkStyle}
            >
              JEWELRY CARE
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/pages/ring-size-conversion-chart'}
              end
              prefetch="intent"
              style={activeLinkStyle}
            >
              RİNG SİZE CONVERSİON CHART
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/pages/lifetime-warranty'}
              end
              prefetch="intent"
              style={activeLinkStyle}
            >
              LİFETİME WARRANTY
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/pages/custom-made'}
              end
              prefetch="intent"
              style={activeLinkStyle}
            >
              CUSTOM ORDERS
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/pages/financing-options-with-affirm-and-shoppay'}
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
      </nav>

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
    </footer>
  );
}

function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? undefined : undefined,
    color: isPending ? 'grey' : 'gray',
  };
}
