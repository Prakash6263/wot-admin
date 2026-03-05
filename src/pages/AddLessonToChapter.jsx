import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addLessonToChapter } from '../api/lessons';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const CONTENT_TYPES = ['text', 'video', 'audio', 'doc', 'pdf'];

export default function AddLessonToChapter() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lesson_number: 0,
    duration: '',
    xp_points: 0,
    reward_points: 0,
    is_preview: false,
    is_locked: false,
    order_number: 0,
    thumbnail: null,
    content_title: '',
    content_type: 'text',
    text_content: '',
    content_duration: '',
    file_size: '',
    is_downloadable: false,
    media: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;

    // Handle boolean fields from select dropdowns
    if (['is_preview', 'is_locked', 'is_downloadable'].includes(name)) {
      finalValue = value === 'true' || value === true;
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        media: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter lesson title',
      });
      return;
    }

    if (!formData.description.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter lesson description',
      });
      return;
    }

    setIsLoading(true);

    const result = await addLessonToChapter(chapterId, formData, token);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Lesson Added',
        text: result.message || 'Lesson added successfully!',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate(-1); // Go back to previous page
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Lesson',
        text: result.message || 'An error occurred while adding the lesson',
      });
    }

    setIsLoading(false);
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
                <h5>Add Lesson to Chapter</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <button className="btn btn-primary" onClick={handleCancel}>
                      <i className="fa fa-arrow-left me-2"></i>Back
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="row g-3">
                    {/* Basic Lesson Information */}
                    <div className="col-md-6">
                      <label className="form-label">Lesson Title <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter lesson title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Lesson Number</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="lesson_number"
                        value={formData.lesson_number}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 25 min"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">XP Points</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="xp_points"
                        value={formData.xp_points}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Reward Points</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="reward_points"
                        value={formData.reward_points}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Lesson Description <span className="text-danger">*</span></label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter lesson description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    {/* Lesson Settings */}
                    <div className="col-md-4">
                      <label className="form-label">Is Preview</label>
                      <select
                        className="form-select"
                        name="is_preview"
                        value={String(formData.is_preview)}
                        onChange={handleInputChange}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Is Locked</label>
                      <select
                        className="form-select"
                        name="is_locked"
                        value={String(formData.is_locked)}
                        onChange={handleInputChange}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Order Number</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="order_number"
                        value={formData.order_number}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>

                    {/* Thumbnail */}
                    <div className="col-md-12">
                      <label className="form-label">Thumbnail</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                      {thumbnailPreview && (
                        <div className="mt-3">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail Preview"
                            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }}
                          />
                        </div>
                      )}
                    </div>

                   {/* Content Information */}
<div className="col-md-6">
  <label className="form-label">Content Title</label>
  <input
    type="text"
    className="form-control"
    placeholder="Enter content title"
    name="content_title"
    value={formData.content_title}
    onChange={handleInputChange}
  />
</div>

<div className="col-md-6">
  <label className="form-label">Content Type <span className="text-danger">*</span></label>
  <select
    className="form-select"
    name="content_type"
    value={formData.content_type}
    onChange={handleInputChange}
    required
  >
    <option value="text">Text</option>
    <option value="video">Video</option>
    <option value="audio">Audio</option>
    <option value="pdf">PDF</option>
    <option value="doc">Document</option>
  </select>
</div>

                    <div className="col-md-6">
                      <label className="form-label">Content Type <span className="text-danger">*</span></label>
                      <select
                        className="form-select"
                        name="content_type"
                        value={formData.content_type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="text">Text</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        <option value="pdf">PDF</option>
                        <option value="doc">Document</option>
                      </select>
                    </div>

                    {formData.content_type === 'text' && (
                      <div className="col-md-12">
                        <label className="form-label">Text Content</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Enter text content"
                          name="text_content"
                          value={formData.text_content}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    )}

                    <div className="col-md-4">
                      <label className="form-label">Content Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 25 min"
                        name="content_duration"
                        value={formData.content_duration}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">File Size</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 2.5 MB"
                        name="file_size"
                        value={formData.file_size}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Is Downloadable</label>
                      <select
                        className="form-select"
                        name="is_downloadable"
                        value={String(formData.is_downloadable)}
                        onChange={handleInputChange}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>

                    {/* Media File */}
                    <div className="col-md-12">
                      <label className="form-label">Media File</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleMediaChange}
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                      />
                      {mediaPreview && (
                        <div className="mt-3">
                          {formData.content_type === 'video' ? (
                            <video width="200" height="150" controls style={{ borderRadius: '4px' }}>
                              <source src={mediaPreview} type="video/mp4" />
                            </video>
                          ) : formData.content_type === 'audio' ? (
                            <audio controls style={{ width: '200px' }}>
                              <source src={mediaPreview} type="audio/webm" />
                            </audio>
                          ) : (
                            <img
                              src={mediaPreview}
                              alt="Media Preview"
                              style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '4px' }}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Form Actions */}
                    <div className="col-md-12 text-end mt-3">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary ms-2"
                        disabled={isLoading}
                      >
                        <i className="bi bi-check-circle"></i> {isLoading ? 'Adding...' : 'Add Lesson'}
                      </button>
                    </div>
                  </form>
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
