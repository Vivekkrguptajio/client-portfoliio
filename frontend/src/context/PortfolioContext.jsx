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
  { id: 1, name: 'Figma', bg: 'bg-[#F24E1E]/5', text: 'text-[#F24E1E]', border: 'border-[#F24E1E]/20', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { id: 2, name: 'Webflow', bg: 'bg-[#4353FF]/5', text: 'text-[#4353FF]', border: 'border-[#4353FF]/20', icon: 'https://cdn.simpleicons.org/webflow/4353FF' },
  { id: 3, name: 'Adobe XD', bg: 'bg-[#FF61F6]/5', text: 'text-[#FF61F6]', border: 'border-[#FF61F6]/20', icon: 'https://cdn.simpleicons.org/adobexd/FF61F6' },
  { id: 4, name: 'Notion', bg: 'bg-gray-100', text: 'text-gray-900', border: 'border-gray-200', icon: 'https://cdn.simpleicons.org/notion/111111' },
  { id: 5, name: 'Illustrator', bg: 'bg-[#FF9A00]/5', text: 'text-[#FF9A00]', border: 'border-[#FF9A00]/20', icon: 'https://cdn.simpleicons.org/adobeillustrator/FF9A00' },
  { id: 6, name: 'Photoshop', bg: 'bg-[#31A8FF]/5', text: 'text-[#31A8FF]', border: 'border-[#31A8FF]/20', icon: 'https://cdn.simpleicons.org/adobephotoshop/31A8FF' },
  { id: 7, name: 'Framer', bg: 'bg-[#0055FF]/5', text: 'text-[#0055FF]', border: 'border-[#0055FF]/20', icon: 'https://cdn.simpleicons.org/framer/0055FF' },
  { id: 8, name: 'Spline', bg: 'bg-[#FF00C7]/5', text: 'text-[#FF00C7]', border: 'border-[#FF00C7]/20', icon: 'https://cdn.simpleicons.org/spline/FF00C7' },
  { id: 9, name: 'Miro', bg: 'bg-[#FFD02F]/10', text: 'text-[#e5b810]', border: 'border-[#FFD02F]/30', icon: 'https://cdn.simpleicons.org/miro/e5b810' },
];

export function PortfolioProvider({ children }) {
  const [aboutParagraphs, setAboutParagraphs] = useState(() => {
    const saved = localStorage.getItem('portfolio_about');
    return saved ? JSON.parse(saved) : defaultAboutParagraphs;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [profileDetails, setProfileDetails] = useState(() => {
    const saved = localStorage.getItem('portfolio_profile');
    return saved ? JSON.parse(saved) : defaultProfileDetails;
  });

  const [socialLinks, setSocialLinks] = useState(() => {
    const saved = localStorage.getItem('portfolio_social');
    return saved ? JSON.parse(saved) : defaultSocialLinks;
  });

  const [designTools, setDesignTools] = useState(() => {
    const saved = localStorage.getItem('portfolio_tools');
    return saved ? JSON.parse(saved) : defaultDesignTools;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_about', JSON.stringify(aboutParagraphs));
  }, [aboutParagraphs]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profileDetails));
  }, [profileDetails]);

  useEffect(() => {
    localStorage.setItem('portfolio_social', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('portfolio_tools', JSON.stringify(designTools));
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
