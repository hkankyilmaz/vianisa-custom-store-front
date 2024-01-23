import React, {useState} from 'react';
// import {each, filter, find, includes, fill, bind} from 'lodash';
import {tags} from '../../constant/sizes';
import {AiOutlineDown} from 'react-icons/ai';
import Checkbox from '@mui/material/Checkbox';

export function ProductExtraInputType({product, cardInfo}) {
  const productType = product.productType.toLowerCase();
  let resultType = tags.find((i) => i.productType?.includes(productType));

  if (resultType) {
    if (resultType?.inputNumber == 1) {
      if (resultType.inputType == 'select') {
        return (
          <div className="relative w-full text-[#595959] tracking-wide mt-[10px] mb-[15px]">
            <select
              data-labelonproduct={resultType.labelOnProduct}
              data-name={resultType.name}
              name={resultType.labelOnProduct.toUpperCase()}
              onChange={cardInfo}
              className="align-middle leading-[19.5px] w-full h-[41.5px] cursor-pointer bg-transparent px-[15px] py-[10px] focus:border-transparent text-[13px] focus:outline-none border border-[#E5E7EB] z-10"
            >
              <option value={null}> {resultType.placeHolder} </option>
              {resultType.options.delimeter
                ? Array(resultType.options.optionCount)
                    .fill('')
                    .map((i, j) => (
                      <option
                        key={j}
                        value={
                          resultType.options.range[0] +
                          j * resultType.options.delimeter
                        }
                      >
                        Size{' '}
                        {resultType.options.range[0] +
                          j * resultType.options.delimeter}{' '}
                      </option>
                    ))
                : undefined}
            </select>
            <AiOutlineDown className="absolute right-[15px] top-[14px] text-sm text-[#000] z-[-1]" />
          </div>
        );
      }
    }
  }
}

export function ProductExtraInputTag({product, cardInfo}) {
  const productTags = product.tags;
  const [open, setopen] = useState(false);
  let resultTag = tags.filter(function (obj) {
    return obj.tags.some((tag) => productTags.includes(tag));
  });
  if (resultTag) {
    return resultTag.map((inputObj, index) => (
      <div key={index} className="text-[#595959] tracking-wide">
        {inputObj.inputNumber == 1 && inputObj.inputType == 'text' ? (
          <div className="relative mb-3 mt-3 h-[41.5px]">
            <input
              className="w-full bg-transparent h-[41.5px] focus:border-transparent text-[13px] focus:outline-none border border-[#E5E7EB] z-3"
              data-labelonproduct={inputObj.labelOnProduct}
              data-name={inputObj.name}
              name={inputObj.labelOnProduct}
              onChange={cardInfo}
              placeholder={inputObj.placeHolder}
            />
            {/* <AiOutlineDown className="absolute right-4 first-letter:top-[50%] translate-y-[-50%] text-lg z-[-1]" /> */}
          </div>
        ) : inputObj.inputNumber == 1 && inputObj.inputType == 'select' ? (
          <div className="relative my-3 h-[41.5px]">
            <select
              data-labelonproduct={inputObj.labelOnProduct}
              data-name={inputObj.name}
              name={inputObj.labelOnProduct}
              onChange={cardInfo}
              className=" w-full h-[41.5px] cursor-pointer bg-transparent focus:border-transparent text-[13px] focus:outline-none border border-[#E5E7EB] z-3"
            >
              <option value={null}> {inputObj.placeHolder} </option>
              {inputObj.options.delimeter
                ? Array(inputObj.options.optionCount)
                    .fill('')
                    .map((i, j) => (
                      <option
                        key={j}
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
                : inputObj.options.map((i, j) => (
                    <option key={j} value={i}>
                      {' '}
                      {i}{' '}
                    </option>
                  ))}
            </select>
            <AiOutlineDown className="absolute right-4 top-[50%] translate-y-[-50%] text-[13px] z-[-1]" />
          </div>
        ) : (
          <>
            {inputObj.inputs.map((inputObjSub, idx) =>
              inputObjSub.inputType == 'checkbox' ? (
                <div key={idx} className="flex items-center mt-[15px]">
                  <input
                    data-labelonproduct={inputObjSub.labelOnProduct}
                    data-name={inputObj.name}
                    value={open}
                    name="chck"
                    type="checkbox"
                    id="chck"
                    onChange={() => setopen(!open)}
                    className="before:content[''] relative h-[18px] w-[18px] mr-2 cursor-pointer appearance-none focus:ring-0 focus:ring-offset-0	 rounded-sm border-2 border-blue-gray-200 before:absolute before:top-2/4 before:left-2/4 before:block before:h-4 before:w-4 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity  hover:before:opacity-10"
                  />
                  <label className="font-body text-[13px]" htmlFor={'chck'}>
                    {' '}
                    {inputObjSub.placeHolder}{' '}
                  </label>
                </div>
              ) : inputObjSub.inputType == 'select' && open ? (
                <div key={idx} className="relative mt-[15px] h-[41.5px]">
                  <select
                    data-labelonproduct={inputObjSub.labelOnProduct}
                    data-name={inputObjSub.name}
                    name={inputObjSub.labelOnProduct}
                    onChange={cardInfo}
                    className=" w-full h-[41.5px] cursor-pointer bg-transparent  focus:border-transparent text-[13px] focus:outline-none border border-[#E5E7EB] z-3"
                  >
                    <option value={null}> {inputObjSub.placeHolder} </option>
                    {inputObjSub.options.delimeter
                      ? Array(inputObjSub.options.optionCount)
                          .fill('')
                          .map((i, j) => (
                            <option
                              key={j}
                              value={
                                inputObjSub.options.range[0] +
                                j * inputObjSub.options.delimeter
                              }
                            >
                              Size{' '}
                              {inputObjSub.options.range[0] +
                                j * inputObjSub.options.delimeter}{' '}
                            </option>
                          ))
                      : inputObjSub.options.map((i, j) => (
                          <option key={j} value={i}>
                            {' '}
                            {i}{' '}
                          </option>
                        ))}
                  </select>
                  <AiOutlineDown className="absolute right-4 top-[50%] translate-y-[-50%] text-sm text-black z-[-1]" />
                </div>
              ) : inputObjSub.inputType == 'text' && open ? (
                <div key={idx} className="relative mt-[15px] h-[41.5px]">
                  <input
                    className="placeholder-neutral-400 w-full text-[13px] px-[15px] py-[10px] bg-transparent h-[41.5px] focus:border-transparent focus:outline-none border border-[#E5E7EB] z-3"
                    data-labelonproduct={inputObjSub.labelOnProduct}
                    name={inputObjSub.labelOnProduct}
                    onChange={cardInfo}
                    data-name={inputObjSub.name}
                    placeholder={inputObjSub.placeHolder}
                  />
                </div>
              ) : undefined,
            )}
          </>
        )}
      </div>
    ));
  }
}
