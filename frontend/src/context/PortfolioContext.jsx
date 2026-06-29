import { createContext, useState, useEffect } from 'react';
import { uploadWithProgress } from '../utils/uploadWithProgress';

export const PortfolioContext = createContext();

const defaultAboutParagraphs = [
  "Hi, I am Ranjeet Verma — a multidisciplinary designer translating ideas into meaningful experiences.",
  "I work at the intersection of craft and code, culture and minimalism, combining storytelling with systems to create products and interfaces that feel intuitive and human.",
  "From building brands like Sattuz and GutNut to shaping identities and experiences, my work focuses on connection, clarity, and lasting impact."
];

const defaultProjects = [];

const defaultProfileDetails = {
  firstName: 'Ranjeet',
  lastName: 'Verma',
  role: 'Designer',
  subtitle: 'in Every Interaction',
  description: 'Designing intuitive and engaging digital experiences that solve real-world problems',
  email: 'ranjeetkumar.verma@nift.alumni.in',
  phone: '+91 6205508988',
  resumeLink: '/Ranjeet_Verma_Resume.pdf',
};

const defaultSocialLinks = {
  behance: '#',
  instagram: '#',
  linkedin: 'https://www.linkedin.com/in/ranjeet-kumar-verma-66a866278/',
};

export const defaultDesignTools = [
  { _id: '1', name: 'Webflow', color: '#4353FF', icon: 'https://cdn.simpleicons.org/webflow' },
  { _id: '2', name: 'Adobe XD', color: '#FF61F6', icon: 'https://cdn.simpleicons.org/adobexd' },
  { _id: '3', name: 'Notion', color: '#000000', icon: 'https://cdn.simpleicons.org/notion' },
  { _id: '4', name: 'Illustrator', color: '#FF9A00', icon: 'https://cdn.simpleicons.org/adobeillustrator' },
  { _id: '5', name: 'Photoshop', color: '#31A8FF', icon: 'https://cdn.simpleicons.org/adobephotoshop' },
  { _id: '6', name: 'Framer', color: '#0055FF', icon: 'https://cdn.simpleicons.org/framer' },
  { _id: '7', name: 'Sketch', color: '#F7B500', icon: 'https://cdn.simpleicons.org/sketch' },
  { _id: '8', name: 'Figma', color: '#F24E1E', icon: 'https://cdn.simpleicons.org/figma' },
  { _id: '9', name: 'React', color: '#61DAFB', icon: 'https://cdn.simpleicons.org/react' },
  { _id: '10', name: 'Tailwind', color: '#06B6D4', icon: 'https://cdn.simpleicons.org/tailwindcss' },
  { _id: '11', name: 'Next.js', color: '#000000', icon: 'https://cdn.simpleicons.org/nextdotjs' },
  { _id: '12', name: 'GitHub', color: '#181717', icon: 'https://cdn.simpleicons.org/github' },
  { _id: '13', name: 'Vercel', color: '#000000', icon: 'https://cdn.simpleicons.org/vercel' },
  { _id: '14', name: 'Node.js', color: '#339933', icon: 'https://cdn.simpleicons.org/nodedotjs' },
  { _id: '15', name: 'MongoDB', color: '#47A248', icon: 'https://cdn.simpleicons.org/mongodb' },
  { _id: '16', name: 'Express', color: '#000000', icon: 'https://cdn.simpleicons.org/express' },
  { _id: '17', name: 'InVision', color: '#FF3366', icon: 'https://cdn.simpleicons.org/invision' },
  { _id: '18', name: 'Zeplin', color: '#FDBD39', icon: 'https://cdn.simpleicons.org/zeplin' },
  { _id: '19', name: 'WordPress', color: '#21759B', icon: 'https://cdn.simpleicons.org/wordpress' },
  { _id: '20', name: 'ChatGPT', color: '#74AA9C', icon: 'https://cdn.simpleicons.org/openai' }
];

const defaultWorkPageDetails = {
  title: "More then one hundred projects delivered. A selection of the work we are most proud of, across strategy, design, and technology.",
  description: "A curated collection of projects across brand strategy, visual identity, web design, development, and visual content. Each project here represents a specific brief, a specific challenge, and a specific outcome."
};

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CACHE_KEYS = {
  projects: 'portfolio_projects_v18',
  about: 'portfolio_about_v18',
  profile: 'portfolio_profile_v18',
  social: 'portfolio_social_v18',
  tools: 'portfolio_tools_v18',
  workpage: 'portfolio_workpage_v18',
  workshowcasegif: 'portfolio_workshowcasegif_v18'
};

const safeJSONParse = (str, fallback) => {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch (e) {
    console.error('Failed to parse JSON from local storage:', e);
    return fallback;
  }
};

export function PortfolioProvider({ children }) {
  const [aboutParagraphs, setAboutParagraphs] = useState(defaultAboutParagraphs);
  const [projects, setProjects] = useState(defaultProjects);
  const [profileDetails, setProfileDetails] = useState(defaultProfileDetails);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);
  const [designTools, setDesignTools] = useState(defaultDesignTools);
  const [workPageDetails, setWorkPageDetails] = useState(defaultWorkPageDetails);
  const [workShowcaseGif, setWorkShowcaseGif] = useState(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Projects
        const projRes = await fetch(`${API_URL}/projects`);
        if (projRes.ok) {
          const projData = await projRes.json();
          setProjects(projData);
        } else {
          const cachedProj = localStorage.getItem(CACHE_KEYS.projects);
          setProjects(safeJSONParse(cachedProj, []));
        }

        // Fetch Settings
        const fetchSetting = async (key, setter, defaultVal, localKey) => {
          try {
            const res = await fetch(`${API_URL}/settings/${key}`);
            if (res.ok) {
              const data = await res.json();
              setter(data);
            } else {
              const cached = localKey ? localStorage.getItem(localKey) : null;
              setter(safeJSONParse(cached, defaultVal));
            }
          } catch (error) {
            console.error(`Failed to fetch setting ${key}:`, error);
            const cached = localKey ? localStorage.getItem(localKey) : null;
            setter(safeJSONParse(cached, defaultVal));
          }
        };

        await Promise.all([
          fetchSetting('aboutParagraphs', setAboutParagraphs, defaultAboutParagraphs, CACHE_KEYS.about),
          fetchSetting('profileDetails', setProfileDetails, defaultProfileDetails, CACHE_KEYS.profile),
          fetchSetting('socialLinks', setSocialLinks, defaultSocialLinks, CACHE_KEYS.social),
          fetchSetting('designTools', setDesignTools, defaultDesignTools, CACHE_KEYS.tools),
          fetchSetting('workPageDetails', setWorkPageDetails, defaultWorkPageDetails, CACHE_KEYS.workpage),
          fetchSetting('workShowcaseGif', setWorkShowcaseGif, '', CACHE_KEYS.workshowcasegif),
        ]);
        
      } catch (error) {
        console.error('Failed to fetch from backend, using defaults/local cache.', error);
        const cachedProjects = localStorage.getItem(CACHE_KEYS.projects);
        setProjects(safeJSONParse(cachedProjects, []));
        
        const cachedAbout = localStorage.getItem(CACHE_KEYS.about);
        setAboutParagraphs(safeJSONParse(cachedAbout, defaultAboutParagraphs));

        const cachedProfile = localStorage.getItem(CACHE_KEYS.profile);
        setProfileDetails(safeJSONParse(cachedProfile, defaultProfileDetails));

        const cachedSocial = localStorage.getItem(CACHE_KEYS.social);
        setSocialLinks(safeJSONParse(cachedSocial, defaultSocialLinks));

        const cachedTools = localStorage.getItem(CACHE_KEYS.tools);
        setDesignTools(safeJSONParse(cachedTools, defaultDesignTools));

        const cachedWorkPage = localStorage.getItem(CACHE_KEYS.workpage);
        setWorkPageDetails(safeJSONParse(cachedWorkPage, defaultWorkPageDetails));

        const cachedGif = localStorage.getItem(CACHE_KEYS.workshowcasegif);
        setWorkShowcaseGif(safeJSONParse(cachedGif, ''));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveSetting = async (key, value) => {
    try {
      const token = localStorage.getItem('portfolio_admin_token');
      const res = await fetch(`${API_URL}/settings/${key}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(value),
      });
      if (res.status === 401) {
        localStorage.removeItem('portfolio_admin_token');
        alert('Session expired or invalid token. Please login again.');
        window.location.href = '/admin/login';
      } else if (!res.ok) {
        alert(`Failed to save ${key} to database`);
      }
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
    }
  };

  const updateAboutParagraphs = (newParagraphs) => {
    setAboutParagraphs(newParagraphs);
    saveSetting('aboutParagraphs', newParagraphs);
    localStorage.setItem(CACHE_KEYS.about, JSON.stringify(newParagraphs));
  };

  const addProject = async (formData, onProgress) => {
    try {
      const token = localStorage.getItem('portfolio_admin_token');
      const res = await uploadWithProgress(`${API_URL}/projects`, formData, token, 'POST', onProgress);
      const newProjects = [...projects, res];
      setProjects(newProjects);
      localStorage.setItem(CACHE_KEYS.projects, JSON.stringify(newProjects));
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem('portfolio_admin_token');
        alert('Session expired. Please login again.');
        window.location.href = '/admin/login';
      } else {
        console.error('Error adding project:', error);
        alert(error.message || 'Failed to add project to backend');
      }
    }
  };


  const updateProject = async (id, formData, onProgress) => {
    try {
      const token = localStorage.getItem('portfolio_admin_token');
      const res = await uploadWithProgress(`${API_URL}/projects/${id}`, formData, token, 'PUT', onProgress);
      const updatedProjects = projects.map(p => (p._id === id || p.id === id) ? res : p);
      setProjects(updatedProjects);
      localStorage.setItem(CACHE_KEYS.projects, JSON.stringify(updatedProjects));
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem('portfolio_admin_token');
        alert('Session expired. Please login again.');
        window.location.href = '/admin/login';
      } else if (error.status === 404) {
         // Project not found in backend. It's a local/default project.
         // We should CREATE it instead!
         try {
           const createRes = await uploadWithProgress(`${API_URL}/projects`, formData, token, 'POST', onProgress);
           const fallbackProjects = projects.map(p => (p._id === id || p.id === id) ? createRes : p);
           setProjects(fallbackProjects);
           localStorage.setItem(CACHE_KEYS.projects, JSON.stringify(fallbackProjects));
         } catch (createErr) {
           alert('Failed to save local project to database');
         }
      } else {
        console.error('Error updating project:', error);
        alert(`Failed to update project: ${error.message || 'Unknown error'}`);
      }
    }
  };


  const deleteProject = async (id, fallbackIndex) => {
    try {
      const token = localStorage.getItem('portfolio_admin_token');
      const res = await fetch(`${API_URL}/projects/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const newProjects = projects.filter(p => p._id !== id);
        setProjects(newProjects);
        localStorage.setItem(CACHE_KEYS.projects, JSON.stringify(newProjects));
      } else if (res.status === 401) {
        localStorage.removeItem('portfolio_admin_token');
        alert('Session expired. Please login again.');
        window.location.href = '/admin/login';
      } else if (res.status === 404) {
         // It might just be local
         const newProjects = [...projects];
         newProjects.splice(fallbackIndex, 1);
         setProjects(newProjects);
         localStorage.setItem(CACHE_KEYS.projects, JSON.stringify(newProjects));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      // Fallback deletion
      const newProjects = [...projects];
      newProjects.splice(fallbackIndex, 1);
      setProjects(newProjects);
    }
  };

  const updateProfileDetails = (newDetails) => {
    setProfileDetails(newDetails);
    saveSetting('profileDetails', newDetails);
    localStorage.setItem(CACHE_KEYS.profile, JSON.stringify(newDetails));
  };

  const updateSocialLinks = (newLinks) => {
    setSocialLinks(newLinks);
    saveSetting('socialLinks', newLinks);
    localStorage.setItem(CACHE_KEYS.social, JSON.stringify(newLinks));
  };

  const updateDesignTools = (newTools) => {
    setDesignTools(newTools);
    saveSetting('designTools', newTools);
    localStorage.setItem(CACHE_KEYS.tools, JSON.stringify(newTools));
  };

  const updateWorkPageDetails = (newDetails) => {
    setWorkPageDetails(newDetails);
    saveSetting('workPageDetails', newDetails);
    localStorage.setItem(CACHE_KEYS.workpage, JSON.stringify(newDetails));
  };

  const updateWorkShowcaseGif = (newGifUrl) => {
    setWorkShowcaseGif(newGifUrl);
    saveSetting('workShowcaseGif', newGifUrl);
    localStorage.setItem(CACHE_KEYS.workshowcasegif, JSON.stringify(newGifUrl));
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
      updateDesignTools,
      workPageDetails,
      updateWorkPageDetails,
      workShowcaseGif,
      updateWorkShowcaseGif
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}
