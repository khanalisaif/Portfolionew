import React, { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, FileText, X, CheckCircle2 } from 'lucide-react';
import { uploadFile } from "../services/api";
import { showToast } from './Toast';
import '../admin.css';

const FileUpload = ({ value, onChange, label, hint, className = '' }) => {
  const fileInputRef = useRef(null);
  const [mode, setMode] = useState('upload');
  const [isDragging, setIsDragging] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const processFile = async (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('File size should be under 5MB.', 'warning');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadFile(formData);
      
      if (res.data?.url) {
        onChange(res.data.url);
      } else {
        showToast('Error uploading file. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      showToast('Failed to upload file. Please try again.', 'error');
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

  const isDataUrl = value && value.startsWith('data:');

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
        <div className="a-img-input-area" style={{ flex: 1 }}>
          {mode === 'url' ? (
            <div className="a-img-url-input">
              <span className="icon"><LinkIcon size={14} /></span>
              <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="a-input"
                style={{ paddingLeft: 38 }}
              />
            </div>
          ) : (
            <>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
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
                  <p className="primary-text">Uploading document...</p>
                ) : (
                  <>
                    <p className="primary-text">
                      <span>Click to browse</span> or drag document here
                    </p>
                    <p className="secondary-text">Max 5MB &middot; PDF, DOC, DOCX</p>
                  </>
                )}
              </div>

              {value && value.startsWith('http') && !isUploading && (
                <div className="a-img-uploaded-msg">
                  <CheckCircle2 size={13} />
                  Document uploaded successfully
                </div>
              )}
            </>
          )}
        </div>

        {/* File Preview */}
        <div className={`a-img-preview lg`} style={{ flex: '0 0 120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {value ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <FileText size={40} color={isDataUrl ? "#10b981" : "#6366f1"} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textAlign: 'center', wordBreak: 'break-all' }}>
                  {isDataUrl ? 'Local File' : 'External Link'}
                </span>
              </div>
              <div className="a-img-preview-overlay" onClick={() => onChange('')} title="Remove document">
                <X size={15} color="white" />
              </div>
            </>
          ) : (
            <FileText size={32} color="#cbd5e1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
