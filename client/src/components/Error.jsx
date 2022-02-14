import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LogoutUser } from "../redux/Actions/UserActions";
import { useNavigate } from "react-router";
import { StyledButton } from "./Navbar/InUser";

export function Error() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(LogoutUser());
  }, []);

  return (
    <StyledError>
      <div>Woops!, page not found :(</div>
      <StyledButton onClick={() => navigate("/")}>Click here to go to the homepage</StyledButton>
    </StyledError>
  );
}

const StyledError = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div{
    color: ${props => props.theme.color};
  }
`;

export default Error;
