import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  BirthJewelryPage,
  EngagementRingPage,
  WeddingRingPage,
  DiamondComparisonPage,
  GemStoneComparisonPage,
  MeasurementPage,
} from '~/pages/education';

export const meta = ({params}) => {
  return [
    {
      title: `${params.handle
        .split('-')
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(' ')} - Vianisa`,
    },
  ];
};

export async function loader({params}) {
  const {handle} = params;
  return json({handle});
}

export default function Policy() {
  const {handle} = useLoaderData();
  let education;

  switch (handle) {
    case 'wedding-ring-guide':
      education = <WeddingRingPage />;
      break;

    case 'engagement-ring-guide':
      education = <EngagementRingPage />;
      break;

    case 'birthstone-jewelry-guide':
      education = <BirthJewelryPage />;
      break;

    case 'how-to-measure-your-ring-size':
      education = <MeasurementPage />;
      break;

    case 'lab-grown-vs-natural-diamonds':
      education = <DiamondComparisonPage />;
      break;

    case 'moissanite-vs-diamond':
      education = <GemStoneComparisonPage />;
      break;

    default:
      throw new Response('Not Found', {status: 404});
  }
  return education;
}
