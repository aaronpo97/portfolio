export interface AboutPageProps {
  title: string;
  preamble: string;
  content: Content[];
}

export interface Course {
  instructor: string;
  title: string;
  link: string;
}
export interface Content {
  heading: string;
  text: string;
  tech?: Tech[];
  courses?: Course[];
  skills?: string[];
  id: string;
}

export interface Tech {
  category: string;
  stack: Stack[];
}

export interface Stack {
  text: string;
  icon: string;
  link: string;
}
