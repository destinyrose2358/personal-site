import { BoxProps, useTheme } from "@mui/material";
import { useMemo } from "react";
import SBox from "./boxes/s-box";

type SGradientImageProps = {
    borderThickness?: number;
    borderRadius?: number;
    borderRadiusUnit?: "px" | "%";
    alt: string;
    src: string;
}

export default function SGradientImage(props: BoxProps & SGradientImageProps): JSX.Element {
    const { borderRadius = 0, borderRadiusUnit = "px", borderThickness = 4, ...imageProps } = props;
    const theme = useTheme();
    const [generatedOuterLightStyling, generatedOuterDarkStyling] = useMemo(() => {
        const baseStyling = {
            borderRadius: `${borderRadius}${borderRadiusUnit}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "opacity .5s",
            height: "100%",
            width: "100%"
        }
        return [
            {
                ...baseStyling,
                background: `linear-gradient(to top right, ${theme.palette.img.light.border.gradient.map((gradient) => `${gradient.color} ${gradient.position}%`).join(", ")})`,
                opacity: theme.palette.mode === "light" ? 1 : 0
            },
            {
                ...baseStyling,
                background: `linear-gradient(to top right, ${theme.palette.img.dark.border.gradient.map((gradient) => `${gradient.color} ${gradient.position}%`).join(", ")})`,
                opacity: theme.palette.mode === "light" ? 0 : 1
            }
        ]
    }, [borderRadius, borderRadiusUnit, theme.palette.img.dark.border.gradient, theme.palette.img.light.border.gradient, theme.palette.mode])

    const generatedInnerStyling = useMemo(() => {
        let adjustedBorderRadius = borderRadius - borderThickness
        switch (borderRadiusUnit) {
            case "%":
                adjustedBorderRadius = borderRadius;
                break;
            default:
                break;
        }

        return {
            borderRadius: `${adjustedBorderRadius}${borderRadiusUnit}`,
            margin: `${borderThickness}px`,
            zIndex: 1000,
            width: `calc(100% - ${2*borderThickness}px)`,
            minWidth: "300px"
        }
    }, [borderRadius, borderRadiusUnit, borderThickness]);

    return <SBox
        sx={{
            background: "transparent",
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr",
            "& *": {
                gridColumn: 1,
                gridRow: 1
            }
        }}
    >
        <SBox
            sx={generatedOuterLightStyling}
        />
        <SBox
            sx={generatedOuterDarkStyling}
        />
        <SBox
            sx={generatedInnerStyling}
            component="img"
            {...imageProps}
        />
    </SBox>
}
