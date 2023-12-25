import React from 'react';

function PageHeader({collection}) {
  return (
    <div className="my-10">
      <h1 className="text-center text-4xl">{collection.title}</h1>
      <p className="flex justify-center">
        <span className="lg:max-w-lg w-full text-center">
          {collection.description}
        </span>
      </p>
    </div>
  );
}

export default PageHeader;
