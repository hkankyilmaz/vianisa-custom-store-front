import React from 'react';

function PageHeader({collection}) {
  return (
    <div className="my-[50px] px-20">
      <h1 className="text-center text-[16px] uppercase tracking-[3.2px] font-body">
        {collection.title}
      </h1>
      <p className="flex justify-center">
        <span className="lg:max-w-lg w-full text-center">
          {collection.description}
        </span>
      </p>
    </div>
  );
}

export default PageHeader;
