import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PortfolioContext } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useContext(PortfolioContext);
  const [project, setProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Handle scroll for Navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // ID could be _id (MongoDB) or id (local fallback)
    const found = projects.find(p => p._id === id || p.id === id || p.id === parseInt(id));
    if (found) {
      setProject(found);
    } else if (projects.length > 0) {
      // If projects are loaded but this one isn't found, maybe go back to work
      // navigate('/work');
    }
  }, [id, projects, navigate]);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // Helper to extract YouTube ID
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 selection:bg-gray-200 selection:text-black overflow-x-hidden">
      <Navbar scrolled={scrolled} activeSection="" loading={false} isDarkTheme={false} />
      
      <main className="pt-[100px] pb-20 px-4 md:px-6 w-full mx-auto">
        
        {/* Hero Section */}
        <div className="w-full mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-gray-100 shadow-sm"
          >
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-auto block" />
            )}
          </motion.div>
        </div>

        {/* Intro & Details Split Section */}
        <div className="w-full mx-auto flex flex-col md:flex-row gap-16 md:gap-32 mb-24 mt-8 md:mt-16">
          {/* Left: Introduction */}
          <div className="w-full md:w-[55%]">
            <h3 className="text-sm md:text-base text-gray-900 mb-16 md:mb-24">Introduction</h3>
            {project.description && (
              <p className="text-base leading-relaxed text-[#333333] font-sans whitespace-pre-wrap">
                {project.description}
              </p>
            )}
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-[45%] mt-12 md:mt-0">
            <h3 className="text-sm md:text-base text-gray-900 mb-16 md:mb-24">Details</h3>
            <div className="flex flex-col w-full border-t border-gray-300">
              <div className="flex justify-between items-center py-4 border-b border-gray-300">
                <span className="text-gray-500 font-sans text-sm">Project Name</span>
                <span className="font-medium text-right text-gray-900 font-sans text-sm">{project.title}</span>
              </div>
              {project.year && (
                <div className="flex justify-between items-center py-4 border-b border-gray-300">
                  <span className="text-gray-500 font-sans text-sm">Timeframe</span>
                  <span className="font-medium text-right text-gray-900 font-sans text-sm">{project.year}</span>
                </div>
              )}
              {project.category && (
                <div className="flex justify-between items-center py-4 border-b border-gray-300">
                  <span className="text-gray-500 font-sans text-sm">Role</span>
                  <span className="font-medium text-right text-gray-900 font-sans text-sm">{project.category}</span>
                </div>
              )}
              {project.branding && (
                <div className="flex justify-between items-center py-4 border-b border-gray-300">
                  <span className="text-gray-500 font-sans text-sm">Branding</span>
                  <span className="font-medium text-right text-gray-900 font-sans text-sm">{project.branding}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Builder Blocks */}
        <div className="w-full flex flex-col gap-12 md:gap-16 mb-32">
          {project.contentBlocks && project.contentBlocks.map((block, index) => {
            if (!block.content) return null; // "ye hatao" - hides broken empty images

            if (block.type === 'text') {
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans whitespace-pre-wrap">
                    {block.content}
                  </p>
                </motion.div>
              );
            }

            if (block.type === 'image') {
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-gray-100 shadow-sm"
                >
                  <img src={block.content} alt={`Project block ${index}`} className="w-full h-auto block" />
                </motion.div>
              );
            }

            if (block.type === 'youtube') {
              const videoId = getYouTubeId(block.content);
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full aspect-video rounded-[24px] md:rounded-[32px] overflow-hidden bg-gray-100 shadow-sm"
                >
                  {videoId ? (
                    <iframe 
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`} 
                      title="YouTube video player" 
                      className="w-full h-full border-0 block"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen 
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Invalid YouTube URL</div>
                  )}
                </motion.div>
              );
            }

            return null;
          })}
        </div>
      </main>

      <Contact />
    </div>
  );
}
