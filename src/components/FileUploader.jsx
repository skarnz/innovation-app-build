import React, { useState, useCallback } from 'react';

// Placeholder component for file uploading with drag-and-drop
// Expects `onUpload` callback: function that receives the FileList
function FileUploader({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (onUpload) {
        onUpload(e.dataTransfer.files);
      }
      e.dataTransfer.clearData(); // Recommended
    }
  }, [onUpload]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
       if (onUpload) {
         onUpload(e.target.files);
       }
    }
  };

  const dropzoneStyle = {
    border: `2px dashed ${isDragging ? '#007bff' : '#ccc'}`,
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: isDragging ? '#f0f8ff' : '#f9f9f9',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <div className="file-uploader">
      <h3>Upload Files</h3>
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        id="file-input"
        style={{ display: 'none' }} // Hide default input, trigger with label/dropzone
      />

      <label htmlFor="file-input">
          <div 
            style={dropzoneStyle}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {isDragging ? 'Drop files here' : 'Drag and drop files here, or click to select files'}
          </div>
      </label>
      {/* Add progress indicators later */}
    </div>
  );
}

export default FileUploader; 