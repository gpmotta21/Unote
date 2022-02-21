import styled from "styled-components";
import { MyTextField, StyledCircularProgress } from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../Navbar/InUser";
import { StyledRegister } from "./Register";
import { resetAuth, tryAuth } from "../../redux/authSlice";
import { fetchAll } from "../../redux/userSlice";

function Login({ className }) {
  const { auth } = useSelector((state) => state);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(tryAuth({ username: username, password: password }));
  };

  useEffect(() => {
    if (auth.response.access) {
      const config = {
        headers: {
          Authorization: auth.response.access,
        },
      };

      navigate("/userarea");
      localStorage.setItem("token", auth.response.access);

      dispatch(fetchAll(config)).then(() => {
        dispatch(resetAuth());
      });
    }
  }, [auth]);

  return (
    <StyledLogin className={className}>
      <h1 className="header">Go to your notes</h1>
      <form onSubmit={(e) => handleClick(e)}>
        <MyTextField
          onChange={(e) => setUsername(e.target.value)}
          colorP={auth.response.userError !== undefined ? "green" : false}
          error={auth.response.userError ? true : false}
          helperText={auth.response.userError ? auth.response.userError : false}
          focused={auth.response.userError == undefined ? undefined : true}
          color={auth.response.userError == undefined ? false : "success"}
          autoComplete="off"
          style={{ width: "80%" }}
          id="filled-size-normal"
          label="Username"
          variant="filled"
        />
        <MyTextField
          onChange={(e) => setPassword(e.target.value)}
          error={auth.response.passwordError ? true : false}
          helperText={auth.response.passwordError ? auth.response.passwordError : false}
          autoComplete="off"
          style={{ width: "80%" }}
          id="filled-size-normal"
          label="Password"
          variant="filled"
          type="password"
        />
        {auth.isLoading ? (
          <StyledCircularProgress />
        ) : (
          <StyledButton type="submit" variant="contained">
            Login
          </StyledButton>
        )}
      </form>
    </StyledLogin>
  );
}

const StyledLogin = styled(StyledRegister)`
  background-position: center right;
  background-size: cover;
  border-radius: 20px 0 0 20px;
  position: relative;

  :after {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 70%;
    background: ${(props) => props.theme.color};
    z-index: 3;
  }

  form {
    border-radius: 0 !important;
  }

  @media (max-width: 800px) {
    height: 38% !important;
    border-radius: 0;

    :after {
      content: none;
    }
  }
`;

export default Login;
