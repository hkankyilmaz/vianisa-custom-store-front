import Title from './Title';
export default function Schema1({title, children, className}) {
  return (
    <div className="px-[80px] flex self-center justify-center flex-col justify-items-center items-center max-md:px-0">
      <Title
        className=" text-center uppercase tracking-[4px] font-optima text-[20px] my-[50px] max-md:text-base"
        title={title}
      />
      <div
        className={
          className + ' px-auto mb-10 text-zinc-700	max-w-[680px] max-md:px-0 '
        }
      >
        {children}
      </div>
    </div>
  );
}
