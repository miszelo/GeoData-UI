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
      <Logo src={"/PK_SYGNET_RGB.png"} height={"50vh"} />
      <TitleSection>
        <HeaderText href={"#Map"}>Mapa</HeaderText>
        <HeaderText href={"#Chart"}>Wykres</HeaderText>
        <HeaderText href={"#About"}>O projekcie</HeaderText>
      </TitleSection>
    </HeaderContainer>
  );
};
