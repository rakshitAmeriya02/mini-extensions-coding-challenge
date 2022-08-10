import Login from "src/components/Login";
import { useAppSelector } from "src/store/hooks";
import Header from "src/components/Header";
import Loader from "src/ui-core/Loader";

const withLayout = (
  WrappedComponent: React.ComponentType<{ isLoggedIn: boolean }>
) => {
  return () => {
    const isLoggedIn = useAppSelector((state) => state.isLoggedIn);
    const isLoading = useAppSelector((state) => state.isLoading);
    return (
      <div className="layout">
        {isLoading && <Loader />}
        {isLoggedIn && <Header />}
        <div className="component-wrapper">
          {isLoggedIn ? (
            <WrappedComponent isLoggedIn={isLoggedIn} />
          ) : (
            <Login />
          )}
        </div>
      </div>
    );
  };
};

export default withLayout;
