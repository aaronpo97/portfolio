export interface ProjectsPageProps {
  title: string;
  preamble: string;
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  githubURL: string;
  liveURL: string;
  text: string;
  stack: Stack[];
}

export interface Stack {
  text: string;
  icon: string;
  link: string;
}
