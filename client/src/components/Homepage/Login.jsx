import styled from "styled-components";
import { MyTextField, StyledCircularProgress } from "./Register";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { i } from "../../assets/icons";
import { StyledButton } from "../Navbar/InUser";
import { StyledRegister } from "./Register";
import { AuthAction } from "../../redux/Actions/AuthActions";
import CircularProgress from "@mui/material/CircularProgress";

function Login({ className }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Auth = useSelector((s) => s.AuthReducer);
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(AuthAction({ username: username, password: password }, navigate));
  };

  return (
    <StyledLogin className={className}>
      <h1 className="header">Go to your notes</h1>
      <form onSubmit={(e) => handleClick(e)}>
        <MyTextField
          onChange={(e) => setUsername(e.target.value)}
          colorP={Auth.userError == undefined ? "green" : false}
          error={Auth.userError ? true : false}
          helperText={Auth.userError ? Auth.userError : false}
          focused={Auth.userError == undefined ? true : undefined}
          color={Auth.userError == undefined ? "success" : false}
          autoComplete="off"
          style={{ width: "80%" }}
          id="filled-size-normal"
          label="Username"
          variant="filled"
        />
        <MyTextField
          onChange={(e) => setPassword(e.target.value)}
          error={Auth.passwordError ? true : false}
          helperText={Auth.passwordError ? Auth.passwordError : false}
          autoComplete="off"
          style={{ width: "80%" }}
          id="filled-size-normal"
          label="Password"
          variant="filled"
          type="password"
        />
        {Auth.loadingAuth ? (
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
