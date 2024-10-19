import {
  FaGithub,
  FaLinkedin,
  FaPython,
} from "react-icons/fa6";

import projectImage1 from "../assets/project1.jpeg";
import projectImage2 from "../assets/project2.jpeg";

import { TbBrandCpp } from "react-icons/tb";

export const NAVIGATION_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Bio", href: "#bio" },
  { label: "Skills", href: "#skills" },
  { label: "Work Experience", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  name: "Dino@rmy",
  greet: "Welcome!",
  resumelink: "https://example.com/resume-download",
  description:
    "I'm a developer with experience in full-stack development, machine learning, and data visualization. I enjoy solving complex problems with simple solutions.",
};

export const PROJECTS = [
  {
    id: 1,
    name: "Sample Project 1",
    description:
      "This is a sample project built using MERN stack with real-time messaging and responsive UI.",
    image: projectImage1,
    githubLink: "https://github.com/sample/project1",
  },
  {
    id: 2,
    name: "Sample Project 2",
    description:
      "This is a landing page for a web application built using React and Tailwind CSS.",
    image: projectImage2,
    githubLink: "https://github.com/sample/project2",
  },
];

export const BIO = [
  "Dino@rmy is a software developer with a focus on full-stack development, expected to graduate in 2025. He has a passion for problem-solving and coding.",
  "...",
];

export const SKILLS = [
  {
    icon: <TbBrandCpp className="text-4xl text-cyan-400 lg:text-5xl" />,
    name: "C++",
    experience: "Primary Language",
  },
  {
    icon: <FaPython className="text-4xl text-blue-500 lg:text-5xl" />,  
    name: "Python",
    experience: "Secondary Language",
  },  
];

export const EXPERIENCES = [
  {
    title: "Hackathon Participant",
    company: "TechFest Hackathon",
    duration: "2023",
    description:
      "Ranked in the top 10, developing AI-driven solutions to real-world challenges in a competitive environment.",
  },
  {
    title: "Intern",
    company: "Sample Company",
    duration: "2023",
    description:
      "Developed a machine learning model for recognizing handwritten digits using Python and TensorFlow.",
  },
];

export const EDUCATION = [
  {
    degree: "B.E – Computer Science",
    institution: "XYZ University",
    duration: "2021 - 2025",
    description:
      "Focused on core subjects like Data Structures, Algorithms, Computer Networks, and Database Management Systems. Currently holding a GPA of 9.0.",
  },
  {
    degree: "High School",
    institution: "ABC School",
    duration: "2019 - 2021",
    description:
      "Completed the science stream with a focus on Mathematics, Physics, Chemistry, and Electronics, achieving a percentage of 90%.",
  },
];

export const SOCIAL_MEDIA_LINKS = [
  {
    href: "https://github.com/sample",
    icon: <FaGithub fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://www.linkedin.com/in/sample",
    icon: <FaLinkedin fontSize={25} className="hover:opacity-80" />,
  },
];
