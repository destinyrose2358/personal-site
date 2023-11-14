import { Box, BoxProps, styled } from "@mui/material";

const SBox =  styled(Box, {
    name: "SBox",
    slot: "Root",
    overridesResolver: (props, styles) => {
        return styles.root
    }
})<BoxProps>(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    transition: "background-color .5s"
}));

export default SBox;
