import { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import { imgList } from "../../assets/imgList";
import { devices } from "../../assets/devices";
import Aos from "aos";
import "aos/dist/aos.css";
import { i } from "../../assets/icons";

export const Carousel = () => {
  const [img, setImg] = useState(0);
  const [direction, setDirection] = useState({ from: "", leave: "" });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const next = () => {
    if (img < 2) {
      setImg(img + 1);
      setDirection({ from: 1500, leave: -1500 });
    }
  };

  const back = () => {
    if (img > 0) {
      setImg(img - 1);
      setDirection({ from: -1500, leave: 1500 });
    }
  };

  const transition = useTransition(img, {
    from: { x: direction.from, opacity: 0, position: "absolute" },
    enter: { x: 0, opacity: 1 },
    leave: { x: direction.leave, opacity: 0, position: "absolute" },
    config: {},
  });

  return (
    <CarouselContainer data-aos="fade-up">
      <i onClick={next} style={{ opacity: img == 2 ? "0.2" : "1", pointerEvents: img == 2 ? "none" : "all" }}>
        {i.rArrow}
      </i>
      {transition((style, item) =>
        item == 0 ? (
          <CarouselImgs style={style}>
            <div className="features" />
          </CarouselImgs>
        ) : item == 1 ? (
          <CarouselImgs style={style}>
            <div className="future" />
          </CarouselImgs>
        ) : (
          <CarouselImgs style={style}>
            <div className="about" />
          </CarouselImgs>
        )
      )}
      <i onClick={back} style={{ opacity: img == 0 ? "0.2" : "1", pointerEvents: img == 0 ? "none" : "all" }}>
        {i.lArrow}
      </i>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 750px;
  background-image: url(${(props) => props.theme.features});
  background-size: cover;
  overflow: hidden;

  i {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-size: 60px;
    color: var(--white);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: solid 4px var(--black);
    background: var(--aqua);
    transition: all 0.3s;
  }

  i:hover {
    color: var(--black);
    border: solid 4px var(--white);
  }

  i:first-child {
    top: 50%;
    left: 95%;
  }
  i:last-child {
    top: 50%;
    left: 5%;
  }

  i:active {
    margin-top: 10px;
  }
`;

const CarouselImgs = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .features,
  .future,
  .about {
    height: 100%;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .features {
    background-image: url(${imgList.featuresBgDesktop});
  }
  .future {
    background-image: url(${imgList.futureDesktop});
  }
  .about {
    background-image: url(${imgList.aboutDesktop});
  }

  @media (max-width: 1000px) {
    .features {
      background-image: url(${imgList.featuresBgTablet});
    }
    .future {
      background-image: url(${imgList.futureTablet});
    }
    .about {
      background-image: url(${imgList.aboutTablet});
    }
  }
  @media ${devices.mobile} {
    .features {
      background-image: url(${imgList.featuresBgMobile});
    }
    .future {
      background-image: url(${imgList.futureMobile});
    }
    .about {
      background-image: url(${imgList.aboutMobile});
    }
  }
`;
