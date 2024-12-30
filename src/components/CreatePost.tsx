import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import styles from './CreatePost.module.css';

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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <select 
          name="type" 
          value={formData.type} 
          onChange={(e) => {
            handleChange(e);
            setPostType(e.target.value);
          }}
          required
        >
          <option value="">Select Type</option>
          <option value="announceRepo">Announce Repo</option>
          <option value="dataRequest">Data Request</option>
        </select>

        {postType === 'announceRepo' && (
          <>
            <input type="text" name="heading" value={formData.heading} onChange={handleChange} placeholder="Title" required />
            <input type="file" name="dataSample" onChange={handleFileChange} />
            <input type="text" name="dataLink" value={formData.dataLink} onChange={handleChange} placeholder="Data Link" required />
            <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
            <input type="text" name="Post_tags" value={formData.Post_tags} onChange={handleChange} placeholder="Tags (comma separated)" required />
            <select name="accessLevel" value={formData.accessLevel} onChange={handleChange} required>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="restricted">Restricted</option>
            </select>
          </>
        )}

        {postType === 'dataRequest' && (
          <>
            <input type="text" name="heading" value={formData.heading} onChange={handleChange} placeholder="Heading" required />
            <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Description" required />
            <input type="text" name="Post_tags" value={formData.Post_tags} onChange={handleChange} placeholder="Tags (comma separated)" required />
          </>
        )}

        <button type="submit" className={styles.submitButton}>Create Post</button>
      </form>
    </div>
  );
}
