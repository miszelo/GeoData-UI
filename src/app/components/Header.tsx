import { FC } from "react";
import { HeaderContainer } from "../styled/HeaderContainer";

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <a>GeoData</a>
      <a>O nas</a>
    </HeaderContainer>
  );
};
