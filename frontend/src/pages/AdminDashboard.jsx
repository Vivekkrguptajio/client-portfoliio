import { useContext, useState, useRef } from 'react';
import { PortfolioContext, API_URL, defaultDesignTools } from '../context/PortfolioContext';
import { uploadWithProgress } from '../utils/uploadWithProgress';

export default function AdminDashboard() {
  const { 
    aboutParagraphs, 
    updateAboutParagraphs, 
    projects, 
    addProject, 
    deleteProject,
    updateProject,
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
  } = useContext(PortfolioContext);

  const [editAbout, setEditAbout] = useState(aboutParagraphs.join('\n\n'));
  const [isUploadingGif, setIsUploadingGif] = useState(false);
  const [gifUploadProgress, setGifUploadProgress] = useState(0);
  
  const [newProject, setNewProject] = useState({
    title: '', category: '', description: '', branding: '', industry: '', location: '', year: '', image: ''
  });
  const [newProjectImageFile, setNewProjectImageFile] = useState(null);
  const [newContentBlocks, setNewContentBlocks] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectUploadProgress, setProjectUploadProgress] = useState(0);

  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingProjectData, setEditingProjectData] = useState(null);
  const [editingProjectImageFile, setEditingProjectImageFile] = useState(null);
  const [editingContentBlocks, setEditingContentBlocks] = useState([]);
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);
  const [editProjectUploadProgress, setEditProjectUploadProgress] = useState(0);

  const [editProfile, setEditProfile] = useState(profileDetails);
  const [editSocial, setEditSocial] = useState(socialLinks);
  const [newTool, setNewTool] = useState({ name: '', icon: '', color: '#000000' });
  const [newToolIconFile, setNewToolIconFile] = useState(null);
  const [isUploadingTool, setIsUploadingTool] = useState(false);
  const [toolUploadProgress, setToolUploadProgress] = useState(0);
  const [editWorkPage, setEditWorkPage] = useState(workPageDetails);

  const handleSaveAbout = () => {
    const paragraphs = editAbout.split('\n\n').filter(p => p.trim() !== '');
    updateAboutParagraphs(paragraphs);
    alert('About section updated successfully!');
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    
    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('category', newProject.category);
    formData.append('branding', newProject.branding);
    formData.append('industry', newProject.industry);
    formData.append('location', newProject.location);
    formData.append('year', newProject.year);
    formData.append('description', newProject.description);
    
    if (newProjectImageFile) {
      formData.append('image', newProjectImageFile);
    }
    formData.append('contentBlocks', JSON.stringify(newContentBlocks));

    setIsAddingProject(true);
    setProjectUploadProgress(0);
    await addProject(formData, (percent) => setProjectUploadProgress(percent));
    setIsAddingProject(false);
    
    setNewProject({
      title: '', category: '', description: '', industry: '', location: '', year: '', tags: '', image: ''
    });
    setNewProjectImageFile(null);
    setNewContentBlocks([]);
    setProjectUploadProgress(0);
    alert('Project successfully saved!');
  };

  const handleProjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProjectImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({ ...newProject, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (!editingProjectData.title || !editingProjectData.description) return;
    
    const formData = new FormData();
    formData.append('title', editingProjectData.title);
    formData.append('category', editingProjectData.category);
    formData.append('branding', editingProjectData.branding);
    formData.append('industry', editingProjectData.industry);
    formData.append('location', editingProjectData.location);
    formData.append('year', editingProjectData.year);
    formData.append('description', editingProjectData.description);
    
    if (editingProjectImageFile) {
      formData.append('image', editingProjectImageFile);
    } else if (editingProjectData.image) {
      formData.append('existingImage', editingProjectData.image);
    }
    formData.append('contentBlocks', JSON.stringify(editingContentBlocks));
    
    const projectId = projects[editingProjectIndex]._id || projects[editingProjectIndex].id;
    setIsUpdatingProject(true);
    setEditProjectUploadProgress(0);
    await updateProject(projectId, formData, (percent) => setEditProjectUploadProgress(percent));
    setIsUpdatingProject(false);
    
    setEditingProjectIndex(null);
    setEditingProjectData(null);
    setEditingProjectImageFile(null);
    setEditingContentBlocks([]);
    setEditProjectUploadProgress(0);
    alert('Project successfully updated!');
  };

  const handleEditProjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingProjectImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProjectData({ ...editingProjectData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    updateProfileDetails(editProfile);
    alert('Profile details updated!');
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProfile({ ...editProfile, resumeLink: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSocial = () => {
    updateSocialLinks(editSocial);
    alert('Social links updated!');
  };

  const handleAddTool = async (e) => {
    e.preventDefault();
    if (!newTool.name) return;
    
    let finalIconUrl = newTool.icon;

    if (newToolIconFile) {
      setIsUploadingTool(true);
      const formData = new FormData();
      formData.append('image', newToolIconFile);
      const token = localStorage.getItem('portfolio_admin_token');
      try {
        setToolUploadProgress(0);
        const data = await uploadWithProgress(`${API_URL}/upload`, formData, token, 'POST', (percent) => setToolUploadProgress(percent));
        finalIconUrl = data.url;
      } catch (err) {
        console.error("Tool icon upload error", err);
        alert('Error uploading tool icon.');
        setIsUploadingTool(false);
        return;
      }
    }

    if (!finalIconUrl) {
      alert('Please provide an Icon URL or upload an image file.');
      return;
    }

    updateDesignTools([...designTools, { ...newTool, icon: finalIconUrl, id: Date.now() }]);
    setNewTool({ name: '', icon: '', color: '#000000' });
    setNewToolIconFile(null);
    setIsUploadingTool(false);
    setToolUploadProgress(0);
    alert('Tool added successfully!');
  };

  const handleLoadDefaultTools = () => {
    if (window.confirm('This will replace your current tools with the 20 default tools. Continue?')) {
      updateDesignTools(defaultDesignTools);
      alert('20 Default Tools loaded successfully!');
    }
  };

  const handleDeleteTool = (index) => {
    const tools = [...designTools];
    tools.splice(index, 1);
    updateDesignTools(tools);
  };

  const handleShowcaseGifUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingGif(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const token = localStorage.getItem('portfolio_admin_token');
      setGifUploadProgress(0);
      const data = await uploadWithProgress(`${API_URL}/upload`, formData, token, 'POST', (percent) => setGifUploadProgress(percent));
      updateWorkShowcaseGif(data.url);
      alert('Work Showcase GIF updated successfully!');
    } catch (err) {
      alert('Error uploading GIF: ' + (err.message || 'Unknown Error'));
    }
    setIsUploadingGif(false);
    setGifUploadProgress(0);
  };

  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [galleryUploadProgressPercent, setGalleryUploadProgressPercent] = useState(0);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const renderContentBuilder = (blocks, setBlocks) => {

    const addBlock = (type) => setBlocks([...blocks, { type, content: '' }]);
    
    const updateBlock = (index, content) => {
      const newBlocks = [...blocks];
      newBlocks[index].content = content;
      setBlocks(newBlocks);
    };

    const handleGalleryUpload = async (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;
      
      setIsUploadingGallery(true);
      setUploadProgress({ current: 0, total: files.length });
      const token = localStorage.getItem('portfolio_admin_token');
      const newImages = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress({ current: i + 1, total: files.length });
        
        const formData = new FormData();
        formData.append('image', file);
        try {
          setGalleryUploadProgressPercent(0);
          const data = await uploadWithProgress(`${API_URL}/upload`, formData, token, 'POST', (percent) => setGalleryUploadProgressPercent(percent));
          newImages.push({ type: 'image', content: data.url, cloudinary_id: data.cloudinary_id });
        } catch (err) {
          console.error("Gallery upload error", err);
        }
      }
      
      if (newImages.length > 0) {
        setBlocks([...blocks, ...newImages]);
      }
      setIsUploadingGallery(false);
      setUploadProgress({ current: 0, total: 0 });
      setGalleryUploadProgressPercent(0);
      e.target.value = null; // reset input
    };

    const removeBlock = (index) => {
      const newBlocks = [...blocks];
      newBlocks.splice(index, 1);
      setBlocks(newBlocks);
    };

    const moveBlockUp = (index) => {
      if (index === 0) return;
      const newBlocks = [...blocks];
      const temp = newBlocks[index - 1];
      newBlocks[index - 1] = newBlocks[index];
      newBlocks[index] = temp;
      setBlocks(newBlocks);
    };

    const moveBlockDown = (index) => {
      if (index === blocks.length - 1) return;
      const newBlocks = [...blocks];
      const temp = newBlocks[index + 1];
      newBlocks[index + 1] = newBlocks[index];
      newBlocks[index] = temp;
      setBlocks(newBlocks);
    };

    const handleDragStart = (e, index) => {
      dragItem.current = index;
    };

    const handleDragEnter = (e, index) => {
      dragOverItem.current = index;
    };

    const handleDragEnd = () => {
      if (dragItem.current !== undefined && dragOverItem.current !== undefined && dragItem.current !== dragOverItem.current) {
        const newBlocks = [...blocks];
        const draggedItem = newBlocks.splice(dragItem.current, 1)[0];
        newBlocks.splice(dragOverItem.current, 0, draggedItem);
        dragItem.current = undefined;
        dragOverItem.current = undefined;
        setBlocks(newBlocks);
      }
    };

    return (
      <div className="mt-6 border-t pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Project Details Builder</h3>
            <p className="text-sm text-gray-500">Build your project content by stacking text, images, and videos.</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button type="button" onClick={() => addBlock('text')} className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium text-sm transition-colors">Add Text</button>
            <button type="button" onClick={() => addBlock('youtube')} className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium text-sm transition-colors">Add YouTube</button>
          </div>
        </div>
        
        <div className="mb-8">
          <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg transition-colors ${isUploadingGallery ? 'bg-gray-200 border-gray-400 cursor-not-allowed' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer'}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploadingGallery ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mb-2"></div>
                  <p className="text-sm text-gray-700 font-semibold">Uploading {uploadProgress.current} of {uploadProgress.total} images... {galleryUploadProgressPercent > 0 && `(${galleryUploadProgressPercent}%)`}</p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700">Click to upload</span> multiple images (added to the end)</p>
                </div>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleGalleryUpload} 
              className="hidden"
              disabled={isUploadingGallery}
            />
          </label>
        </div>

        <div className="space-y-4">
          {blocks.map((block, idx) => {
            return (
              <div 
                key={idx} 
                className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm relative group flex gap-3 cursor-grab active:cursor-grabbing hover:border-gray-300 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragEnter={(e) => handleDragEnter(e, idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Drag Handle */}
                <div className="flex flex-col items-center justify-center text-gray-300 group-hover:text-gray-500 transition-colors px-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
                </div>
                
                <div className="flex-1 pr-12">
                  <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => removeBlock(idx)} className="text-red-500 font-bold hover:text-red-700 bg-red-50 hover:bg-red-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors" title="Delete block">&times;</button>
                    {idx > 0 && <button type="button" onClick={() => moveBlockUp(idx)} className="text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-lg" title="Move Up">↑</button>}
                    {idx < blocks.length - 1 && <button type="button" onClick={() => moveBlockDown(idx)} className="text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-lg" title="Move Down">↓</button>}
                  </div>
                  
                  {block.type === 'text' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Text Block</label>
                      <textarea 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                        rows="3" 
                        placeholder="Write your content here..." 
                        value={block.content}
                        onChange={(e) => updateBlock(idx, e.target.value)}
                      />
                    </div>
                  )}

                  {block.type === 'youtube' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">YouTube Video</label>
                      <input 
                        type="url" 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                        placeholder="Paste YouTube Link (e.g. https://youtube.com/watch?v=...)" 
                        value={block.content}
                        onChange={(e) => updateBlock(idx, e.target.value)}
                      />
                    </div>
                  )}

                  {block.type === 'image' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Image Block</label>
                      <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 inline-block pointer-events-none">
                        <img src={block.content} alt={`Gallery ${idx}`} className="max-h-48 object-contain" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-20 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Admin Dashboard</h1>
          <a href="/" className="text-blue-600 hover:underline">View Portfolio &rarr;</a>
        </div>

        {/* Edit Profile & Contact Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Edit Profile & Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="First Name" className="p-3 border rounded" value={editProfile.firstName} onChange={e => setEditProfile({...editProfile, firstName: e.target.value})} />
            <input type="text" placeholder="Last Name" className="p-3 border rounded" value={editProfile.lastName} onChange={e => setEditProfile({...editProfile, lastName: e.target.value})} />
            <input type="text" placeholder="Role (e.g., Designer)" className="p-3 border rounded" value={editProfile.role} onChange={e => setEditProfile({...editProfile, role: e.target.value})} />
            <input type="text" placeholder="Subtitle" className="p-3 border rounded" value={editProfile.subtitle} onChange={e => setEditProfile({...editProfile, subtitle: e.target.value})} />
            <input type="email" placeholder="Email" className="p-3 border rounded" value={editProfile.email} onChange={e => setEditProfile({...editProfile, email: e.target.value})} />
            <input type="text" placeholder="Phone" className="p-3 border rounded" value={editProfile.phone} onChange={e => setEditProfile({...editProfile, phone: e.target.value})} />
          </div>
          <textarea placeholder="Hero Description" className="w-full p-3 border rounded h-20 mb-4" value={editProfile.description} onChange={e => setEditProfile({...editProfile, description: e.target.value})} />
          
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Upload Resume (PDF, Max 2MB)</label>
            <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="w-full p-2 border rounded" />
            {editProfile.resumeLink !== '#' && <p className="text-sm text-green-600 mt-2">Resume is currently attached.</p>}
          </div>

          <button onClick={handleSaveProfile} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Save Profile Details
          </button>
        </div>

        {/* Edit Social Links Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Edit Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input type="url" placeholder="LinkedIn URL" className="p-3 border rounded" value={editSocial.linkedin} onChange={e => setEditSocial({...editSocial, linkedin: e.target.value})} />
            <input type="url" placeholder="Behance URL" className="p-3 border rounded" value={editSocial.behance} onChange={e => setEditSocial({...editSocial, behance: e.target.value})} />
            <input type="url" placeholder="Instagram URL" className="p-3 border rounded" value={editSocial.instagram} onChange={e => setEditSocial({...editSocial, instagram: e.target.value})} />
          </div>
          <button onClick={handleSaveSocial} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Save Social Links
          </button>
        </div>

        {/* Edit Work Page Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Edit "My Work" Page Hero Text</h2>
          <textarea placeholder="Main Title (e.g. More than one hundred projects...)" className="w-full p-3 border rounded h-20 mb-4" value={editWorkPage.title} onChange={e => setEditWorkPage({...editWorkPage, title: e.target.value})} />
          <textarea placeholder="Subtitle/Description (e.g. A curated collection of projects...)" className="w-full p-3 border rounded h-24 mb-4" value={editWorkPage.description} onChange={e => setEditWorkPage({...editWorkPage, description: e.target.value})} />
          <button onClick={() => {
            updateWorkPageDetails(editWorkPage);
            alert('Work Page details updated!');
          }} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Save Work Page Details
          </button>
        </div>

        {/* Edit Work Showcase GIF Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Edit Work Showcase GIF</h2>
          <p className="text-sm text-gray-500 mb-4">Upload a new GIF or Image to replace the default 'word.gif' shown above the Latest Work section.</p>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {workShowcaseGif && (
              <div className="w-48 h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                <img src={workShowcaseGif} alt="Current Showcase GIF" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="w-full">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors ${isUploadingGif ? 'bg-gray-200 border-gray-400 cursor-not-allowed' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isUploadingGif ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
                      <p className="text-sm text-gray-700 font-semibold">Uploading... {gifUploadProgress > 0 && `${gifUploadProgress}%`}</p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> new GIF</p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleShowcaseGifUpload} 
                  className="hidden"
                  disabled={isUploadingGif}
                />
              </label>
              {workShowcaseGif && (
                <button 
                  onClick={() => updateWorkShowcaseGif(null)} 
                  className="mt-4 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                >
                  Reset to Default GIF
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Edit About Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Edit "About" Section</h2>
          <p className="text-sm text-gray-500 mb-4">Separate paragraphs with double newlines (Enter twice).</p>
          <textarea 
            className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-y"
            value={editAbout}
            onChange={(e) => setEditAbout(e.target.value)}
          />
          <button 
            onClick={handleSaveAbout}
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Save About Text
          </button>
        </div>

        {/* Add Project Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Project Name (Title)" required className="p-3 border rounded" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
              <input type="text" placeholder="Role (e.g. Branding)" required className="p-3 border rounded" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} />
              <input type="text" placeholder="Location (e.g. New York)" className="p-3 border rounded" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} />
              <input type="text" placeholder="Industry (e.g. Finance)" className="p-3 border rounded" value={newProject.industry} onChange={e => setNewProject({...newProject, industry: e.target.value})} />
              <input type="text" placeholder="Branding (e.g. ThePresents.com)" className="p-3 border rounded" value={newProject.branding} onChange={e => setNewProject({...newProject, branding: e.target.value})} />
              <input type="text" placeholder="Timeframe (e.g. 2 Month)" className="p-3 border rounded" value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})} />
            </div>
            <textarea placeholder="Project Description" required className="w-full p-3 border rounded h-24" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />

            <div>
              <label className="block text-sm font-semibold mb-2">Or Upload Project Image (Max 2MB)</label>
              <input type="file" accept="image/*" onChange={handleProjectImageUpload} className="w-full p-2 border rounded" />
              {newProject.image && <p className="text-sm text-green-600 mt-2">Image attached.</p>}
            </div>

            {renderContentBuilder(newContentBlocks, setNewContentBlocks)}

            <button type="submit" disabled={isAddingProject} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-600">
              {isAddingProject ? `Adding Project... ${projectUploadProgress > 0 ? `(${projectUploadProgress}%)` : ''}` : 'Add Project'}
            </button>
          </form>
        </div>

        {/* Existing Projects */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Manage Projects (Latest works are first 3)</h2>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                {editingProjectIndex === idx ? (
                  <form onSubmit={handleUpdateProject} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Project Name (Title)" required className="p-3 border rounded" value={editingProjectData.title} onChange={e => setEditingProjectData({...editingProjectData, title: e.target.value})} />
                      <input type="text" placeholder="Role (e.g. Branding)" required className="p-3 border rounded" value={editingProjectData.category} onChange={e => setEditingProjectData({...editingProjectData, category: e.target.value})} />
                      <input type="text" placeholder="Location (e.g. New York)" className="p-3 border rounded" value={editingProjectData.location} onChange={e => setEditingProjectData({...editingProjectData, location: e.target.value})} />
                      <input type="text" placeholder="Industry (e.g. Finance)" className="p-3 border rounded" value={editingProjectData.industry} onChange={e => setEditingProjectData({...editingProjectData, industry: e.target.value})} />
                      <input type="text" placeholder="Branding (e.g. ThePresents.com)" className="p-3 border rounded" value={editingProjectData.branding} onChange={e => setEditingProjectData({...editingProjectData, branding: e.target.value})} />
                      <input type="text" placeholder="Timeframe (e.g. 2 Month)" className="p-3 border rounded" value={editingProjectData.year} onChange={e => setEditingProjectData({...editingProjectData, year: e.target.value})} />
                    </div>
                    <textarea placeholder="Project Description" required className="w-full p-3 border rounded h-24" value={editingProjectData.description} onChange={e => setEditingProjectData({...editingProjectData, description: e.target.value})} />
                    <div>
                      <label className="block text-sm font-semibold mb-2">Upload New Image (Max 2MB)</label>
                      <input type="file" accept="image/*" onChange={handleEditProjectImageUpload} className="w-full p-2 border rounded" />
                      {editingProjectData.image && <img src={editingProjectData.image} alt="Preview" className="h-20 w-32 object-cover mt-2 rounded" />}
                    </div>

                    {renderContentBuilder(editingContentBlocks, setEditingContentBlocks)}
                    <div className="flex gap-2">
                      <button type="submit" disabled={isUpdatingProject} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-600">
                        {isUpdatingProject ? `Saving... ${editProjectUploadProgress > 0 ? `(${editProjectUploadProgress}%)` : ''}` : 'Save Changes'}
                      </button>
                      <button type="button" onClick={() => setEditingProjectIndex(null)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 flex flex-wrap items-center gap-2">
                        {proj.title}
                        {idx < 3 && <span className="text-[10px] uppercase font-bold tracking-wider bg-black text-white px-2 py-1 rounded-full">Latest Work Card {idx + 1}</span>}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{proj.category} &middot; {proj.industry}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingProjectIndex(idx);
                          setEditingProjectData({ ...proj });
                          setEditingContentBlocks(proj.contentBlocks || []);
                        }}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => { if(window.confirm('Delete this project?')) deleteProject(proj._id || proj.id, idx) }}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-500">No projects yet.</p>}
          </div>
        </div>

        {/* Manage Design Toolkit */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Design Toolkit</h2>
            <button 
              onClick={handleLoadDefaultTools}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
            >
              Load 20 Default Tools
            </button>
          </div>
          <form onSubmit={handleAddTool} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <input type="text" placeholder="Tool Name (e.g., Figma)" required className="p-3 border rounded" value={newTool.name} onChange={e => setNewTool({...newTool, name: e.target.value})} />
            <input type="url" placeholder="Icon URL (Optional if uploading)" className="p-3 border rounded" value={newTool.icon} onChange={e => setNewTool({...newTool, icon: e.target.value})} />
            <input type="file" accept="image/*" className="p-2 border rounded bg-white text-sm" onChange={e => setNewToolIconFile(e.target.files[0])} />
            <div className="flex items-center gap-2 border rounded p-2 bg-white">
              <label className="text-sm text-gray-600 flex-1 pl-2">Brand Color:</label>
              <input type="color" className="w-10 h-10 rounded cursor-pointer" value={newTool.color} onChange={e => setNewTool({...newTool, color: e.target.value})} />
            </div>
            <button type="submit" disabled={isUploadingTool} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-500">
              {isUploadingTool ? `Uploading... ${toolUploadProgress > 0 ? `(${toolUploadProgress}%)` : ''}` : 'Add Tool'}
            </button>
          </form>
          <div className="space-y-4">
            {designTools.map((tool, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-4">
                  <img src={tool.icon} alt={tool.name} className="w-8 h-8 object-contain" />
                  <h3 className="font-bold" style={{ color: tool.color || '#111827' }}>{tool.name}</h3>
                </div>
                <button 
                  onClick={() => { if(window.confirm('Delete this tool?')) handleDeleteTool(idx) }}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
