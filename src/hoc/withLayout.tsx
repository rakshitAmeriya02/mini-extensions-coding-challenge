import Login from "src/components/Login";
import { useAppSelector } from "src/store/hooks";
import Header from "src/components/Header";
import Loader from "src/ui-core/Loader";

const withLayout = (
  WrappedComponent: React.ComponentType<{ isLoggedIn: boolean }>
) => {
  return () => {
    const isLoggedIn = useAppSelector((state) => state.isLoggedIn);
    return (
      <div className="layout">
        <Loader />
        {isLoggedIn && <Header />}
        {isLoggedIn ? <WrappedComponent isLoggedIn={isLoggedIn} /> : <Login />}
      </div>
    );
  };
};

export default withLayout;
