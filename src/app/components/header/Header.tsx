import { FC } from "react";
import {
  HeaderContainer,
  HeaderText,
  Logo,
  TitleSection,
} from "./HeaderStyles";

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <Logo/>
      <TitleSection>
        <HeaderText href={"#Map"}>Mapa</HeaderText>
        <HeaderText href={"#Chart"}>Wykresy</HeaderText>
      </TitleSection>
    </HeaderContainer>
  );
};
