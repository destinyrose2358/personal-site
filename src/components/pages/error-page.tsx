import { Paper } from "@mui/material";
import SLink from "../custom-material-ui/links/s-link";

export default function ErrorPage(): JSX.Element {
  return (
    <Paper variant="main" id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, you seem to have reached an empty page.</p>
      <SLink href="/">To Home</SLink>
    </Paper>
  );
}
