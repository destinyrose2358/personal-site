import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import LightDarkModeToggle from "./light-dark-mode-toggle";
import MenuIcon from '@mui/icons-material/Menu';

export default function UIHeader(props: {
    handleDrawerOpen: () => void
}): JSX.Element {
    const { handleDrawerOpen } = props;

    return <Box sx={{ display: "flex", zIndex: 1001 }}>
        <AppBar
            position="relative"
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} >
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
                <LightDarkModeToggle />
            </Toolbar>
        </AppBar>
    </Box>
}
