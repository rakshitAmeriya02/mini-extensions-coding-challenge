import { useState } from "react";
import { handleLogin } from "src/store/appReducer";
import { useAppDispatch } from "src/store/hooks";
import { TEXT } from "src/utils/constant";

const Login = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const handleClick = () => dispatch(handleLogin(name));
  return (
    <div className="login">
      <div>
        <label>{TEXT.STUDENT_NAME}: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button disabled={name.trim().length === 0} onClick={handleClick}>
        {TEXT.LOGIN}
      </button>
    </div>
  );
};

export default Login;
