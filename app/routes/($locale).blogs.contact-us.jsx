import Title from '../components/Blogs/Title';

export const meta = ({data}) => {
  return [{title: 'Contact'}];
};

export default function Product() {
  return (
    <>
      <div className="px-[80px] flex flex-col flex-nowrap justify-center text-center items-center max-md:px-[1%]">
        <Title
          className=" text-center font-title my-[50px] uppercase "
          title="Contact"
        />
        <div className="mx-[22%] mb-10 max-w-[680px] flex flex-col justify-center items-center max-md: max-w-full mx-[1%]">
          <div className="mb-5 w-full flex flex-row justify-center gap-4 max-md:flex-col ">
            <input
              placeholder="Your name"
              className="w-[330px] max-md:w-full"
            />
            <input
              placeholder="Your email"
              className="w-[330px] max-md:w-[300px]"
            />
          </div>
          <textarea
            name="message"
            className="w-full max-h-[180px] focus:shadow-none focus:shadow-[#2f2f2f] focus:border-[#2f2f2f] max-md:max-w-full"
            rows="10"
            cols="20"
            placeholder="Your message"
          />
          <button
            type="button"
            className="w-full my-5 text-semibold p-2 text-white bg-[#2f2f2f]"
          >
            {' '}
            SEND MESSAGE
          </button>
        </div>
      </div>
    </>
  );
}
