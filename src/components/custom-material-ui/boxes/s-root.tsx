import { PropsWithChildren, useContext, useMemo } from "react";
import SBox from "./s-box";
import { BoxProps, Container } from "@mui/material";
import darkModeBackground from "../../../images/dark_mode_background.png";
import lightModeBackground from "../../../images/light_mode_background.png";
import { ColorModeContext } from "../../../contexts/color-mode-context";

export default function SRoot(props: PropsWithChildren<BoxProps>): JSX.Element {
    const {children, ...others} = props;
    const colorMode = useContext(ColorModeContext);

    const currentImage = useMemo(() => {
        if (colorMode.colorMode === "dark") {
            return darkModeBackground;
        } else return lightModeBackground
    }, [
        colorMode
    ]);

    return <SBox sx={{
        backgroundColor: "transparent",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        overflow: "hidden",
        flexGrow: 1,
        "&>*": {
            gridRow: 1,
            gridColumn: 1,
        }
    }} {...others}>
        <SBox
            sx={{
                backgroundColor: "transparent",
                backgroundImage: `url(${currentImage})`,
                backgroundSize: "400px",
                transition: "background .5s",
                filter: `sepia(100%) hue-rotate(${colorMode.colorMode === "light" ? 120 : -30}deg)`,
                animation: "rootSlide linear 10s infinite"
            }}
        />
        <SBox
            style={{
                overflow: "auto",
                backgroundColor: "transparent",
                zIndex: 1000,
                display: "flex"
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Container>
        </SBox>
    </SBox>
}
