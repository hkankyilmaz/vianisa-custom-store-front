export default function GridChanger() {
  return (
    <div className="flex w-[160px] justify-center items-center border-r h-full">
      <div className="w-[35px] h-[35px] grid grid-cols-2 grid-rows-2 gap-[0.5px] mr-2">
        {Array(4)
          .fill('')
          .map((idx) => (
            <div key={idx} className="w-[15px] h-[15px] bg-slate-200"></div>
          ))}
      </div>

      <div className="w-[35px] h-[35px] grid grid-cols-3 grid-rows-3 gap-[0.5px]">
        {Array(9)
          .fill('')
          .map((idx) => (
            <div key={idx} className="w-[10px] h-[10px] bg-slate-200"></div>
          ))}
      </div>
    </div>
  );
}
