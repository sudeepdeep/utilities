function Loader() {
  return (
    <div className="spinner-item">
      <div className="spinner-grid-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* <div className="spinner-label">Grid</div> */}
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="spinner-item">
      <div className="skeleton"></div>
    </div>
  );
}
export default Loader;
