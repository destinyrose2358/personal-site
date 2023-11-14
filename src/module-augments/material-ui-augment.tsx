import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme, BoxProps, PaletteColor } from "@mui/material";

declare module "@mui/material" {

    export interface TypeBackground {
        expandedButton: string;
    }

    // inserts new component overrides
    interface ComponentsPropsList {
        SBox: BoxProps;
    }

    export interface SBoxClasses {
        /** Styles applied to the root element. */
        root: string;
    }

    export type SBoxClassKey = keyof SBoxClasses;

    interface ComponentNameToClassKey {
        SBox: SBoxClassKey;
    }

    interface Components {
        SBox?: {
            defaultProps?: ComponentsProps["SBox"];
            styleOverrides?: ComponentsOverrides<Theme>["SBox"];
            variants?: ComponentsVariants['SBox'];
        }
    }

     interface PaperPropsVariantOverrides {
        main: true;
    }

    interface TypographyPropsVariantOverrides {
        info: true;
    }

    export interface TypeGradient {
        color: string;
        position: number;
    }

    export interface TypeBorder {
        gradient: TypeGradient[];
    }

    export interface TypeImg {
        border: TypeBorder;
    }

    export interface TypeImgModes {
        light: TypeImg;
        dark: TypeImg;
    }

    export interface ImgModesPartial {
        light?: Partial<TypeImg>;
        dark?: Partial<TypeImg>;
    }

    interface Palette {
        img: TypeImgModes;
    }

    interface PaletteOptions {
        img?: ImgModesPartial;
    }
}
