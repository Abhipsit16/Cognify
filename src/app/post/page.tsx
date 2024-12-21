"use client"
import React, { useState } from 'react';

const PostCreator = () => {
  const [text, setText] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // For file preview

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    const postData = {
      text,
      hashtags: hashtags.split(' ').filter(tag => tag.startsWith('#')),
      file,
    };
    console.log('Post Submitted:', postData);
    alert('Post submitted successfully!');
    setText('');
    setHashtags('');
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto mt-32">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create a Post</h2>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-black"
        rows={4}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-black"
        placeholder="Add hashtags (e.g., #fun #coding)"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />
      <input
        type="file"
        className="w-full mb-4"
        onChange={handleFileChange}
      />
      {file && preview && (
        <div className="mt-4 w-full border border-gray-300 p-3 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">File preview:</p>
          {file?.type.startsWith('image/') && (
            <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
          )}
          {file?.type === 'application/pdf' && (
            <iframe
              src={preview}
              title="PDF Preview"
              className="w-full h-64 border border-gray-300 rounded-lg"
            ></iframe>
          )}
          {file?.type.startsWith('text/') && (
            <textarea
              className="w-full h-32 border border-gray-300 rounded-lg p-2"
              value={preview}
              readOnly
            ></textarea>
          )}
          {!file?.type.startsWith('image/') &&
            file?.type !== 'application/pdf' &&
            !file?.type.startsWith('text/') && (
              <p className="text-gray-800">{file?.name}</p>
            )}
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
      >
        Post
      </button>
    </div>
  );
};

export default PostCreator;
