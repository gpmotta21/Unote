import { useNavigate } from "react-router";
import styled from "styled-components";
import { devices } from "../assets/devices";
import { i } from "../assets/icons";


function Footer() {

  return <StyledFooter>
    <StyledLink href="https://www.linkedin.com/in/gpmotta21/" target='_blank'>
      {i.linkedin}
      <span>gpmotta21</span>
    </StyledLink>
    <StyledLink href="https://github.com/gpmotta21/Unote" target='_blank'>
      {i.github}
      <span>gpmotta21</span>
    </StyledLink>
  </StyledFooter>;
}

const StyledFooter = styled.div`
display: flex;
justify-content: space-between;


  width: 100%;
  height: 60px;

*{
  color: ${props => props.theme.navbar};
}
`;

const StyledLink = styled.a`
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

*{
  font-size: 30px;
}
  

  span {
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s;
    font-size: 14px;
  }
  :hover span {
    max-height: 30px;
  }

  @media ${devices.mobile} {
    span {
      max-height: 30px;
    }
  }
`

export default Footer;
