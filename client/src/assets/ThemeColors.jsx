import profileBgLight from "../assets/img/profileWindowBg.svg";
import profileBgDark from "../assets/img/profileWindowDarkBg.svg";
import loginDark from "../assets/img/loginDark.svg";
import loginLight from "../assets/img/loginLight.svg";
import registerLight from "../assets/img/registerLigh.svg";
import registerDark from "../assets/img/registerDark.svg";
import homeDark from "../assets/img/homeDark.svg";
import homeLight from "../assets/img/homeLight.svg";

import { imgList } from "./imgList";

export const themeColors = {
  dark: {
    bG: "#22223B",
    navbar: "#6C63FF",
    secondary: "#E63946",
    color: "#F1FAEE",
    profileWindowBg: profileBgDark,
    features: imgList.featuresDark,
    register: registerDark,
    login: loginDark,
    home: homeDark,
  },
  light: {
    bG: "#F1FAEE",
    navbar: "#E63946",
    secondary: "#6C63FF",
    color: "#22223B",
    profileWindowBg: profileBgLight,
    features: imgList.featuresLight,
    register: registerLight,
    login: loginLight,
    home: homeLight,
  },
};
