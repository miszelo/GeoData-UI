import styled from "styled-components";

const mobileBreakpoint = "768px";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.5rem;
  background-color: #ffffff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 2px 5px #003571;
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const HeaderText = styled.a`
  color: #003571;
  font-size: 1rem;
  white-space: nowrap;
  text-decoration: none;
  font-weight: bold;
`;

export const Logo = styled.img`
  height: 7vh;
  content: url("/PK_WISiE_RGB.png"); 

  @media (max-width: ${mobileBreakpoint}) {
    //height: 8vh;
    content: url("/PK_WISiE_RGB.png");
  }
`;
