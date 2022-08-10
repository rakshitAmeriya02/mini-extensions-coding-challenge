import { actions } from "src/store/appReducer";
import { useAppDispatch } from "src/store/hooks";

const Header = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(actions.logout());
  return (
    <div className="header">
      <button onClick={handleClick}>{"Logout"}</button>
    </div>
  );
};

export default Header;
