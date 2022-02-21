import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { StyledButton } from "./Navbar/InUser";
import { logout } from "../redux/userSlice";

export function Error() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
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

  div {
    margin-bottom: 15px;
    color: ${(props) => props.theme.color};
  }
`;

export default Error;
