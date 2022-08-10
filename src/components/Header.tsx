import { actions } from "src/store/appReducer";
import { useAppDispatch } from "src/store/hooks";
import { TEXT } from "src/utils/constant";

const Header = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(actions.logout());
  return (
    <div className="header">
      <button onClick={handleClick}>{TEXT.LOGOUT}</button>
    </div>
  );
};

export default Header;
