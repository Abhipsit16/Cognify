import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function CreatePost() {
  const { user } = useUser();
  const [postType, setPostType] = useState('');
  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    type: '',
    authorID: '',
    Post_tags: '',
    dataSample: null,
    dataLink: '',
    accessLevel: 'public',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, dataSample: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData: {
      heading: string;
      content: string;
      type: string;
      authorID: string;
      Post_tags: string;
      dataLink: string;
      accessLevel: string;
      dataSample?: string | ArrayBuffer | null;
    } = {
      heading: formData.heading,
      content: formData.content,
      type: formData.type,
      authorID: user?.id || '',
      Post_tags: formData.Post_tags,
      dataLink: formData.dataLink || '',
      accessLevel: formData.accessLevel
    };

    // If there's a dataSample file, handle it
    if (formData.dataSample) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.dataSample);
      reader.onload = async () => {
        postData.dataSample = reader.result;
        await sendPostRequest(postData);
      };
    } else {
      await sendPostRequest(postData);
    }
  };

  const sendPostRequest = async (postData) => {
    try {
      const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      if (result.success) {
        // Reset form after successful submission
        setFormData({
          heading: '',
          content: '',
          type: '',
          authorID: '',
          Post_tags: '',
          dataSample: null /* or null */,
          dataLink: '',
          accessLevel: 'public',
        });
        setPostType('');
        alert('Post created successfully!');
      } else {
        alert('Error creating post: ' + result.error);
      }
    } catch (error) {
      alert('Error creating post: ' + error.message);
    }
  };

  return (
<div className='p-4  width-full'>
    <div className="max-w-2xl mx-auto p-6 bg-amber-100 rounded-lg shadow-md">
      <h2 className='text-2xl font-bold mb-4 '>Create Post</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <select 
          name="type" 
          value={formData.type} 
          onChange={(e) => {
            handleChange(e);
            setPostType(e.target.value);
          }}
          required
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Type</option>
          <option value="announceRepo">Announce Repo</option>
          <option value="dataRequest">Data Request</option>
        </select>

        {postType === 'announceRepo' && (
          <>
            <input 
              type="text" 
              name="heading" 
              value={formData.heading} 
              onChange={handleChange} 
              placeholder="Title" 
              required 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input 
              type="file" 
              name="dataSample" 
              onChange={handleFileChange} 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input 
              type="text" 
              name="dataLink" 
              value={formData.dataLink} 
              onChange={handleChange} 
              placeholder="Data Link" 
              required 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              placeholder="Content" 
              required 
              className="p-3 border border-gray-300 rounded-md min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input 
              type="text" 
              name="Post_tags" 
              value={formData.Post_tags} 
              onChange={handleChange} 
              placeholder="Tags (comma separated)" 
              required 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select 
              name="accessLevel" 
              value={formData.accessLevel} 
              onChange={handleChange} 
              required
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="public">Public</option>
              <option value="restricted">Restricted</option>
            </select>
          </>
        )}

        {postType === 'dataRequest' && (
          <>
            <input 
              type="text" 
              name="heading" 
              value={formData.heading} 
              onChange={handleChange} 
              placeholder="Heading" 
              required 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              placeholder="Description" 
              required 
              className="p-3 border border-gray-300 rounded-md min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input 
              type="text" 
              name="Post_tags" 
              value={formData.Post_tags} 
              onChange={handleChange} 
              placeholder="Tags (comma separated)" 
              required 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </>
        )}

        <button 
          type="submit" 
          className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Post
        </button>
      </form>
    </div>
    </div>
  );
}
