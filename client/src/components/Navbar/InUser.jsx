import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { i } from "../../assets/icons.js";
import { DeleteAccount, LogoutUser } from "../../redux/Actions/UserActions.js";
import { useTransition, animated } from "react-spring";
import { useState } from "react";
import user from "../../assets/img/user.png";
import Button from "@mui/material/Button";
import { devices } from "../../assets/devices.js";
import Switch from "@mui/material/Switch";

function InUser({ setTheme, theme }) {
  const [showInfo, setShowInfo] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const dispatch = useDispatch();
  const UserReducer = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogoutUser());
    navigate("/");
  };

  const deleteTransition = useTransition(confirmDel, {
    from: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1, transform: "translate(-50%, -50%)" },
    leave: { x: 100, opacity: 0 },
  });

  const deleteAccount = () => {
    navigate("/");
    dispatch(DeleteAccount(UserReducer.user._id));
  };

  const profileTransition = useTransition(showInfo, {
    from: { x: 100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
  });

  return (
    <>
      <OutHover>
        <OutHoverUser onClick={() => setShowInfo(true)} onMouseEnter={() => setShowInfo(true)}>
          <span>{i.user}</span>
          <span>{UserReducer.user.username}</span>
          <span>{i.logout}</span>
        </OutHoverUser>
        <div>
          <Switch
            defaultChecked={theme == "dark"}
            size="small"
            color={theme == "light" ? "warning" : "secondary"}
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
          />
          <span>Theme</span>
        </div>
      </OutHover>
      {profileTransition((style, item) =>
        item ? (
          <AnimatedProfile style={style} onMouseLeave={() => setShowInfo(false)}>
            <i onClick={() => setShowInfo(false)}>{i.close}</i>
            <ProfileImg>
              <img src={user} />
              <div>{UserReducer.user.username}</div>
            </ProfileImg>
            <ProfileInfo>
              <div>{UserReducer.user.email}</div>
              <span>Total notes: {UserReducer.notes.length}</span>
            </ProfileInfo>
            <div>
              <StyledButton onClick={logout} endIcon={i.logout}>
                Logout
              </StyledButton>
              <StyledButton
                onClick={() => {
                  setConfirmDel(true);
                  setShowInfo(false);
                }}
                endIcon={i.trash}
              >
                Delete
              </StyledButton>
            </div>
          </AnimatedProfile>
        ) : (
          ""
        )
      )}
      {deleteTransition((style, item) =>
        item ? (
          <ConfirmDel style={style}>
            <div>Are you sure you want to Delete your account ?</div>
            <div style={style}>
              <ConfirmDelBtn onClick={() => setConfirmDel(false)} endIcon={i.logout}>
                No, I want to stay
              </ConfirmDelBtn>
              <ConfirmDelBtn onClick={deleteAccount} endIcon={i.trash}>
                Yes
              </ConfirmDelBtn>
            </div>
          </ConfirmDel>
        ) : (
          ""
        )
      )}
    </>
  );
}

export default InUser;

const OutHover = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  z-index: 2;
  font-size: 20px;
  overflow: hidden;
  cursor: pointer;

  @media ${devices.tablet} {
    flex-direction: column;
  }
  @media ${devices.mobile} {
    font-size: 16px;
  }
`;

const OutHoverUser = styled.div`
  word-wrap: break-word;
  word-break: break-all;
  border-bottom: solid 1px ${(props) => props.theme.color};

  span:nth-child(2) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const AnimatedProfile = styled(animated.div)`
  height: 436px;
  width: 388px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding: 10px;
  border-radius: 0 0 5px 5px;
  background-image: url(${(props) => props.theme.profileWindowBg});
  background-color: ${props => props.theme.bG};

  i {
    position: absolute;
    left: 5%;
    top: 5%;
    height: 8%;
    font-size: 24px;
    cursor: pointer;
  }

  div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20%;
  }

  @media ${devices.mobile} {
    width: 100%;
    height: 70%;
    background-size: cover;
    background-position: bottom;
  }
`;

const ProfileImg = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  font-size: 24px;

  img {
    width: 200px;
    border: solid 4px ${(props) => props.theme.navbar};
    border-radius: 50%;
  }

  div {
    border-bottom: 2px solid #ffb703;
    width: auto;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  height: 20%;
  border-bottom: 2px solid ${(props) => props.theme.color};
  font-size: 20px;
  overflow: auto;
`;

export const StyledButton = styled(Button)`
  && {
    font-family: "Nunito", sans-serif !important;
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.bG};
    border: solid 2px ${(props) => props.theme.bG};
    transition: all.5s;
  }

  &&:hover {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.bG};
    transform: scale(1.05);
  }
`;

const ConfirmDel = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  gap: 5%;
  left: 50%;
  top: 50%;
  width: 50%;
  height: 300px;
  padding: 15px;
  text-align: center;
  background: #06d6a0;
  border-radius: 8px;
  border: 2px solid #d7e3fc;
  z-index: 3;

  div:last-child {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5%;
  }

  @media ${devices.mobile} {
    width: 85%;
  }
`;

const ConfirmDelBtn = styled(Button)`
  && {
    height: 50px;
    background: #023047;
    color: white;
    font-weight: 900;
    border: #023047 solid 2px;
  }

  &&:hover {
    background: #023047;
    transform: scale(1.05);
  }
`;
