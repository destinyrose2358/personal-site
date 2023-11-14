import PageRoutes from "./components/pages/page-routes";
import { ColorModeContext } from "./contexts/color-mode-context";
import {
    PaletteMode,
    PaletteOptions,
    Paper,
    PaperProps,
    ThemeOptions,
    ThemeProvider,
    createTheme,
    darken,
    lighten,
    styled,
    LinkProps,
    ButtonProps
} from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import UIHeader from "./components/ui-header";
import { blue, green, grey, lime, orange, purple, red, yellow } from "@mui/material/colors";
import NavBar from "./components/navbar";
import SLink from "./components/custom-material-ui/links/s-link";
import SRoot from "./components/custom-material-ui/boxes/s-root";
import SBox from "./components/custom-material-ui/boxes/s-box";

const getDesignTokens: (mode: PaletteMode) => { palette: Partial<PaletteOptions> } = (mode: PaletteMode) => ({
    palette: {
        mode,
        img: {
            light: {
                border: {
                    gradient: [
                        {
                            color: yellow[100],
                            position: 45
                        },
                        {
                            color: yellow[900],
                            position: 50
                        },
                        {
                            color: yellow[100],
                            position: 55
                        }
                    ]
                }
            },
            dark: {
                border: {
                    gradient: [
                        {
                            color: grey[300],
                            position: 0
                        },
                        {
                            color: grey[800],
                            position: 74
                        }
                    ]
                }
            }
        },
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: blue,
                secondary: green,
                divider: green[500],
                text: {
                    primary: grey[900],
                    secondary: blue[800]
                },
                background: {
                    paper: orange[300],
                    default: green[200],
                    expandedButton: green[100]
                },
                info: {
                    main: lime[900]
                }
            }
            : {
                // palette values for dark mode
                primary: green,
                divider: red[700],
                background: {
                    paper: darken(red[800], 0.4),
                    default: darken(purple[900], 0),
                    expandedButton: purple[200]
                },
                text: {
                    primary: lime[50],
                    secondary: red[200],
                },
                info: {
                    main: red[100]
                }
            }
        ),
    },
});

const customStyling: ThemeOptions = {
    components: {
        MuiLink: {
            defaultProps: {
                underline: "none"
            } as LinkProps,
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: "4px",
                    transition: "color .5s, background-color .5s",
                    color: theme.palette.text.secondary,
                    "&:hover": {
                        color: theme.palette.mode === "light" ? lighten(theme.palette.text.secondary, 0.25) : darken(theme.palette.text.secondary, 0.25)
                    }
                })
            },
            variants: [
                {
                    props: { variant: "button" },
                    style: ({ theme }) => ({
                        borderRadius: 2,
                        textWrap: "nowrap",
                        textAlign: "center",
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.secondary.main,
                        "&:hover": {
                            color: theme.palette.mode === "light" ? lighten(theme.palette.text.primary, 0.25) : darken(theme.palette.text.primary, 0.25),
                            backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary.dark : theme.palette.secondary.light
                        }
                    })
                }
            ]
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: SLink
            } as ButtonProps
        },
        MuiContainer: {
            defaultProps: {
                disableGutters: true
            },
            styleOverrides: {
                root: {
                    transition: "background-color .5s",
                    "::-webkit-scollbar": {
                        width: "20px"
                    }
                },
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    transition: "background-color .5s"
                }
            },
            variants: [
                {
                    props: { variant: "main" },
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexGrow: 1,
                        padding: "10px"
                    }
                }
            ]
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    transition: "color .5s"
                }
            },
            variants: [
                {
                    props: { variant: "info" },
                    style: ({ theme }) => ({
                        color: theme.palette.info.main,
                    })
                }
            ]
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    transition: "background-color .5s"
                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: ({ theme }) => ({
                    transition: "background-color .5s",
                    "&.Mui-expanded": {
                        backgroundColor: theme.palette.mode === "light" ? darken(theme.palette.background.expandedButton, 0.1) : lighten(theme.palette.background.expandedButton, 0.1)
                    },
                    "&:hover": {
                        backgroundColor: theme.palette.background.expandedButton
                    }
                })
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    transition: "color .5s, font-size .5s"
                }
            }
        }
    }
}

const CollapsingBox = styled(Paper)<PaperProps & {open: boolean}>(({ open, theme }) => ({
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "100%",
    flexShrink: 0,
    transition: "max-width .75s, flex-grow .75s, background-color .5s",
    boxShadow: `3px 0px 4px 1px ${theme.palette.divider}`,
    zIndex: 100,
    ...open ? {} : {
        maxWidth: "0%",
        flexGrow: 0
    }
}));

export default function App(): JSX.Element {
    const { colorMode } = useContext(ColorModeContext);
    
    const theme = useMemo(() => {
        return createTheme(getDesignTokens(colorMode), customStyling)
    }, [
        colorMode
    ]);

    const [open, setOpen] = useState(false);
    const handleDrawerOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, [

    ]);

    return (
        <ThemeProvider theme={theme}>
            <SBox
                style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh"
                }}
            >
                <CollapsingBox open={open}>
                    <NavBar />
                </CollapsingBox>
                <SBox
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        minWidth: "100px"
                    }}
                >
                    <UIHeader handleDrawerOpen={handleDrawerOpen} />
                    <SRoot>
                        <PageRoutes />
                    </SRoot>
                </SBox>
            </SBox>
        </ThemeProvider>
    )
}
