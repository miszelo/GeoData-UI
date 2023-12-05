import {FC} from "react";
import {FooterContainer} from "./FooterContainer";
import {Logo} from "../header/HeaderStyles";

export const Footer: FC = () => {
    return (
        <FooterContainer>
            <Logo/>
        </FooterContainer>
    );
};
