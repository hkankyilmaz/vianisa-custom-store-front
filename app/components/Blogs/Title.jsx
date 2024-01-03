import * as React from 'react';

export default function Title({className, title}) {
  return (
    <div className={className ? className : 'my-[50px] font-optima'}>
      <h2>{title}</h2>
    </div>
  );
}
