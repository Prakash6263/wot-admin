import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateCourseChapter, getCourseChapters } from '../api/courses';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function EditChapter() {
  const navigate = useNavigate();
  const { courseId, chapterId } = useParams();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    chapter_number: '',
    duration: '',
    is_locked: false,
    order_number: '',
  });

  useEffect(() => {
    fetchChapterData();
  }, [courseId, chapterId]);

  const fetchChapterData = async () => {
    setInitialLoading(true);
    const result = await getCourseChapters(courseId, token);
    
    if (result.success) {
      // Find the specific chapter from all categories
      let chapterToEdit = null;
      result.data.categories.forEach(category => {
        const foundChapter = category.chapters.find(chapter => chapter.id === parseInt(chapterId));
        if (foundChapter) {
          chapterToEdit = foundChapter;
        }
      });

      if (chapterToEdit) {
        setFormData({
          title: chapterToEdit.title || '',
          category: chapterToEdit.category || '',
          description: chapterToEdit.description || '',
          chapter_number: chapterToEdit.chapter_number || '',
          duration: chapterToEdit.duration || '',
          is_locked: chapterToEdit.is_locked || false,
          order_number: chapterToEdit.order_number || '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Chapter Not Found',
          text: 'The requested chapter could not be found',
        });
        navigate(`/courses/admin/course/${courseId}/chapters`);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Chapter',
        text: result.message || 'An error occurred while fetching chapter data',
      });
      navigate(`/courses/admin/course/${courseId}/chapters`);
    }
    setInitialLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCancel = () => {
    navigate(`/courses/admin/course/${courseId}/chapters`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter chapter title',
      });
      return;
    }

    if (!formData.category.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter chapter category',
      });
      return;
    }

    setIsLoading(true);
    const result = await updateCourseChapter(chapterId, formData, token);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Chapter Updated',
        text: 'Chapter has been updated successfully',
      });
      navigate(`/courses/admin/course/${courseId}/chapters`);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update Chapter',
        text: result.message,
      });
    }
    setIsLoading(false);
  };

  if (initialLoading) {
    return (
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Edit Chapter</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      <i className="fa fa-arrow-left me-2"></i>Back to Chapters
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
                    <div className="col-md-6">
                      <label className="form-label">Chapter Title <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter chapter title"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Category <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Enter chapter category"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter chapter description"
                      ></textarea>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Chapter Number</label>
                      <input
                        type="number"
                        className="form-control"
                        name="chapter_number"
                        value={formData.chapter_number}
                        onChange={handleInputChange}
                        placeholder="Enter chapter number"
                        min="0"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g., 2 hours"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Order Number</label>
                      <input
                        type="number"
                        className="form-control"
                        name="order_number"
                        value={formData.order_number}
                        onChange={handleInputChange}
                        placeholder="Enter order number"
                        min="0"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Is Locked</label>
                      <select
                        className="form-select"
                        name="is_locked"
                        value={formData.is_locked}
                        onChange={handleInputChange}
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                    </div>

                    <div className="col-md-12">
                      <div className="d-flex gap-2">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Updating...' : 'Update Chapter'}
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={handleCancel}
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                      </div>
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
