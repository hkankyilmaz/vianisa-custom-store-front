export default function GridChanger({setGrid, grid}) {
  const handleClick = (grid) => {
    if (grid == 'narrow') setGrid(false);
    else if (grid == 'wide') setGrid(true);
  };

  return (
    <div className="flex justify-center items-center border-r h-full w-[115px]">
      <div
        onClick={() => handleClick('narrow')}
        className="w-[18px] h-[18px] grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-[3px] mx-[6px] cursor-pointer"
      >
        {Array(4)
          .fill('')
          .map((idx) => (
            <div
              style={{backgroundColor: !grid ? '#2f2f2f' : ''}}
              key={idx}
              className="w-2 h-2 bg-[#d5d5d5] transition-all duration-[0.35s] ease-in-out"
            ></div>
          ))}
      </div>

      <div
        onClick={() => handleClick('wide')}
        className="w-[18px] h-[18px] grid grid-cols-3 grid-rows-3 items-center justify-items-center gap-[3px] mx-[6px] cursor-pointer "
      >
        {Array(9)
          .fill('')
          .map((idx) => (
            <div
              style={{backgroundColor: grid ? '#2f2f2f' : ''}}
              key={idx}
              className="w-1 h-1 bg-[#d5d5d5] transition-all duration-[0.35s] ease-in-out"
            ></div>
          ))}
      </div>
    </div>
  );
}
