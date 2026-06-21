import { createContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext();

const defaultAboutParagraphs = [
  "I'm not here just to design — I'm here to translate ideas into experiences.",
  "I'm Ranjeet Verma, a designer who moves between craft and code, culture and minimalism, logic and emotion.",
  "My work lives at the intersection of stories and systems — where a product can carry heritage, and an interface can feel like a conversation.",
  "From giving an organic voice to brand identities, to shaping interior identities, and bringing history alive through interactive heritage projects, every project I touch is an experiment in meaning.",
  "I don't design to impress — I design to connect. To make someone pause, feel, or remember.",
];

const defaultProjects = [
  {
    title: 'Sattuz — Organic Brand Voice',
    category: 'Brand Identity',
    description: 'Designing a brand identity that embodies the earthy, organic essence of traditional sattu-based nutrition for modern consumers.',
    bgGradient: 'from-amber-50 to-orange-100',
    tagBg: 'bg-amber-100 text-amber-700',
    hoverColor: 'group-hover:text-amber-700',
    iconBg: 'bg-amber-200 text-amber-800',
    iconLetter: 'S',
    brandName: 'Sattuz',
    barColors: ['bg-amber-50', 'bg-amber-50'],
    gridColors: ['bg-amber-100/50', 'bg-amber-100/50', 'bg-amber-100/50'],
    isDark: false
  },
  {
    title: 'GutNut — Health & Wellness',
    category: 'Brand Design',
    description: 'Crafting a playful yet trustworthy brand identity for a gut-health nutrition brand, emphasizing natural ingredients and well-being.',
    bgGradient: 'from-green-50 to-emerald-100',
    tagBg: 'bg-green-100 text-green-700',
    hoverColor: 'group-hover:text-green-700',
    iconBg: 'bg-green-200 text-green-800',
    iconLetter: 'G',
    brandName: 'GutNut',
    barColors: ['bg-green-50', 'bg-green-50'],
    gridColors: ['bg-green-100/50'],
    isDark: false
  },
  {
    title: 'Denotation Design — Interior Identity',
    category: 'Interior Identity',
    description: 'Shaping a sophisticated visual identity for an interior design studio, blending minimalism with spatial awareness in every touchpoint.',
    bgGradient: 'from-slate-50 to-gray-200',
    tagBg: 'bg-gray-200 text-gray-700',
    hoverColor: 'group-hover:text-gray-600',
    isDark: true,
  },
  {
    title: 'Heritage for Children',
    category: 'Interactive Experience',
    description: 'Bringing history alive through interactive design — making cultural heritage accessible and engaging for young minds through playful interfaces.',
    bgGradient: 'from-rose-50 to-purple-100',
    tagBg: 'bg-purple-100 text-purple-700',
    hoverColor: 'group-hover:text-purple-700',
    iconBg: 'bg-purple-200 text-purple-800',
    iconLetter: 'H',
    brandName: 'Heritage',
    barColors: ['bg-gray-100'],
    gridColors: ['bg-purple-50', 'bg-rose-50'],
    isDark: false
  },
];

const defaultProfileDetails = {
  firstName: 'Ranjeet',
  lastName: 'Verma',
  role: 'Designer',
  subtitle: 'in Every Interaction',
  description: 'Designing intuitive and engaging digital experiences that solve real-world problems',
  email: 'ranjeetkumar.verma@nift.alumni.in',
  phone: '+91 6205508988',
  resumeLink: '#',
};

const defaultSocialLinks = {
  behance: '#',
  instagram: '#',
  linkedin: 'https://www.linkedin.com/in/ranjeet-kumar-verma-66a866278/',
};

const defaultDesignTools = [
  { id: 1, name: 'Figma', bg: 'bg-[#F24E1E]/5', text: 'text-[#F24E1E]', border: 'border-[#F24E1E]/20', icon: 'https://cdn.simpleicons.org/figma' },
  { id: 2, name: 'Webflow', bg: 'bg-[#4353FF]/5', text: 'text-[#4353FF]', border: 'border-[#4353FF]/20', icon: 'https://cdn.simpleicons.org/webflow' },
  { id: 3, name: 'Adobe XD', bg: 'bg-[#FF61F6]/5', text: 'text-[#FF61F6]', border: 'border-[#FF61F6]/20', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg' },
  { id: 4, name: 'Notion', bg: 'bg-gray-100', text: 'text-gray-900', border: 'border-gray-200', icon: 'https://cdn.simpleicons.org/notion' },
  { id: 5, name: 'Illustrator', bg: 'bg-[#FF9A00]/5', text: 'text-[#FF9A00]', border: 'border-[#FF9A00]/20', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg' },
  { id: 6, name: 'Photoshop', bg: 'bg-[#31A8FF]/5', text: 'text-[#31A8FF]', border: 'border-[#31A8FF]/20', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
  { id: 7, name: 'Framer', bg: 'bg-[#0055FF]/5', text: 'text-[#0055FF]', border: 'border-[#0055FF]/20', icon: 'https://cdn.simpleicons.org/framer' },
  { id: 8, name: 'Spline', bg: 'bg-[#FF00C7]/5', text: 'text-[#FF00C7]', border: 'border-[#FF00C7]/20', icon: 'https://www.google.com/s2/favicons?domain=spline.design&sz=256' },
  { id: 9, name: 'Miro', bg: 'bg-[#FFD02F]/10', text: 'text-[#e5b810]', border: 'border-[#FFD02F]/30', icon: "https://cdn.brandfetch.io/idAnDTFapY/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1751372903964" },
  { id: 10, name: 'Sketch', bg: 'bg-[#F7B500]/5', text: 'text-[#F7B500]', border: 'border-[#F7B500]/20', icon: 'https://www.google.com/s2/favicons?domain=sketch.com&sz=256' },
  { id: 11, name: 'Canva', bg: 'bg-[#00C4CC]/5', text: 'text-[#00C4CC]', border: 'border-[#00C4CC]/20', icon: '/canva.svg' },
  { id: 12, name: 'InVision', bg: 'bg-[#FF3366]/5', text: 'text-[#FF3366]', border: 'border-[#FF3366]/20', icon: '/invision.svg' },
  { id: 13, name: 'Blender', bg: 'bg-[#F5792A]/5', text: 'text-[#F5792A]', border: 'border-[#F5792A]/20', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg' },
  { id: 14, name: 'Zeplin', bg: 'bg-[#FCCD34]/5', text: 'text-[#eab308]', border: 'border-[#FCCD34]/20', icon: 'data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNDA2LjggMTkyMy44IiB2aWV3Qm94PSIwIDAgMjQwNi44IDE5MjMuOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMzcxIDEzMjYuNC0xMjUuOSA0Ni02LjcgMzc0LjUgNDM1LjgtMTU5LjJjLTE0OS42LTUwLjEtMjU4LjctMTM4LjQtMzAzLjItMjYxLjMiIGZpbGw9IiNmZGJkMzkiLz48cGF0aCBkPSJtNDM2LjkgOTMwLjMtNDM2LjkgMTU5LjYgMjQ1LjEgMjgyLjYgMTI1LjktNDZjLTQ0LjQtMTIyLjUtMTctMjYwLjggNjUuOS0zOTYuMiIgZmlsbD0iI2Y2OTgzMyIvPjxwYXRoIGQ9Im0xMTcyIDM4OS44Yy01NTYuMyAyMDMuMi05MTUgNjIyLjYtODAxIDkzNi42bDIwMTQuNS03MzUuOWMtMTE0LTMxNC02NTcuMi00MDMuOS0xMjEzLjUtMjAwLjciIGZpbGw9IiNmZWNmMzMiLz48cGF0aCBkPSJtMTU4NC40IDE1MjcuMmM1NTYuMy0yMDMuMiA5MTUuNi02MjAuNyA4MDEtOTM2LjZsLTIwMTQuNSA3MzUuOGMxMTQuNiAzMTYgNjU3LjIgNDA0IDEyMTMuNSAyMDAuOCIgZmlsbD0iI2VlNjcyMyIvPjxwYXRoIGQ9Im0yMzg1LjQgNTkwLjUtMjAxNC40IDczNS45YzM5LjQgMTA4LjggMTg5LjkgMTYyLjQgNDAwLjkgMTYyLjQgMjA1LjggMCA0NjkuMi01MC45IDc0My44LTE1MS4yIDU1Ni4zLTIwMy4yIDk0Ny42LTUzMi4zIDg2OS43LTc0Ny4xIiBmaWxsPSIjZjY5ODMzIi8+PHBhdGggZD0ibTE5ODQuNSA0MjguMmMtMjA1LjcgMC00NjkuMiA1MC45LTc0My44IDE1MS4yLTU1Ni4zIDIwMy4yLTk0Ny42IDUzMi4yLTg2OS43IDc0N2wyMDE0LjUtNzM1LjljLTM5LjUtMTA4LjgtMTg5LjktMTYyLjMtNDAxLTE2Mi4zIiBmaWxsPSIjZmRiZDM5Ii8+PGcgZmlsbD0iI2VlNjcyMyI+PHBhdGggZD0ibTE4NzMuMiAxNzY2LjhjLTU5LjMgMC0xNDYuNy01My41LTI1OS45LTE1OS4xLTEzMy45LTEyNC45LTI4Ny4yLTMwNy45LTQzMS45LTUxNS4yLTE0NC42LTIwNy4zLTI2My40LTQxNC41LTMzNC42LTU4My42LTc3LjUtMTg0LjItODguNi0yOTcuNC0zMi45LTMzNi42IDEyLjktOC44IDI4LjItMTMuMyA0My44LTEyLjkgNDUuMyAwIDEzMy43IDMzLjcgMjk3IDE5NC41bDMuNiAzLjUtLjUgNWMtMS4xIDExLjYtMi4xIDIzLjItMyAzNC43bC0xLjggMjIuNy0xNi0xNi4xYy0xNzYtMTc3LjMtMjUzLjQtMTk2LjQtMjc4LjYtMTk2LjQtNy4yIDAtMTIuOSAxLjQtMTcgNC4zLTI0LjIgMTctMjUuOCAxMDAuMiA0OS40IDI3OC43IDY5LjkgMTY2IDE4NyAzNzAuMSAzMjkuNyA1NzQuNyAxNDIuOCAyMDQuNyAyOTMuOCAzODQuOSA0MjUuNCA1MDcuNiAxNDEuOCAxMzIuMyAyMDUuNyAxNDYuNiAyMjYuNiAxNDYuNiA3LjIgMCAxMy0xLjUgMTcuNC00LjYgMjUuNS0xNy45IDI1LjUtMTA3LTU4LjMtMjk5LjJsLTMuOS04LjggOC40LTQuNmM4LjQtNC42IDE2LjYtOS4xIDI0LjItMTMuNWwxMC4xLTUuNyA0LjcgMTAuNmM1OS40IDEzNi4yIDExNSAzMDkuMyA0Mi4xIDM2MC41LTEyLjkgOC44LTI4LjMgMTMuMy00NCAxMi45em0wLTIxdjEwLjV6Ii8+PHBhdGggZD0ibTE1OTcuOSAxNTIxLjQtLjggMTAuNGMtMTQuMSAxNzQtNTEuMSAzODMuMi0xNDcuNyAzOTEuNy0yIC4yLTQgLjItNS45LjItNjUuNiAwLTEyNy43LTk0LTE4NC40LTI3OS4zLTUzLjgtMTc1LjQtOTUuNS00MTAuOC0xMTcuNC02NjIuOS0yMi0yNTIuMS0yMS43LTQ5MS4yLjktNjczLjMgMjQuNi0xOTguNCA3MS40LTMwMiAxMzkuMi0zMDggMi0uMiA0LjEtLjMgNi4xLS4zIDQ3LjYgMCAxMTkuMyA1My45IDE5Mi43IDMwNC45bC00Ny45IDkuMmMtMjQuNS04My44LTUxLjItMTUyLTc3LjctMTk5LTI0LjUtNDMuMy00OC40LTY3LjItNjcuMS02Ny4yLS42IDAtMS4yIDAtMS45LjEtMjkuNCAyLjYtNzIuMiA3My44LTk2IDI2Ni4yLTIyLjIgMTc4LjgtMjIuNSA0MTQuNC0uOCA2NjMuMiAyMS43IDI0OC45IDYyLjcgNDgwLjggMTE1LjUgNjUzIDIzLjYgNzcuMSA0OS41IDE0MC43IDc1IDE4My44IDIzLjQgMzkuOCA0Ni4xIDYxLjcgNjMuOCA2MS43LjYgMCAxLjIgMCAxLjgtLjEgMjguMS0yLjQgODEuMS03Ni42IDEwMy40LTMzNy41eiIvPjwvZz48L3N2Zz4=' },
];

export function PortfolioProvider({ children }) {
  const [aboutParagraphs, setAboutParagraphs] = useState(() => {
    const saved = localStorage.getItem('portfolio_about_v15');
    return saved ? JSON.parse(saved) : defaultAboutParagraphs;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects_v15');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [profileDetails, setProfileDetails] = useState(() => {
    const saved = localStorage.getItem('portfolio_profile_v15');
    return saved ? JSON.parse(saved) : defaultProfileDetails;
  });

  const [socialLinks, setSocialLinks] = useState(() => {
    const saved = localStorage.getItem('portfolio_social_v15');
    return saved ? JSON.parse(saved) : defaultSocialLinks;
  });

  const [designTools, setDesignTools] = useState(() => {
    const saved = localStorage.getItem('portfolio_tools_v15');
    return saved ? JSON.parse(saved) : defaultDesignTools;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_about_v15', JSON.stringify(aboutParagraphs));
  }, [aboutParagraphs]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects_v15', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_profile_v15', JSON.stringify(profileDetails));
  }, [profileDetails]);

  useEffect(() => {
    localStorage.setItem('portfolio_social_v15', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('portfolio_tools_v15', JSON.stringify(designTools));
  }, [designTools]);

  const updateAboutParagraphs = (newParagraphs) => {
    setAboutParagraphs(newParagraphs);
  };

  const addProject = (project) => {
    setProjects([project, ...projects]);
  };

  const updateProject = (index, updatedProject) => {
    const newProjects = [...projects];
    newProjects[index] = updatedProject;
    setProjects(newProjects);
  };

  const deleteProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const updateProfileDetails = (newDetails) => {
    setProfileDetails(newDetails);
  };

  const updateSocialLinks = (newLinks) => {
    setSocialLinks(newLinks);
  };

  const updateDesignTools = (newTools) => {
    setDesignTools(newTools);
  };

  return (
    <PortfolioContext.Provider value={{
      aboutParagraphs,
      updateAboutParagraphs,
      projects,
      addProject,
      updateProject,
      deleteProject,
      profileDetails,
      updateProfileDetails,
      socialLinks,
      updateSocialLinks,
      designTools,
      updateDesignTools
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}
