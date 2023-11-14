import { reduce } from "lodash";
import { useMemo } from "react";
import { PageData, Pages } from "./pages/pages";
import { List, ListItem, styled } from "@mui/material";
import SNavLink from "./custom-material-ui/links/s-nav-link";
import SLink from "./custom-material-ui/links/s-link";

const StyledList = styled(List)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-stretch",
    "& ul": {
        padding: 0,
        borderTop: `2px solid ${theme.palette.divider}`
    }
}));

export default function NavBar(): JSX.Element {
    const finalLinks = useMemo(() => {
        return reduce<PageData, JSX.Element[]>(Pages.others, (pageRoutes, currentPageData, index) => {
            return [...pageRoutes, <ListItem key={index}><SNavLink variant="button" href={currentPageData.path}>{currentPageData.title}</SNavLink></ListItem>]
        }, []);
    }, []);

    const homeLink = useMemo(() => {
        return <ListItem><SLink variant="button" href={Pages.homePage.path}>{Pages.homePage.title}</SLink></ListItem>
    }, []);

    return (
        <StyledList
            sx={{
                "& li": {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    padding: 0,
                    "& a": {
                        borderRadius: 0
                    }
                }
            }}
        >
            {homeLink}
            <StyledList>
                {finalLinks}
            </StyledList>
        </StyledList>
    )
}
