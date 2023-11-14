import { useMemo } from "react"
import { Routes, Route } from "react-router-dom";
import {PageData, Pages} from "./pages";
import { reduce } from "lodash";
import ErrorPage from "./error-page";
import ProjectDataEngine from "../../utils/projects/project-data";
import { PROJECTS } from "./projects/project-pages";

export default function PageRoutes(): JSX.Element {
    const finalRoutes = useMemo(() => {
        return reduce<PageData, JSX.Element[]>([Pages.homePage, ...Pages.others], (pageRoutes, currentPageData, index) => {
            return [...pageRoutes, <Route key={index} path={currentPageData.path} element={currentPageData.element} />]
        }, []);
    }, []);

    const projectRoutes = useMemo(() => {
        const generateRoutes = (projectRoutes: JSX.Element[], currentProjectDataEngine: ProjectDataEngine) => {
            projectRoutes.push(<Route key={0} path={`/projects/${currentProjectDataEngine.getPath()}`} element={currentProjectDataEngine.element} />);
            Object.values(currentProjectDataEngine.subProjects).forEach((currentProjectDataEngine, index) => {
                projectRoutes.push(<Route key={index+1} path={`/projects/${currentProjectDataEngine.getPath()}`} element={currentProjectDataEngine.element} />);
                generateRoutes(projectRoutes, currentProjectDataEngine);
            });
        }
        const finalRoutes: JSX.Element[] = [];
        Object.values(PROJECTS).forEach((projectDataEngine: ProjectDataEngine) => {
            generateRoutes(finalRoutes, projectDataEngine);
        });
        return finalRoutes;
    }, []);

    return <Routes>
        {finalRoutes}
        {projectRoutes}
        <Route path="*" element={<ErrorPage />} />
    </Routes>
}
