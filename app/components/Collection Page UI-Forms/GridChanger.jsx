export default function GridChanger({setGrid, grid}) {
  const handleClick = (grid) => {
    if (grid == 'narrow') setGrid(false);
    else if (grid == 'wide') setGrid(true);
  };

  return (
    <>
      <div className="sm:hidden flex justify-center items-center max-sm:border-l sm:border-r h-[44px] w-[95px]">
        <div
          onClick={() => handleClick('narrow')}
          className="w-[18px] h-[18px] items-center justify-items-center gap-[3px] mx-[6px] cursor-pointer"
        >
          {Array(1)
            .fill('')
            .map((_, idx) => (
              <div
                style={{backgroundColor: !grid ? '#2f2f2f' : ''}}
                key={`1-${idx}`}
                className="w-[18px] h-[18px] bg-[#d5d5d5] transition-all duration-[0.35s] ease-in-out"
              ></div>
            ))}
        </div>

        <div
          onClick={() => handleClick('wide')}
          className="w-[18px] h-[18px] grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-[3px] mx-[6px] cursor-pointer "
        >
          {Array(4)
            .fill('')
            .map((_, idx) => (
              <div
                style={{backgroundColor: grid ? '#2f2f2f' : ''}}
                key={`2-${idx}`}
                className="w-2 h-2 bg-[#d5d5d5] transition-all duration-[0.35s] ease-in-out"
              ></div>
            ))}
        </div>
      </div>

      <div className="max-sm:hidden flex justify-center items-center max-sm:border-l sm:border-r h-full w-[115px]">
        <div
          onClick={() => handleClick('narrow')}
          className="w-[18px] h-[18px] grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-[3px] mx-[6px] cursor-pointer"
        >
          {Array(4)
            .fill('')
            .map((_, idx) => (
              <div
                style={{backgroundColor: !grid ? '#2f2f2f' : ''}}
                key={`3-${idx}`}
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
            .map((_, idx) => (
              <div
                style={{backgroundColor: grid ? '#2f2f2f' : ''}}
                key={`4-${idx}`}
                className="w-1 h-1 bg-[#d5d5d5] transition-all duration-[0.35s] ease-in-out"
              ></div>
            ))}
        </div>
      </div>
    </>
  );
}
