import {Link} from '@remix-run/react';

export default function CaratOptions({
  carats,
  matches,
  modifiedStringwithCarat,
}) {
  return (
    <div className=" mb-6 flex justify-start items-center gap-[5px]">
      <h5 className="h-full font-bold text-[13px] md:mr-5 flex justify-center items-center font-avenir-medium text-[#2f2f2f] pt-[10px]">
        Total Carat Weight:
      </h5>
      <div className="h-full flex justify-center items-center gap-[5px]">
        {carats.map((carat) => (
          <CaratItem
            name={carat}
            matches={matches}
            modifiedStringwithCarat={modifiedStringwithCarat}
            key={carat}
          />
        ))}
      </div>
    </div>
  );
}
function CaratItem({name, matches, modifiedStringwithCarat}) {
  let title = '';
  let handle_ = '';

  if (name === '1') {
    title = '1.00ct';
    handle_ = '-1-00-ct';
  } else if (name === '1.5') {
    title = '1.50ct';
    handle_ = '-1-50-ct';
  } else if (name === '2') {
    title = '2.00ct';
    handle_ = '-2-00-ct';
  } else if (name === '3') {
    title = '3.00ct';
    handle_ = '-3-00-ct';
  } else if (name === '0.5') {
    title = '0.50ct';
    handle_ = '-0-50-ct';
  } else if (name === '0.1') {
    title = '0.10ct';
    handle_ = '-0-10-ct';
  } else if (name === '0.2') {
    title = '0.20ct';
    handle_ = '-0-20-ct';
  } else if (name === '0.3') {
    title = '0.30ct';
    handle_ = '-0-30-ct';
  } else if (name === '0.25') {
    title = '0.25ct';
    handle_ = '-0-25-ct';
  } else if (name === '0.75') {
    title = '0.75ct';
    handle_ = '-0-75-ct';
  } else if (name === '2.5') {
    title = '2.50ct';
    handle_ = '-2-50-ct';
  }
  return (
    <Link
      style={{
        backgroundColor: matches.includes(handle_) ? 'white' : '',
        border: matches.includes(handle_) ? '2px solid black' : '',
        color: matches.includes(handle_) ? 'black' : '',
        cursor: matches.includes(handle_) ? 'default' : '',
      }}
      prefetch="intent"
      className=" border-2 px-[10px] py-[17px] rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
      to={`/products/${modifiedStringwithCarat + handle_}`}
      preventScrollReset
    >
      {title}
    </Link>
  );
}
