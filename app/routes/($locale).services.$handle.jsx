import {json} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import Life from '../pages/services/lifetime-warranty';
import Jew from '../pages/services/jewelry-care';
import FinOp from '../pages/services/finance-opt';
import RingSize from '../pages/services/ring-size';

export async function loader({params, request, context}) {
  const {handle} = params;

  return json({handle});
}

export default function Services() {
  const {handle} = useLoaderData();
  function main() {
    switch (handle) {
      case 'lifetime-warranty':
        return <Life />;
      case 'jewelry-care':
        return <Jew />;
      case 'financing-options-with-affirm-and-shoppay':
        return <FinOp />;
      case 'ring-size-conversion-chart':
        return <RingSize />;
      default:
        throw new Response('Not Found', {status: 404});
    }
  }
  return main();
}
