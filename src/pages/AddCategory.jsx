import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addCategory } from '../api/courses';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function AddCategory() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleCancel = () => {
    if (courseId) {
      navigate(`/course/${courseId}/categories`);
    } else {
      navigate('/courses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter category name',
      });
      return;
    }

    if (!formData.description.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter category description',
      });
      return;
    }

    setIsLoading(true);
    console.log('[v0] Submitting category form for course:', courseId);

    const submitData = {
      ...formData,
      status: 'active',
    };

    const result = await addCategory(courseId, submitData, token);
    
    console.log('[v0] Add category result:', result);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: result.message || 'Category added successfully',
        timer: 2000,
      });
      
      if (courseId) {
        navigate(`/course/${courseId}/categories`);
      } else {
        navigate('/courses');
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.message || 'Failed to add category',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex align-items-center justify-content-between">
              <h3>Add Category</h3>
              <button className="btn btn-primary" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left me-2"></i>Back
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Category Information</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Category Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter category name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description <span className="text-danger">*</span></label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter category description"
                        rows="4"
                        required
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Category Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleInputChange}
                        accept="image/*"
                      />
                    </div>

                    <div className="d-flex gap-2">
                      <button 
                        type="submit" 
                        className="btn btn-success"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Adding...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check me-2"></i>Add Category
                          </>
                        )}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        <i className="fas fa-times me-2"></i>Cancel
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
