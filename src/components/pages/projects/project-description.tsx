import { PropsWithChildren } from "react";
import ProjectDataEngine from "../../../utils/projects/project-data";
import ProjectsList from "./projects-list";
import { PropsWithProjectListEngine } from "../../../utils/projects/use-project-list-state";
import SLink from "../../custom-material-ui/links/s-link";
import { Typography, Container } from "@mui/material";

export type ProjectDescriptionCoreProps = PropsWithChildren<{
    projectDataEngine: ProjectDataEngine;
}>;

export type ProjectDescriptionProps = PropsWithProjectListEngine<PropsWithChildren<{
    includeLink?: boolean;
}>>;

export default function ProjectDescription(coreProps: ProjectDescriptionCoreProps): (props: ProjectDescriptionProps) => JSX.Element {
    const { projectDataEngine: {description, getPath, subProjects} } = coreProps;

    return (props) => {
        const { children, includeLink = true, projectListEngine } = props;
        return <Container
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                justifyItems: "center",
                "&>*": {
                    width: "fit-content"
                }
            }}
        >
            <Typography>
                {description}
                {includeLink ? " ": null}
                {includeLink ? <SLink href={`/projects/${getPath()}`}>Learn More</SLink> : null}
            </Typography>
            <Container
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    justifyItems: "center",
                    "&>*": {
                        width: "fit-content"
                    }
                }}
            >
                {children}
            </Container>
            {Object.keys(subProjects).length > 0 ? <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography>Sub-Projects</Typography>
                <ProjectsList projectListEngine={projectListEngine} projects={subProjects} />
            </Container> : null}
        </Container>
    }
}
