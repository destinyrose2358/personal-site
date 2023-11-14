import _ from "lodash";
import ProjectDataEngine, { ProjectData, ProjectDataCollection, ProjectDataEngineCollection } from "../../../utils/projects/project-data";
import ApotheosisProject from "./personal-projects/apotheosis/apotheosis-project";
import NEMRDProject from "./personal-projects/apotheosis/nemrd/nemrd-project";
import PatternTestingProject from "./personal-projects/textiles/pattern-testing/pattern-testing-project";
import TexTilesProject from "./personal-projects/textiles/textiles-project";
import NEMRLibProject from "./personal-projects/apotheosis/nemr-lib/nemr-lib-project";
import FabricComputerProject from "./personal-projects/fabric-computer/fabric-computer-project";
import PersonalProjectsProject from "./personal-projects/personal-projects-project";
import FreelanceProjectsProject from "./freelance-projects/freelance-projects-project";

const projectArrayToProjectCollection: (projectArray: ProjectData[]) => ProjectDataCollection = (projectArray) => _.reduce<ProjectData, ProjectDataCollection>(projectArray, (projectCollection, projectData) => {
    projectCollection[projectData.title] = projectData;
    return projectCollection;
}, {});

const projectEnginesArrayToProjectEnginesCollection: (projectEnginesArray: ProjectDataEngine[]) => ProjectDataEngineCollection = (projectEnginesArray) => _.reduce<ProjectDataEngine, ProjectDataEngineCollection>(projectEnginesArray, (projectEnginesCollection, projectDataEngine) => {
    projectEnginesCollection[projectDataEngine.title] = projectDataEngine;
    return projectEnginesCollection;
}, {});

export const PROJECTS: ProjectDataEngineCollection = projectEnginesArrayToProjectEnginesCollection([
    new ProjectDataEngine (
        {
            title: "Personal Projects",
            element: PersonalProjectsProject,
            description: "My Personal Projects that I'm working on, or have worked on in the past.",
            subProjects: projectArrayToProjectCollection([
                {
                    title: "Apotheosis",
                    element: ApotheosisProject,
                    description: "Apotheosis is a narrative-driven dream-like dungeon-crawler. It explores many concepts like godhood, self-actualization, dreams, alchemy, non-euclidian geometry, and many others.",
                    wip: true,
                    subProjects: projectArrayToProjectCollection([
                        {
                            title: "NEMRD",
                            description: "NEMRD stands for 'Non-Euclidian Model Resource Designer'. This tool is built to provide an intuitive ui to design NEMR files for integration into any project that uses the NEMR Lib.",
                            element: NEMRDProject,
                            wip: true
                        },
                        {
                            title: "NEMR Lib",
                            description: "NEMR Lib is a library who's purpose is to allow a simple to understand model of graphics within Non-Euclidian Geometry.",
                            element: NEMRLibProject,
                            wip: true
                        }
                    ])
                },
                {
                    title: "TexTiles",
                    element: TexTilesProject,
                    description: "TexTiles is a textile design tool, mainly focusing on crochet for now, but intended to allow a user to turn common representations of textiles into other methods. (Ex. Sewing Pattern -> Crochet Pattern)",
                    wip: true,
                    subProjects: projectArrayToProjectCollection([
                        {
                            title: "Pattern Testing",
                            description: "With development of TexTiles comes a lot of approximation of real world items. This means that early on patterns generated may need to be tested for accuracy. If you would like to try them yourself the patterns are free; just please share your results with me.",
                            element: PatternTestingProject,
                            wip: true
                        }
                    ])
                },
                {
                    title: "Fabric Computer",
                    element: FabricComputerProject,
                    description: "The Fabric Computer is a collection of components made using fabric-centered mechanisms. These are theoretical or tested components.",
                    wip: true
                }
            ])
        }
    ),
    new ProjectDataEngine(
        {
            title: "Freelance Projects",
            element: FreelanceProjectsProject,
            description: "As a Freelance Developer, I have worked on a variety of projects for others. This is a sampling of that work."
        }
    )
]);
