import { useRef } from "react";
import { handleLogin } from "src/store/appReducer";
import { useAppDispatch } from "src/store/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const name = useRef<HTMLInputElement | null>(null);
  const handleClick = () => dispatch(handleLogin(name.current?.value || ""));
  return (
    <div className="login">
      <div>
        <label>Student Name: </label>
        <input ref={name} />
      </div>
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Login;
