import React from 'react';
import  {each,find, includes} from 'lodash';
import {tags} from '../../constant/sizes';

function ProductExtraInput({product}) {
  const productType = product.productType.toLowerCase();
  const productTags = product.tags;
  // console.log(productType);
  // console.log(productTags);
  // console.log(tags);

  let resultType = find(tags, (i) => includes(i.productType, productType));
  let resultTag = find(tags, (i) => each(i.tags, (v) => includes(productTags, v)));
 
   

  // console.log(resultType);
  // console.log(resultTag);


  if (resultTag) return "resultTag";

  
      
 }
export default ProductExtraInput
