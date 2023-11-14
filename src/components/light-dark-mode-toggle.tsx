import { useMemo, useContext, useState, useEffect, useCallback } from "react";
import { ColorModeContext } from "../contexts/color-mode-context";
import { Container, darken, lighten, useTheme } from "@mui/material";
import { yellow } from "@mui/material/colors";
import createCirclePath from "./svg/creat-circle-path";

export type LightDarkModeToggleProps = {
    rayCount?: number;
};

type ModeDependentData = {
    main: string;
    rayRotation: number;
    holeScale: number;
    holeRotation: number;
}

const DELAY = 500;

export default function LightDarkModeToggle(props: LightDarkModeToggleProps): JSX.Element {
    const { rayCount = 12 } = props;
    const radius = 200;
    const innerRadius = useMemo(() => (radius * 0.95), [radius])
    const sunRadius = useMemo(() => (radius * 0.7), [radius])
    const diameter = useMemo(() => (2 * radius), [radius]);
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const colors: ModeDependentData = useMemo(() => {
        return {
            isLight: theme.palette.mode === "light",
            ...theme.palette.mode === "light" ? {
                main: yellow[300],
                rayRotation: 0,
                holeScale: 0,
                holeRotation: -30
            } : {
                main: theme.palette.secondary.main,
                rayRotation: 180,
                holeScale: 1,
                holeRotation: 30
            }
        }
    }, [theme]);

    const [holeScaleTransition, setHoleScaleTransition] = useState(colors.holeScale);
    const [isTransitioning, setIsTransitioning] = useState(false);
    useEffect(() => {
        if (!isTransitioning && holeScaleTransition !== colors.holeScale) {
            // animate the sun/moon transition
            setIsTransitioning(true);
            let start: number, previousTimeStamp: number;
            let done = false;
            const decreasing = Math.sign(holeScaleTransition - colors.holeScale) === 1;
            const step = (timeStamp: number) => {
                if (start === undefined) {
                    start = timeStamp
                }
                const elapsed = timeStamp - start;

                if (previousTimeStamp !== timeStamp) {
                    const newHoleScale = decreasing ? Math.max(1 - elapsed / DELAY, 0) : Math.min(elapsed / DELAY, 1);
                    setHoleScaleTransition(newHoleScale);
                    if ((decreasing && newHoleScale === 0) || (!decreasing && newHoleScale === 1)) done = true
                }

                // stop after 2 seconds
                if (elapsed < DELAY) {
                    previousTimeStamp = timeStamp;
                    if (!done) {
                        requestAnimationFrame(step);
                    } else {
                        setIsTransitioning(false);
                    }
                } else {
                    setIsTransitioning(false);
                }
            }

            requestAnimationFrame(step);
        }
    },[holeScaleTransition, colors, isTransitioning]);

    const togglerBodyPath = useMemo(() => {
        return [
            createCirclePath({
                r: sunRadius,
                cx: radius,
                cy: radius,
            }),
            createCirclePath({
                r: holeScaleTransition * (4 * sunRadius / 3),
                clockwise: true,
                cx: radius - (sunRadius / 3),
                cy: radius
            })
        ].join(" ");
    }, [
        holeScaleTransition,
        sunRadius,
        radius
    ]);

    const throttledToggleColorMode = useCallback(() => {
        if (!isTransitioning) colorMode.toggleColorMode()
    }, [isTransitioning, colorMode])

    return (
        <Container
            sx={{
                height: "75px",
                display: "flex",
                width: "auto",
                margin: "unset",
                "& svg": {
                    margin: "5px",
                    transition: "filter .5s, font-size .5s, height .5s, margin .5s",
                    "&:hover": {
                        margin: "3px",
                        "&.light": {
                            filter: "brightness(115%)"
                        },
                        "&.dark": {
                            filter: "brightness(85%)"
                        }
                    }
                }
            }}
        >
            <svg
                className={`color-toggle ${colorMode.colorMode}`}
                viewBox={`-40 0 ${diameter+40} ${diameter}`}
                version="1.1"
                id="svg5"
                xmlns="http://www.w3.org/2000/svg"
                onClick={throttledToggleColorMode}
            >
                <g>
                    {
                        Array.from(Array(rayCount).keys()).map(index => (
                            <g
                                key={index}
                                style={{
                                    transformOrigin: `${radius}px ${radius}px`,
                                    transform: `rotate(${(360 / rayCount) * index}deg)`
                                }}
                            >
                                <g
                                    style={{
                                        transformOrigin: `${radius}px ${radius + innerRadius - 60}px`,
                                        transform: `rotate(${colors.rayRotation}deg)`,
                                        fillOpacity: theme.palette.mode === "light" ? 1 : 0,
                                        strokeOpacity: theme.palette.mode === "light" ? 1 : 0,
                                        transition: "transform 1s, fill-opacity 0.75s ease 0.05s, stroke-opacity 0.75s ease 0.05s"
                                    }}
                                >
                                    <path
                                        style={{
                                            fill: colors.main,
                                            fillOpacity: "inherit",
                                            strokeOpacity: "inherit",
                                            fillRule: "nonzero"
                                        }}
                                        stroke={theme.palette.mode === "light" ? darken(theme.palette.secondary.dark, 0.2) : lighten(theme.palette.secondary.light, 0.2)}
                                        strokeWidth="5px"
                                        id={`ray-path-${index}`}
                                        d="M 0.0,0.0 40,0 20,40 Z"
                                        transform={`translate(${radius - 20},${radius + innerRadius - 40})`}
                                    />
                                </g>
                            </g>
                        ))
                    }
                </g>
                <path
                    d={togglerBodyPath}
                    fill={colors.main}
                    stroke={theme.palette.mode === "light" ? darken(theme.palette.secondary.dark, 0.2) : lighten(theme.palette.secondary.light, 0.2)}
                    strokeWidth="5px"
                    fillRule="evenodd"
                />
            </svg>
        </Container>
    )
}
