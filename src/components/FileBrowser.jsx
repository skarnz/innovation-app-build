import React from 'react';

// Placeholder component for browsing files and folders
// Expects `files` prop: array of { id, name, type: 'file'/'folder', ...otherMetadata }
// Expects `onSelectFile` and `onOpenFolder` callbacks
function FileBrowser({ files = [], onSelectFile, onOpenFolder }) {

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      onOpenFolder(item.id); // Or pass item.path, etc.
    } else {
      onSelectFile(item.id); // Or pass item object
    }
  };

  return (
    <div className="file-browser">
      <h3>File Browser</h3>
      {files.length === 0 ? (
        <p>No files or folders found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {files.map((item) => (
            <li 
              key={item.id} 
              onClick={() => handleItemClick(item)} 
              style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #eee' }}
            >
              {item.type === 'folder' ? '[+] ' : '[F] '}{item.name}
            </li>
          ))}
        </ul>
      )}
      {/* Add search, sort, view options later */}
    </div>
  );
}

export default FileBrowser; 