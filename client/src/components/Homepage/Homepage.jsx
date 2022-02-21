import { AnimatedPages } from "../AnimatedPages";
import styled from "styled-components";
import Ad from "../../assets/img/Ad.svg";
import Aos from "aos";
import "aos/dist/aos.css";
import Login from "./Login";
import Register from "./Register";
import { useEffect } from "react";
import { devices } from "../../assets/devices";
import { Carousel } from "./Carousel";

function Homepage() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const animations = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  return (
    <StyledHomepage animations={animations}>
      <Advertise>
        <div>Create your notes with Unote</div>
        <div>
          <img alt={Ad} src={Ad} />
        </div>
      </Advertise>
      <Carousel />
      <Interaction data-aos="fade-up">
        <Login className="login" />
        <Register />
      </Interaction>
    </StyledHomepage>
  );
}

const StyledHomepage = styled(AnimatedPages)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 2500px;

  * {
    font-family: "Nunito", sans-serif;
    color: ${(props) => props.theme.color};
  }
`;

export const Advertise = styled.div`
  display: flex;
  justify-content: space-around;
  height: 850px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;

  :hover {
    transform: scale(1.02);
  }

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 30%;
    font-size: 70px;
  }

  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
  }

  img {
    max-width: 140%;
    z-index: -2;
    height: auto;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    justify-content: space-around;

    > div:first-child {
      font-size: 55px;
      width: 100%;
    }
    > div:last-child {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }

  @media ${devices.mobile} {
    img {
      max-width: 950px;
    }
  }
`;

const Interaction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 850px;

  > div:first-child {
    background-image: url(${(props) => props.theme.login});
  }

  > div:last-child {
    background-image: url(${(props) => props.theme.register});
  }

  @media (max-width: 800px) {
    gap: 2%;
    flex-direction: column;
  }
`;

export default Homepage;
