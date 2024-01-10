import {Divider} from '@mui/material';
import BlogSchema from '../../components/Blogs/BlogSchema';
import {Image} from '@shopify/hydrogen';
export const meta = ({data}) => {
  return [{title: 'wedding ring guide'}];
};

export default function Product() {
  function newkomp() {
    return (
      <div>
        <div className="mb-5 font-body_light">
          <h3 className="font-optima font-semibold mb-5">
            LAB-GROWN DIAMONDS VS. NATURAL DIAMONDS: A COMPARISON
          </h3>
          <p className="font-body_light text-base ">
            Lab-grown diamonds and natural diamonds may share many similarities,
            but there are a few key differences between them. Lab-grown diamonds
            are created in a controlled laboratory environment using advanced
            technology, while natural diamonds are formed naturally within the
            Earth. Here's a breakdown of the main points of distinction:
          </p>
          <ul className="ml-10  grid gap-3 mt-5">
            <li>
              <strong>Origin:</strong>
              Lab-grown diamonds are manufactured in laboratories, whereas
              natural diamonds are mined from the Earth.
            </li>
            <li>
              <strong>Composition:</strong>
              Both lab-grown and natural diamonds are made of pure carbon and
              possess the same crystal structure.
            </li>
            <li>
              <strong>4Cs:</strong>Lab-grown diamonds are graded and certified
              based on the same 4Cs—cut, clarity, color, and carat—as natural
              diamonds. They exhibit similar chemical, optical, and physical
              qualities.
            </li>
            <li>
              <strong>Simulants: </strong>
              Lab-grown diamonds should not be confused with diamond simulants,
              such as glass or cubic zirconia. Simulants resemble diamonds but
              lack the same properties and durability.
            </li>
          </ul>
        </div>
        <div className="mb-5 font-body_light ">
          <h3 className="font-optima font-semibold mb-5">
            PROS AND CONS OF LAB-GROWN DIAMONDS:
          </h3>
          <div>
            <p>
              <strong>Pros:</strong>
            </p>
            <ul className="ml-10">
              <li>
                <strong>Visual Similarity:</strong>
                Lab-grown diamonds closely resemble natural diamonds to the
                naked eye, making them indistinguishable without specialized
                instruments.
              </li>
              <li>
                <strong>Consistency: </strong>
                Due to advanced lab technology, lab-grown diamonds exhibit
                consistent characteristics, such as VS clarity and a very good
                cut grade, which can result in more affordable pricing.
              </li>
              <li>
                <strong>Color Options:</strong>
                Lab-grown diamonds offer a wider range of color options,
                including rare and expensive colors that may be hard to find
                naturally.
              </li>
              <li>
                <strong>Durability:</strong>
                Lab-grown diamonds are as durable as natural diamonds,
                maintaining their radiance and longevity over time.
              </li>
              <li>
                <strong>Ethical Aspect:</strong>
                Lab-grown diamonds are ethically produced, avoiding issues of
                exploitation or corruption associated with some mined diamonds.
              </li>
            </ul>
          </div>
          <div>
            <p>
              <strong>Cons:</strong>
            </p>
            <ul className="ml-10">
              <li>
                <strong>Imperfections:</strong>
                Lab-grown diamonds may still have minor internal or surface
                inclusions, similar to natural diamonds in the VS clarity range.
                However, these inclusions are typically not visible to the naked
                eye.
              </li>
              <li>
                <strong>Lack of Intrinsic Rarity:</strong>
                Lab-grown diamonds lack the unique rarity found in natural
                diamonds, as they are consistently produced with the same
                properties.
              </li>
            </ul>
          </div>
          <p>
            At Vianisa, we offer both natural and lab-grown diamonds, depending
            on your preferences and the design of the piece. We can also
            customize your choice of stone and metal, so feel free to contact us
            for further assistance.
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <BlogSchema
        children={newkomp()}
        title={'lab-grown vs. natural diamonds'}
        className={'!max-w-[1000px]'}
      />
    </>
  );
}
