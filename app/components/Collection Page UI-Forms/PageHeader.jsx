import {trim} from '~/utils';

function PageHeader({collection}) {
  return (
    <div className="my-[15px] md:my-[50px] px-20">
      <h1
        className={trim(
          `text-center text-[25px] sm:text-[30px] font-optima-normal ${
            collection.description ? 'mb-[0.83em]' : ''
          }`,
        )}
      >
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
