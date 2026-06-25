import { createContext, useState, useEffect } from 'react';

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

const defaultDesignTools = [
  { _id: '1', name: 'Figma', bg: 'bg-[#F24E1E]/5', text: 'text-[#F24E1E]', border: 'border-[#F24E1E]/20', icon: 'https://cdn.simpleicons.org/figma' },
];

const defaultWorkPageDetails = {
  title: "More then one hundred projects delivered. A selection of the work we are most proud of, across strategy, design, and technology.",
  description: "A curated collection of projects across brand strategy, visual identity, web design, development, and visual content. Each project here represents a specific brief, a specific challenge, and a specific outcome."
};

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
          const cachedProj = localStorage.getItem('portfolio_projects_v17');
          if (cachedProj) setProjects(JSON.parse(cachedProj));
        }

        // Fetch Settings
        const fetchSetting = async (key, setter, defaultVal, localKey) => {
          const res = await fetch(`${API_URL}/settings/${key}`);
          if (res.ok) {
            const data = await res.json();
            setter(data);
          } else {
            const cached = localKey ? localStorage.getItem(localKey) : null;
            setter(cached ? JSON.parse(cached) : defaultVal); // Fallback to localStorage then default
          }
        };

        await Promise.all([
          fetchSetting('aboutParagraphs', setAboutParagraphs, defaultAboutParagraphs, 'portfolio_about_v17'),
          fetchSetting('profileDetails', setProfileDetails, defaultProfileDetails, 'portfolio_profile_v17'),
          fetchSetting('socialLinks', setSocialLinks, defaultSocialLinks, 'portfolio_social_v17'),
          fetchSetting('designTools', setDesignTools, defaultDesignTools, 'portfolio_tools_v17'),
          fetchSetting('workPageDetails', setWorkPageDetails, defaultWorkPageDetails, 'portfolio_workpage_v17'),
          fetchSetting('workShowcaseGif', setWorkShowcaseGif, null, 'portfolio_workshowcasegif_v17'),
        ]);
        
      } catch (error) {
        console.error('Failed to fetch from backend, using defaults/local cache.', error);
        // Fallback to localStorage if backend is down
        const cachedProjects = localStorage.getItem('portfolio_projects_v18');
        if (cachedProjects) setProjects(JSON.parse(cachedProjects));
        
        const cachedAbout = localStorage.getItem('portfolio_about_v17');
        if (cachedAbout) setAboutParagraphs(JSON.parse(cachedAbout));

        const cachedProfile = localStorage.getItem('portfolio_profile_v17');
        if (cachedProfile) setProfileDetails(JSON.parse(cachedProfile));

        const cachedSocial = localStorage.getItem('portfolio_social_v17');
        if (cachedSocial) setSocialLinks(JSON.parse(cachedSocial));

        const cachedTools = localStorage.getItem('portfolio_tools_v17');
        if (cachedTools) setDesignTools(JSON.parse(cachedTools));

        const cachedWorkPage = localStorage.getItem('portfolio_workpage_v17');
        if (cachedWorkPage) setWorkPageDetails(JSON.parse(cachedWorkPage));

        const cachedGif = localStorage.getItem('portfolio_workshowcasegif_v17');
        if (cachedGif) setWorkShowcaseGif(JSON.parse(cachedGif));
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
    localStorage.setItem('portfolio_about_v17', JSON.stringify(newParagraphs)); // fallback
  };

  const addProject = async (formData) => {
    try {
      const token = localStorage.getItem('portfolio_admin_token');
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData, // FormData sends multipart/form-data
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects([...projects, newProject]);
      } else if (res.status === 401) {
        localStorage.removeItem('portfolio_admin_token');
        alert('Session expired. Please login again.');
        window.location.href = '/admin/login';
      } else {
        alert('Failed to add project to backend');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Backend not connected! Check console.');
    }
  };

  const updateProject = async (id, formData) => {
    try {
      const token = localStorage.getItem('portfolio_admin_token');
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      if (res.ok) {
        const updatedProject = await res.json();
        setProjects(projects.map(p => p._id === id ? updatedProject : p));
      } else if (res.status === 401) {
        localStorage.removeItem('portfolio_admin_token');
        alert('Session expired. Please login again.');
        window.location.href = '/admin/login';
      } else if (res.status === 404) {
         // Project not found in backend. It's a local/default project.
         // We should CREATE it instead!
         const createRes = await fetch(`${API_URL}/projects`, {
           method: 'POST',
           headers: { 'Authorization': `Bearer ${token}` },
           body: formData
         });
         if (createRes.ok) {
           const newProject = await createRes.json();
           setProjects(projects.map(p => (p._id === id || p.id === id) ? newProject : p));
         } else {
           alert('Failed to save local project to database');
         }
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to update project: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Backend not connected!');
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
        setProjects(projects.filter(p => p._id !== id));
      } else if (res.status === 401) {
        localStorage.removeItem('portfolio_admin_token');
        alert('Session expired. Please login again.');
        window.location.href = '/admin/login';
      } else if (res.status === 404) {
         // It might just be local
         const newProjects = [...projects];
         newProjects.splice(fallbackIndex, 1);
         setProjects(newProjects);
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
    localStorage.setItem('portfolio_profile_v17', JSON.stringify(newDetails));
  };

  const updateSocialLinks = (newLinks) => {
    setSocialLinks(newLinks);
    saveSetting('socialLinks', newLinks);
    localStorage.setItem('portfolio_social_v17', JSON.stringify(newLinks));
  };

  const updateDesignTools = (newTools) => {
    setDesignTools(newTools);
    saveSetting('designTools', newTools);
    localStorage.setItem('portfolio_tools_v17', JSON.stringify(newTools));
  };

  const updateWorkPageDetails = (newDetails) => {
    setWorkPageDetails(newDetails);
    saveSetting('workPageDetails', newDetails);
    localStorage.setItem('portfolio_workpage_v17', JSON.stringify(newDetails));
  };

  const updateWorkShowcaseGif = (newGifUrl) => {
    setWorkShowcaseGif(newGifUrl);
    saveSetting('workShowcaseGif', newGifUrl);
    localStorage.setItem('portfolio_workshowcasegif_v17', JSON.stringify(newGifUrl));
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
