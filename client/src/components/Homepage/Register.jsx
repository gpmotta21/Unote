import styled from "styled-components";
import TextField from "@mui/material/TextField";
import * as APIS from "../../redux/apis";
import { useTransition, animated } from "react-spring";
import CircularProgress from "@mui/material/CircularProgress";
import { StyledButton } from "../Navbar/InUser";

import { useEffect, useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repeat, setRepeat] = useState("");
  const [response, setResponse] = useState({
    success: false,
    errors: { userError: false, emailError: false, passwordError: false, repeatError: false },
  });
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await APIS.REGISTER_URL({ username: username, password: password, email: email, repeat: repeat });
    setLoading(false);
    setResponse(data);
    setFocus(true)
  };

  useEffect(() => (response.message ? setMessage(true) : false), [response]);

  const transition = useTransition(message, {
    from: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
  });

  if(message){
    setTimeout(() => {
      setMessage(false)
    }, 4500)
  }

  return (
    <StyledRegister focus={focus}>
      <h1>Start for free</h1>
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <MyTextField
          onChange={(e) => setUsername(e.target.value)}
          colorP={response.errors.userError == undefined ? "green" : false}
          label="Username"
          helperText={response.errors.userError ? response.errors.userError.msg : false}
          error={response.errors.userError ? true : false}
          focused={response.errors.userError == undefined ? true : undefined}
          color={response.errors.userError == undefined ? "success" : false}
          autoComplete="off"
          style={{ width: "80%" }}
          id="outlined-multiline-flexible"
          variant="filled"
        />
        <MyTextField
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          colorP={response.errors.emailError == undefined ? "green" : false}
          helperText={response.errors.emailError ? response.errors.emailError.msg : false}
          error={response.errors.emailError ? true : false}
          focused={response.errors.emailError == undefined ? true : undefined}
          color={response.errors.emailError == undefined ? "success" : false}
          autoComplete="off"
          style={{ width: "80%" }}
          id="outlined-multiline-flexible"
          variant="filled"
        />
        <MyTextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          colorP={response.errors.passwordError == undefined ? "green" : false}
          helperText={response.errors.passwordError ? response.errors.passwordError.msg : false}
          error={response.errors.passwordError ? true : false}
          focused={response.errors.passwordError == undefined ? true : undefined}
          color={response.errors.passwordError == undefined ? "success" : false}
          autoComplete="off"
          style={{ width: "80%" }}
          id="filled-size-normal"
          type={"password"}
          variant="filled"
        />
        <MyTextField
          onChange={(e) => setRepeat(e.target.value)}
          label="Repeat Password"
          colorP={response.errors.repeatError == undefined ? "green" : false}
          helperText={response.errors.repeatError ? response.errors.repeatError.msg : false}
          error={response.errors.repeatError ? true : false}
          focused={response.errors.repeatError == undefined ? true : undefined}
          color={response.errors.repeatError == undefined ? "success" : false}
          autoComplete="off"
          style={{ width: "80%" }}
          id="filled-size-normal"
          type={"password"}
          variant="filled"
        />
        {loading ? (
          <StyledCircularProgress />
        ) : (
          <StyledButton type="submit" variant="contained">
            Register
          </StyledButton>
        )}
        {transition((style, item) =>
          item ? (
            <AnimatedMessage style={style}>
              Welcome to Noter
            </AnimatedMessage>
          ) : (
            ""
          )
        )}
      </form>
    </StyledRegister>
  );
}

export const MyTextField = styled(TextField)`
  & * {
    font-family: "Nunito", sans-serif !important;
    overflow: hidden;
  }
  & input:valid + fieldset {
    z-index: 0;
  }
  & .MuiInputBase-input {
    background: ${(props) => props.theme.color};
    color: ${(props) => props.theme.bG};
    border-radius: 4px;
  }
  & .MuiFormHelperText-root {
    text-align: center;
    color: ${(props) => props.theme.color} !important;
    border-radius: 4px;
  }

  & label {
    color: ${(props) => (props.colorP ? props.colorP : props.theme.bG)};
  }
`;

export const StyledRegister = styled.div`
  position: relative;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  background-size: cover;
  background-position: center left;
  background-color: ${(props) => props.theme.navbar};
  border-radius: 0 20px 20px 0;

  h1 {
    color: ${(props) => props.theme.color};
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    width: 85%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 80%;
    border-radius: 0 0 5px 5px;
    transition: all 0.5s;
    cursor: pointer;
    border-radius: 20px;
  }

  @media (max-width: 800px) {
    width: 100%;
    height: 60%;
    border-radius: 0;

    form{
    height: 90%;
    
    }

  }
`;

export const StyledCircularProgress = styled(CircularProgress)`
&&{
  color: ${props => props.theme.color};
}
`

const AnimatedMessage = styled(animated.div)`
  position: absolute;
  top: 110%;
  background: ${props => props.theme.navbar};
  border-radius: 5px;
  border: solid green 2px;
  color: ${props => props.theme.color};
  padding: 10px;
`

export default Register;
