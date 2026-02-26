import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createLessonContent } from '../api/lessons';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function AddContent() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content_type: 'text',
    text_content: '',
    duration: '',
    file_size: '',
    is_downloadable: false,
    order_number: 1,
    media: null,
  });

  const contentTypeOptions = ['video', 'audio', 'text', 'pdf', 'doc'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        media: file,
      }));
      setMediaPreview(file.name);

      // Auto-calculate file size
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setFormData(prev => ({
        ...prev,
        file_size: `${fileSizeMB} MB`,
      }));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Title is required',
      });
      return;
    }

    if (!formData.content_type) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Content type is required',
      });
      return;
    }

    if (formData.content_type === 'text' && !formData.text_content.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Text content is required for text type',
      });
      return;
    }

    if ((formData.content_type === 'video' || formData.content_type === 'audio' || formData.content_type === 'pdf' || formData.content_type === 'doc') && !formData.media) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Media file is required for this content type',
      });
      return;
    }

    setIsSubmitting(true);
    const result = await createLessonContent(lessonId, formData, token);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: result.message || 'Content created successfully',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate(-1);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Content',
        text: result.message || 'An error occurred while adding content',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Add Lesson Content</h5>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-3">
                      <label className="form-label">Title <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter content title"
                        required
                      />
                    </div>

                    {/* Content Type */}
                    <div className="mb-3">
                      <label className="form-label">Content Type <span className="text-danger">*</span></label>
                      <select 
                        className="form-select" 
                        name="content_type"
                        value={formData.content_type}
                        onChange={handleInputChange}
                        required
                      >
                        {contentTypeOptions.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Text Content (only for text type) */}
                    {formData.content_type === 'text' && (
                      <div className="mb-3">
                        <label className="form-label">Text Content <span className="text-danger">*</span></label>
                        <textarea 
                          className="form-control" 
                          rows="6"
                          name="text_content"
                          value={formData.text_content}
                          onChange={handleInputChange}
                          placeholder="Enter text content"
                          required
                        ></textarea>
                      </div>
                    )}

                    {/* Media File (for non-text types) */}
                    {(formData.content_type === 'video' || formData.content_type === 'audio' || formData.content_type === 'pdf' || formData.content_type === 'doc') && (
                      <div className="mb-3">
                        <label className="form-label">Media File <span className="text-danger">*</span></label>
                        <input 
                          type="file" 
                          className="form-control" 
                          name="media"
                          onChange={handleMediaChange}
                          accept={
                            formData.content_type === 'video' ? 'video/*' :
                            formData.content_type === 'audio' ? 'audio/*' :
                            formData.content_type === 'pdf' ? '.pdf' :
                            '.doc,.docx'
                          }
                          required
                        />
                        {mediaPreview && (
                          <small className="text-success mt-2 d-block">
                            <i className="fas fa-check-circle me-1"></i>Selected: {mediaPreview}
                          </small>
                        )}
                      </div>
                    )}

                    {/* Duration */}
                    <div className="mb-3">
                      <label className="form-label">Duration</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g., 20 Minutes"
                      />
                    </div>

                    {/* File Size */}
                    <div className="mb-3">
                      <label className="form-label">File Size</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="file_size"
                        value={formData.file_size}
                        onChange={handleInputChange}
                        placeholder="e.g., 150 MB"
                        disabled={formData.media !== null}
                      />
                    </div>

                    {/* Order Number */}
                    <div className="mb-3">
                      <label className="form-label">Order Number</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="order_number"
                        value={formData.order_number}
                        onChange={handleInputChange}
                        min="1"
                      />
                    </div>

                    {/* Downloadable */}
                    <div className="mb-3">
                      <label className="form-label">Downloadable</label>
                      <div className="form-check mt-2">
                        <input 
                          type="checkbox" 
                          className="form-check-input" 
                          name="is_downloadable"
                          id="isDownloadable"
                          checked={formData.is_downloadable}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="isDownloadable">
                          Allow users to download this content
                        </label>
                      </div>
                    </div>

                    {/* Form Buttons */}
                    <div className="mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary me-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Adding...
                          </>
                        ) : (
                          'Add Content'
                        )}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Content Information</h6>
                  <div className="mb-3">
                    <label className="text-muted small">What is Content Type?</label>
                    <p className="small mb-0">
                      Select the type of content you're adding:
                    </p>
                    <ul className="small text-muted mt-2 mb-0">
                      <li><strong>Text:</strong> Plain text or HTML content</li>
                      <li><strong>Video:</strong> Video files (mp4, webm, etc.)</li>
                      <li><strong>Audio:</strong> Audio files (mp3, wav, etc.)</li>
                      <li><strong>PDF:</strong> PDF documents</li>
                      <li><strong>Doc:</strong> Word documents</li>
                    </ul>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <label className="text-muted small">File Upload Tips</label>
                    <ul className="small text-muted mb-0">
                      <li>Keep file size under 500MB</li>
                      <li>Use common formats for compatibility</li>
                      <li>File size is auto-calculated</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
