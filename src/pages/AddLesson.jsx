import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createLesson } from '../api/lessons';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function AddLesson() {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lesson_number: 0,
    duration: '',
    xp_points: 0,
    reward_points: 0,
    is_preview: false,
    is_locked: false,
    quiz_available: false,
    status: 'active',
    order_number: 1,
    thumbnail: null,
  });

  const contentTypeOptions = ['text', 'video', 'audio', 'doc', 'pdf'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value),
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file,
      }));
      setThumbnailPreview(file.name);
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
    console.log('[v0] Creating lesson with data:', formData);

    const result = await createLesson(chapterId, formData, token);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Lesson Created',
        text: result.message || 'Lesson created successfully!',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        // Navigate back to the chapter lessons list page
        navigate(-1);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Create Lesson',
        text: result.message || 'An error occurred while creating the lesson',
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
                <h5>Add New Lesson</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      <i className="fa fa-arrow-left me-2"></i>Back to Lessons
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
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-8">
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

                    <div className="col-md-4">
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

                    <div className="col-md-12">
                      <label className="form-label">Description <span className="text-danger">*</span></label>
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Enter lesson description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Duration</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g., 2 hours"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Order Number</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="1"
                        name="order_number"
                        value={formData.order_number}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>

                    <div className="col-md-6">
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

                    <div className="col-md-6">
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

                    <div className="col-md-3">
                      <label className="form-check-label">
                        <input 
                          type="checkbox" 
                          className="form-check-input"
                          name="is_preview"
                          checked={formData.is_preview}
                          onChange={handleInputChange}
                        />
                        Is Preview
                      </label>
                    </div>

                    <div className="col-md-3">
                      <label className="form-check-label">
                        <input 
                          type="checkbox" 
                          className="form-check-input"
                          name="is_locked"
                          checked={formData.is_locked}
                          onChange={handleInputChange}
                        />
                        Is Locked
                      </label>
                    </div>

                    <div className="col-md-3">
                      <label className="form-check-label">
                        <input 
                          type="checkbox" 
                          className="form-check-input"
                          name="quiz_available"
                          checked={formData.quiz_available}
                          onChange={handleInputChange}
                        />
                        Quiz Available
                      </label>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Status</label>
                      <select 
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Thumbnail Image</label>
                      <input 
                        type="file" 
                        className="form-control"
                        onChange={handleThumbnailChange}
                        accept="image/*"
                      />
                      {thumbnailPreview && (
                        <div className="mt-2">
                          <small className="text-muted">Selected: {thumbnailPreview}</small>
                        </div>
                      )}
                    </div>

                    <div className="col-md-12">
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary ms-2"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating...' : 'Create Lesson'}
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
