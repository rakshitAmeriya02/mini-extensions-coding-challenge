import { useRef } from "react";
import { handleLogin } from "src/store/appReducer";
import { useAppDispatch } from "src/store/hooks";
import { TEXT } from "src/utils/constant";

const Login = () => {
  const dispatch = useAppDispatch();
  const name = useRef<HTMLInputElement | null>(null);
  const handleClick = () => dispatch(handleLogin(name.current?.value || ""));
  return (
    <div className="login">
      <div>
        <label>{TEXT.STUDENT_NAME}: </label>
        <input ref={name} />
      </div>
      <button onClick={handleClick}>{TEXT.LOGIN}</button>
    </div>
  );
};

export default Login;
