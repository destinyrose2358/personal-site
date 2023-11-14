import AboutMe from "./about-me/about-me";
import ContactMe from "./contact-me/contact-me";
import Home from "./home/home";
import ProjectsPage from "./projects/projects-page";

export type PageData = {
    path: string;
    element: JSX.Element;
    title: string | JSX.Element;
}

export type PagesData = {
    homePage: PageData,
    others: PageData[]
}

export const Pages: PagesData = {
    homePage: {
        path: "/",
        element: <Home />,
        title: "Home"
    },
    others: [
        {
            path: "/about-me",
            element: <AboutMe />,
            title: "About Me"
        },
        {
            path: "/projects",
            element: <ProjectsPage />,
            title: "Projects"
        },
        {
            path: "/contact-me",
            element: <ContactMe />,
            title: "Contact Me"
        }
    ]
}
