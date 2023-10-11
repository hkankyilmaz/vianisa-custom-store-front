import React from 'react';
import {each, filter, find, includes, fill} from 'lodash';
import {tags} from '../../constant/sizes';
import {AiOutlineDown} from 'react-icons/ai';

export function ProductExtraInputType({product}) {
  const productType = product.productType.toLowerCase();

  let resultType = find(tags, (i) => includes(i.productType, productType));

  if (resultType) {
    if (resultType?.inputNumber == 1) {
      if (resultType.inputType == 'select') {
        return (
          <div className="relative my-3 h-[46px]">
            <select
              data-labelOnProduct={resultType.labelOnProduct}
              data-name={resultType.name}
              className="w-full h-[46px] cursor-pointer bg-transparent p-4 focus:border-transparent text-normal focus:outline-none border-2 border-[#E5E7EB] z-3"
            >
              <option value={null}> {resultType.placeHolder} </option>
              {resultType.options.delimeter
                ? fill(Array(resultType.options.optionCount), '').map(
                    (i, j) => (
                      <option
                        value={
                          resultType.options.range[0] +
                          j * resultType.options.delimeter
                        }
                      >
                        Size{' '}
                        {resultType.options.range[0] +
                          j * resultType.options.delimeter}{' '}
                      </option>
                    ),
                  )
                : undefined}
            </select>
            <AiOutlineDown className="absolute right-4 top-20 text-lg z-[-1]" />
          </div>
        );
      }
    }
  }
}

export function ProductExtraInputTag({product}) {
  const productTags = product.tags;

  console.log('productTags : ', productTags);

  let resultTag = filter(tags, (i) => {
    let res;
    each(i.tags, (v) => {
      res = includes(productTags, v);
    });
    return res;
  });

  console.log('tag : ', resultTag);

  if (resultTag) {
    return resultTag.map((inputObj) => (
      <>
        {inputObj.inputNumber == 1 && inputObj.inputType == 'text' ? (
          <div className="relative my-3 h-[46px]">
            <input
              className="w-full bg-transparent h-[46px] focus:border-transparent text-lg focus:outline-none border-2 border-[#E5E7EB] z-3"
              data-labelOnProduct={inputObj.labelOnProduct}
              data-name={inputObj.name}
              placeholder={inputObj.placeHolder}
            />
            <AiOutlineDown className="absolute right-4 top-8 text-lg z-[-1]" />
          </div>
        ) : inputObj.inputNumber == 1 && inputObj.inputType == 'select' ? (
          <div className="relative my-3 h-[46px]">
            <select
              data-labelOnProduct={inputObj.labelOnProduct}
              data-name={inputObj.name}
              className=" w-full h-[46px] cursor-pointer bg-transparent p-4 focus:border-transparent text-normal focus:outline-none border-2 border-[#E5E7EB] z-3"
            >
              <option value={null}> {inputObj.placeHolder} </option>
              {inputObj.options.delimeter
                ? fill(Array(inputObj.options.optionCount), '').map((i, j) => (
                    <option
                      value={
                        inputObj.options.range[0] +
                        j * inputObj.options.delimeter
                      }
                    >
                      Size{' '}
                      {inputObj.options.range[0] +
                        j * inputObj.options.delimeter}{' '}
                    </option>
                  ))
                : undefined}
            </select>
            <AiOutlineDown className="absolute right-4 top-8 text-lg z-[-1]" />
          </div>
        ) : undefined}
      </>
    ));
  }
}
