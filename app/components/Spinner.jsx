function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner__container">
        <div className="spinner__lds-dual-ring"></div>
        <div className="spinner__text">Loading...</div>
      </div>
    </div>
  );
}

export default Spinner;
