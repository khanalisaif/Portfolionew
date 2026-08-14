import React, { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';
import { apiService } from '../services/api';
import '../admin.css';

const ImageUpload = ({ value, onChange, label, hint, className = '', size = 'md' }) => {
  const fileInputRef = useRef(null);
  const [mode, setMode] = useState('url');
  const [isDragging, setIsDragging] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const processFile = async (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be under 5MB.');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const { ok, data } = await apiService.uploadFile(file);
      
      if (ok) {
        onChange(data.url);
      } else {
        alert(data.message || 'Error uploading file');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
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
                className={`a-img-dropzone${isDragging ? ' dragging' : ''}${isUploading ? ' uploading' : ''}`}
                onClick={() => !isUploading && fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); !isUploading && setIsDragging(true); }}
                onDragLeave={() => !isUploading && setIsDragging(false)}
                onDrop={(e) => { if (!isUploading) handleDrop(e); }}
              >
                <div className={`a-img-dropzone-icon${isDragging ? ' dragging' : ''}`}>
                  <Upload size={15} />
                </div>
                {isUploading ? (
                  <p className="primary-text">Uploading image...</p>
                ) : (
                  <>
                    <p className="primary-text">
                      <span>Click to browse</span> or drag image here
                    </p>
                    <p className="secondary-text">Max 5MB &middot; PNG, JPG, SVG, WebP</p>
                  </>
                )}
              </div>

              {value && value.startsWith('http') && !isUploading && (
                <div className="a-img-uploaded-msg">
                  <CheckCircle2 size={13} />
                  Image uploaded successfully
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