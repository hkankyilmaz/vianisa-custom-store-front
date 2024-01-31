import spinner from '~/assets/gifs/spinner.gif';
function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner__container">
        {/* <div className="spinner__lds-dual-ring"></div> */}
        <img
          className="spinner-gif"
          src={spinner}
          alt="spinner"
          width={66}
          height={66}
        />
        <div className="spinner__text font-avenir-medium">Loading...</div>
      </div>
    </div>
  );
}

export default Spinner;
