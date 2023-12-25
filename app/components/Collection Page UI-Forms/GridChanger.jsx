export default function GridChanger({setGrid, grid}) {
  const handleClick = (grid) => {
    if (grid == 'narrow') setGrid(false);
    else if (grid == 'wide') setGrid(true);
  };

  return (
    <div className="flex lg:w-[160px] justify-center items-center border-r h-full">
      <div
        onClick={() => handleClick('narrow')}
        className="w-[35px] h-[35px] grid grid-cols-2 grid-rows-2 gap-[0.5px] mr-2 cursor-pointer"
      >
        {Array(4)
          .fill('')
          .map((idx) => (
            <div
              style={{backgroundColor: !grid ? '#737373' : ''}}
              key={idx}
              className="w-[15px] h-[15px] bg-slate-200 transition-all duration-[0.7s]"
            ></div>
          ))}
      </div>

      <div
        onClick={() => handleClick('wide')}
        className="w-[35px] h-[35px] grid grid-cols-3 grid-rows-3 gap-[0.5px] cursor-pointer "
      >
        {Array(9)
          .fill('')
          .map((idx) => (
            <div
              style={{backgroundColor: grid ? '#737373' : ''}}
              key={idx}
              className="w-[10px] h-[10px] bg-slate-200 transition-all duration-[0.7s]"
            ></div>
          ))}
      </div>
    </div>
  );
}
