import * as React from 'react';
import Title from './Title';

export default function Schema1({title, children}) {
  return (
    <div className="px-[80px] max-md:px-[24px]">
      <Title
        className=" text-center uppercase  font-title my-[50px]"
        title={title}
      />
      <div className="px-[22%] mb-10 max-md:px-0">{children}</div>
    </div>
  );
}
