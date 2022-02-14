import { Route, Routes, useLocation } from "react-router";
import styled, { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "styled-components";

import Homepage from "./components/Homepage/Homepage";
import UserArea from "./components/UserArea";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Error from "./components/Error";
import { themeColors } from "./assets/ThemeColors.jsx";
import { useEffect, useState } from "react";

function App() {
  const storedTheme = localStorage.getItem("theme") ?? "light";
  const [theme, setTheme] = useState(storedTheme);
  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  const location = useLocation();

  return (
    <ThemeProvider theme={theme == "light" ? themeColors.light : themeColors.dark}>
      <StyledApp>
        <GlobalStyle />
        <Navbar setTheme={setTheme} theme={theme} />
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path="userarea" element={<UserArea />} />
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle`

:root{
  --white: #f1faee;
  --black: #22223b;
  --aqua: #06d6a0;
  --red: #E63946;
  --purple: #6C63FF;
}

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: 'Supermercado One', cursive;

  // ScrollBar setting
  ::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
   background: ${props => props.theme.bG};
}

::-webkit-scrollbar-thumb {
  background: ${props => props.theme.secondary};
}

}

button, i{
  cursor: pointer;
}

body{
  width: 100%;
  background: ${(props) => props.theme.bG};
  }
`;

export default App;
