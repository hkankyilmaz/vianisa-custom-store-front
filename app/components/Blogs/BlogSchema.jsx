export default function BlogSchema({
  title,
  children,
  classNames = {
    title: '',
    body: '',
  },
}) {
  return (
    <div className="px-6 sm:px-[50px] flex flex-col items-center mb-20">
      <div
        className={`block w-full text-center my-[35px] sm:my-[50px] font-optima text-[16px] uppercase tracking-[.2em] ${classNames.title}`}
      >
        <h1>{title}</h1>
      </div>
      <div
        className={`w-full max-w-[1000px] text-[var(--blog-text-color)] font-body flex flex-col ${classNames.body}`}
      >
        {children}
      </div>
    </div>
  );
}
