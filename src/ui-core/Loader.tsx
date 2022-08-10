import { useAppSelector } from "src/store/hooks";

const Loader = () => {
  const isLoading = useAppSelector((state) => state.isLoading);
  if (!isLoading) {
    return null;
  }
  return (
    <div className="loader-wrapper">
      <div>
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Loader;
