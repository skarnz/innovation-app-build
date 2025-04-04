import React from 'react';

// Placeholder component for previewing a selected file
// Expects `file` prop: object like { id, name, type, url?, content? }
function FilePreview({ file }) {

  if (!file) {
    return <div className="file-preview-placeholder">Select a file to preview.</div>;
  }

  const renderPreview = () => {
    // Add logic based on file type later (image, text, pdf, etc.)
    if (file.type && file.type.startsWith('image/')) {
        return <img src={file.url || '#'} alt={`Preview of ${file.name}`} style={{ maxWidth: '100%', maxHeight: '400px' }} />;
    } else if (file.type && file.type.startsWith('text/') && file.content) {
        return <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{file.content}</pre>;
    } else {
        // Fallback for unsupported types or missing data
        return (
            <div>
                <p><strong>Name:</strong> {file.name}</p>
                <p><strong>Type:</strong> {file.type || 'Unknown'}</p>
                <p>Preview not available for this file type.</p>
                {file.url && <p><a href={file.url} target="_blank" rel="noopener noreferrer">Download File</a></p>}
            </div>
        );
    }
  };

  return (
    <div className="file-preview">
      <h3>File Preview: {file.name}</h3>
      <div style={{ border: '1px solid #eee', padding: '10px', minHeight: '100px' }}>
        {renderPreview()}
      </div>
    </div>
  );
}

export default FilePreview; 