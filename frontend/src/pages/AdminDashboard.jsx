import { useContext, useState } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

export default function AdminDashboard() {
  const { 
    aboutParagraphs, 
    updateAboutParagraphs, 
    projects, 
    addProject, 
    deleteProject,
    profileDetails,
    updateProfileDetails,
    socialLinks,
    updateSocialLinks,
    designTools,
    updateDesignTools
  } = useContext(PortfolioContext);

  const [editAbout, setEditAbout] = useState(aboutParagraphs.join('\n\n'));
  
  const [newProject, setNewProject] = useState({
    title: '', category: '', description: '', industry: '', location: '', year: '', tags: '', image: ''
  });

  const [editProfile, setEditProfile] = useState(profileDetails);
  const [editSocial, setEditSocial] = useState(socialLinks);
  const [newTool, setNewTool] = useState({ name: '', text: 'text-gray-900', bg: 'bg-gray-100', border: 'border-gray-200', icon: 'https://cdn.simpleicons.org/react/61DAFB' });

  const handleSaveAbout = () => {
    const paragraphs = editAbout.split('\n\n').filter(p => p.trim() !== '');
    updateAboutParagraphs(paragraphs);
    alert('About section updated successfully!');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    const projectToAdd = {
      ...newProject,
      id: Date.now(),
      tags: newProject.tags ? newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
    };
    addProject(projectToAdd);
    setNewProject({
      title: '', category: '', description: '', industry: '', location: '', year: '', tags: '', image: ''
    });
    alert('Project added successfully!');
  };

  const handleProjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size too large! Please upload an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({ ...newProject, image: reader.result });
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
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for localStorage
        alert('File size too large! Please upload a PDF under 2MB.');
        return;
      }
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

  const handleAddTool = (e) => {
    e.preventDefault();
    if (!newTool.name) return;
    updateDesignTools([...designTools, { ...newTool, id: Date.now() }]);
    setNewTool({ name: '', text: 'text-gray-900', bg: 'bg-gray-100', border: 'border-gray-200', icon: 'https://cdn.simpleicons.org/react/61DAFB' });
    alert('Tool added successfully!');
  };

  const handleDeleteTool = (index) => {
    const tools = [...designTools];
    tools.splice(index, 1);
    updateDesignTools(tools);
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
              <input type="text" placeholder="Project Title" required className="p-3 border rounded" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
              <input type="text" placeholder="Category (e.g., UX/UI Design)" required className="p-3 border rounded" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} />
              <input type="text" placeholder="Industry (e.g., Finance)" className="p-3 border rounded" value={newProject.industry} onChange={e => setNewProject({...newProject, industry: e.target.value})} />
              <input type="text" placeholder="Location (e.g., New York)" className="p-3 border rounded" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} />
              <input type="text" placeholder="Year (e.g., 2024)" className="p-3 border rounded" value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})} />
              <input type="text" placeholder="Tags (comma separated)" className="p-3 border rounded" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} />
            </div>
            <textarea placeholder="Project Description" required className="w-full p-3 border rounded h-24" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />

            <div>
              <label className="block text-sm font-semibold mb-2">Or Upload Project Image (Max 2MB)</label>
              <input type="file" accept="image/*" onChange={handleProjectImageUpload} className="w-full p-2 border rounded" />
              {newProject.image && <p className="text-sm text-green-600 mt-2">Image attached.</p>}
            </div>

            <button type="submit" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              Add Project
            </button>
          </form>
        </div>

        {/* Existing Projects */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Manage Projects</h2>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div>
                  <h3 className="font-bold text-gray-900">{proj.title}</h3>
                  <p className="text-sm text-gray-500">{proj.category}</p>
                </div>
                <button 
                  onClick={() => { if(window.confirm('Delete this project?')) deleteProject(idx) }}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-500">No projects yet.</p>}
          </div>
        </div>

        {/* Manage Design Toolkit */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Manage Design Toolkit</h2>
          <form onSubmit={handleAddTool} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input type="text" placeholder="Tool Name (e.g., Figma)" required className="p-3 border rounded" value={newTool.name} onChange={e => setNewTool({...newTool, name: e.target.value})} />
            <input type="url" placeholder="Icon URL (cdn.simpleicons.org/...)" required className="p-3 border rounded" value={newTool.icon} onChange={e => setNewTool({...newTool, icon: e.target.value})} />
            <button type="submit" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              Add Tool
            </button>
          </form>
          <div className="space-y-4">
            {designTools.map((tool, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-4">
                  <img src={tool.icon} alt={tool.name} className="w-8 h-8 object-contain" />
                  <h3 className="font-bold text-gray-900">{tool.name}</h3>
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
