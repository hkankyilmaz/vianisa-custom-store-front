import React from 'react';

function FeaturedCollection({data}) {
  return (
    <section className="flex flex-col justify-center items-center my-5">
      <div className="text-xl text-center uppercase mb-5 w-[95%] sm:w-[80%]">
        {data.collection.title}
      </div>
      <div className="w-[85%] overflow-x-scroll whitespace-nowrap relative">
        {data?.collection?.products?.nodes?.map((product, idx) => (
          <Item key={idx} product={product} />
        ))}
        <button className="left-[-2em] top-[-50%] translate-y-[-60%] absolute">
          left
        </button>
        <button className="right-0 top-[-50%] translate-y-[-60%] absolute">
          Right
        </button>
      </div>
    </section>
  );
}

export default FeaturedCollection;

function Item({product}) {
  console.log(product);
  return (
    <div className="inline-block w-[25%] pr-5 align-top">
      <div>Sale</div>
      <div className="w-full">
        <img className="w-full h-auto" src={product.images.nodes[0].url} />
      </div>
      <div className="flex justify-start items-center whitespace-normal">
        {product.title}
      </div>
      <div> {product.variants.nodes[0].price.amount} </div>
    </div>
  );
}
