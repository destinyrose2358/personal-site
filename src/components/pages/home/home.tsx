import { Container, Paper, Typography } from "@mui/material";
import { KeyboardDoubleArrowDown } from "@mui/icons-material"
import SLink from "../../custom-material-ui/links/s-link";
import { PageData, Pages } from "../pages";
import { useMemo } from "react";
import { reduce } from "lodash";

export default function Home(): JSX.Element {
	const finalLinks = useMemo(() => {
		return reduce<PageData, JSX.Element[]>(Pages.others, (pageRoutes, currentPageData, index) => {
			return [...pageRoutes, <Container
				key={index}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gridGap: "4px",
					"&:hover svg": {
						fontSize: "84px",
						filter: "invert(20%)"
					}
				}}
			>
				<KeyboardDoubleArrowDown
					sx={{
						fontSize: "64px",
						transition: "filter .5s, font-size .5s"
					}}
				/>
				<SLink style={{ fontSize: 20 }} variant="button" href={currentPageData.path}>{currentPageData.title}</SLink>
			</Container>]
		}, []);
	}, []);

    return <Paper id="header" variant="main" style={{
		justifyContent: "space-between"
	}}>
		<header style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center"
		}}>
			<Typography textAlign="center" variant="h1">
				Destiny Rose
			</Typography>
			<Typography variant="h4">Software Developer</Typography>
			<SLink
				target="_blank"
				rel="noreferrer"
				href="https://docs.google.com/document/d/1TNIDB6pCpQ6tGe9lDI9ooWl3rRMJUPmga7RPLiyNTI0/edit?usp=sharing"
				style={{
					fontSize: 20
				}}
			>View My Resume</SLink>
		</header>
		{finalLinks}
	</Paper>
}
