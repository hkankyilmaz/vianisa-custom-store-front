import {trim} from '~/utils';
import {CloseButton} from '../Header/Drawer';

const SortForm = ({closeMobileSort, update, isSearchPage}) => {
  const sortOptions = !isSearchPage
    ? [
        {
          label: 'FEATURED',
          value: 'COLLECTION_DEFAULT',
          reversed: false,
        },
        {
          label: 'BEST SELLING',
          value: 'BEST_SELLING',
          reversed: false,
        },
        {
          label: 'ALPHABETICALLY, A-Z',
          value: 'TITLE',
          reversed: false,
        },
        {
          label: 'ALPHABETICALLY, Z-A',
          value: 'TITLE',
          reversed: true,
        },
        {
          label: 'PRICE, LOW TO HIGH',
          value: 'PRICE',
          reversed: false,
        },
        {
          label: 'PRICE, HIGH TO LOW',
          value: 'PRICE',
          reversed: true,
        },
        {
          label: 'DATE, OLD TO NEW',
          value: 'CREATED',
          reversed: false,
        },
        {
          label: 'DATE, NEW TO OLD',
          value: 'CREATED',
          reversed: true,
        },
      ]
    : [
        {
          label: 'RELEVANCE',
          value: 'RELEVANCE',
          reversed: false,
        },
        {
          label: 'PRICE, LOW TO HIGH',
          value: 'PRICE',
          reversed: false,
        },
        {
          label: 'PRICE, HIGH TO LOW',
          value: 'PRICE',
          reversed: true,
        },
      ];

  return (
    <>
      <div className="sort-modal-desktop modal-shadow translate-y-2 max-lg:hidden w-max z-20 rounded-md [&>p:hover]:underline cursor-[initial] [&>p]:mb-2 absolute top-[130px] right-0 h-auto">
        <div className="rounded-xl flex justify-center items-center flex-col py-7 clip-path-filter bg-[#efefef] [&>span]:text-right">
          {sortOptions.map((option, index) => (
            <SortInput
              key={`desktop-${index}`}
              {...option}
              update={update}
              closeSort={closeMobileSort}
            />
          ))}
        </div>
      </div>
      <div className="modal-shadow lg:hidden w-full z-[55] [&>p:hover]:underline cursor-[initial] [&>p]:mb-2 fixed left-0 right-0 bottom-0">
        <div className="sort-modal absolute z-60 bottom-0 right-0 left-0 flex justify-center h-min items-center flex-col pb-[18px] bg-[#efefef] ">
          <header className="w-full text-center px-5 py-[13px]  text-[#2f2f2f] text-xl font-avenir-medium tracking-[4px] border-b">
            <div className="absolute left-[-10px]">
              <CloseButton onClick={() => closeMobileSort()} />
            </div>
            SORT
          </header>
          {sortOptions.map((option, index) => (
            <SortInput
              key={`mobile-${index}`}
              {...option}
              update={update}
              closeSort={closeMobileSort}
              className={index == 0 ? 'mt-[13px]' : ''}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const SortInput = ({
  label,
  value,
  reversed,
  update,
  closeSort,
  className = '',
}) => {
  const handleOnClick = () => {
    update(value, reversed);
    closeSort();
  };

  return (
    <span className={trim(`sort-btn ${className}`)} onClick={handleOnClick}>
      {label}
    </span>
  );
};

export default SortForm;
