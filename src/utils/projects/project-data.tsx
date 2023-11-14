import _ from "lodash";
import ProjectPage, { ProjectPageProps } from "../../components/pages/projects/project-page";
import ProjectDescription, { ProjectDescriptionCoreProps, ProjectDescriptionProps } from "../../components/pages/projects/project-description";

export type ProjectData = {
    title: string;
    element?: (props: ProjectPageProps) => JSX.Element;
    descriptionElement?: (props: ProjectDescriptionCoreProps) => (props: ProjectDescriptionProps) => JSX.Element;
    description: string;
    subProjects?: {[p: string]: ProjectData};
    wip?: boolean;
};

export type ProjectDataEngineCollection = {[p: string]: ProjectDataEngine };
export type ProjectDataCollection = {[p: string]: ProjectData };

export default class ProjectDataEngine {
    parentProject?: ProjectDataEngine;
    title: string;
    element: JSX.Element;
    descriptionElement: (props: ProjectDescriptionProps) => JSX.Element;
    description: string;
    subProjects: ProjectDataEngineCollection = {};
    wip: boolean = false;

    constructor(data: ProjectData, parent?: ProjectDataEngine) {
        this.parentProject = parent;
        if (data.wip) this.wip = data.wip;
        this.title = data.title;
        this.getPath = this.getPath.bind(this);
        this.element = data.element ? data.element({
            projectDataEngine: this
        }) : <ProjectPage projectDataEngine={this} />;
        this.description = data.description;
        this.descriptionElement = data.descriptionElement ? data.descriptionElement({
            projectDataEngine: this
        }) : ProjectDescription({
            projectDataEngine: this
        });
        parent && parent.addSubProject(this);
        Object.values(data.subProjects || {}).forEach((subProjectData) => {
            new ProjectDataEngine(subProjectData, this);
        });
    }

    addSubProject(newSubProject: ProjectDataEngine) {
        this.subProjects[newSubProject.title] = newSubProject;
    }

    getByTitle(title: string, recurse: boolean = false): ProjectDataEngine | null {
        return this.subProjects[title] || recurse ? _.reduce<ProjectDataEngine, ProjectDataEngine | null>(Object.values(this.subProjects), (discoveredProjectDataEngine, searchingProjectDataEngine) => {
            return discoveredProjectDataEngine ? discoveredProjectDataEngine : searchingProjectDataEngine.getByTitle(title, recurse);
        }, null) : null;
    }

    getPath(): string {
        return this.parentProject ? `${this.parentProject.getPath()}/${this.title.toLowerCase()}` : this.title.toLowerCase();
    }
}
