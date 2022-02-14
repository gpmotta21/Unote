import styled from "styled-components";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import InUser from "./InUser";
import Switch from "@mui/material/Switch";
import { i } from "../../assets/icons";
import { devices } from "../../assets/devices";
import Logo from "../../assets/img/Logo.svg";
import { StyledCircularProgress } from "../Homepage/Register";

function Navbar({ setTheme, theme }) {
  const UserReducer = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (UserReducer.loading) {
  }
  const content = () => {
    if (UserReducer.page == "Home" && !token) {
      return (
        <>
          <Link
            style={{ cursor: "pointer" }}
            activeClass="active"
            className="btn"
            type="submit"
            value="Test 2"
            to="login"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            Start now{i.click}
          </Link>
          <div>
            <span>Theme</span>
            <Switch
              defaultChecked={theme == "dark"}
              size="small"
              color={theme == "light" ? "warning" : "secondary"}
              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            />
          </div>
        </>
      );
    } else if (UserReducer.user && UserReducer.page == "User") {
      return <InUser setTheme={setTheme} theme={theme} />;
    } else if (UserReducer.page == "Home" && token) {
      return (
        <>
          <button onClick={() => navigate("/userarea")}>Go to my Notes</button>
          <div>
            <span>Theme</span>
            <Switch
              defaultChecked={theme == "dark"}
              size="small"
              color={theme == "light" ? "warning" : "secondary"}
              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            />
          </div>
        </>
      );
    }
  };
  return (
    <StyledNavbar>
      <div>
        <img src={Logo} onClick={() => navigate("/")} style={{ marginLeft: "20px" }} />
      </div>
      <StyledProfileArea>
        {UserReducer.loadingAccount ? <StyledCircularProgress color="success" /> : content()}
      </StyledProfileArea>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.navbar};

  * {
    font-family: "Alata", sans-serif;
  }

  img {
    max-width: 80%;
    height: auto;
    cursor: pointer;
  }
`;

const StyledProfileArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 3%;
  height: 85%;
  width: 30%;
  margin-left: auto;
  color: ${(props) => props.theme.color};
  padding: 0 10px;
  font-size: 24px;
  text-align: center;

  button {
    max-width: 200px;
    height: auto;
    padding: 5px 20px;
    background: ${(props) => props.theme.bG};
    color: ${(props) => props.theme.color};
    border: 2px solid ${(props) => props.theme.color};
    border-radius: 10px;
    font-size: 14px;
    transition: all 0.5s;
  }

  button:hover {
    transform: scale(1.02);
  }

  @media ${devices.mobile} {
    width: 50%;
    font-size: 20px;
  }
  @media ${devices.mobile} {
    font-size: 16px;
  }
`;
export default Navbar;
