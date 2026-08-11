import React, { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';
import '../admin.css';

const ImageUpload = ({ value, onChange, label, hint, className = '', size = 'md' }) => {
  const fileInputRef = useRef(null);
  const [mode, setMode] = useState('url');
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be under 2MB. Please compress your image first, or use a URL instead.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={`a-img-upload ${className}`}>
      {label && (
        <div>
          <div className="a-label">{label}</div>
          {hint && <div className="a-hint" style={{ marginTop: 2 }}>{hint}</div>}
        </div>
      )}

      {/* Mode toggle */}
      <div className="a-img-mode-toggle">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`a-img-mode-btn${mode === 'upload' ? ' active' : ''}`}
        >
          <Upload size={12} /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`a-img-mode-btn${mode === 'url' ? ' active' : ''}`}
        >
          <LinkIcon size={12} /> Use URL
        </button>
      </div>

      <div className="a-img-row">
        <div className="a-img-input-area">
          {mode === 'url' ? (
            <div className="a-img-url-input">
              <span className="icon"><LinkIcon size={14} /></span>
              <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/image.png"
                className="a-input"
                style={{ paddingLeft: 38 }}
              />
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div
                className={`a-img-dropzone${isDragging ? ' dragging' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <div className={`a-img-dropzone-icon${isDragging ? ' dragging' : ''}`}>
                  <Upload size={15} />
                </div>
                <p className="primary-text">
                  <span>Click to browse</span> or drag image here
                </p>
                <p className="secondary-text">Max 2MB &middot; PNG, JPG, SVG, WebP</p>
              </div>

              {value && value.startsWith('data:image') && (
                <div className="a-img-uploaded-msg">
                  <CheckCircle2 size={13} />
                  Image uploaded ({Math.round(value.length / 1024)} KB encoded)
                </div>
              )}
            </>
          )}
        </div>

        {/* Preview */}
        <div className={`a-img-preview ${size}`}>
          {value ? (
            <>
              <img src={value} alt="Preview" onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="a-img-preview-overlay" onClick={() => onChange('')} title="Remove image">
                <X size={15} color="white" />
              </div>
            </>
          ) : (
            <ImageIcon size={size === 'sm' ? 16 : 22} color="#cbd5e1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;