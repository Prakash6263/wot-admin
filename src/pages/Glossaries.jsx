import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAllGlossaries, deleteGlossary, updateGlossary } from '../api/glossary';
import { useAuth } from '../context/AuthContext';
import GlobalLoader from '../components/GlobalLoader';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function Glossaries() {
  const { token } = useAuth();
  const [glossaries, setGlossaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGlossary, setEditingGlossary] = useState(null);
  const [editFormData, setEditFormData] = useState({
    term: '',
    short_form: '',
    category: '',
    description: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    count: 0,
  });

  useEffect(() => {
    fetchGlossaries(1);
  }, []);

  const fetchGlossaries = async (pageNumber = 1) => {
    setIsLoading(true);
    const result = await getAllGlossaries(token, pageNumber, 10);
    
    if (result.success) {
      setGlossaries(result.data || []);
      setPagination(result.pagination || { page: pageNumber, limit: 10, total: 0, count: 0 });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Glossaries',
        text: result.message || 'An error occurred while fetching glossaries',
      });
      setGlossaries([]);
    }
    setIsLoading(false);
  };

  const handlePageChange = (newPage) => {
    fetchGlossaries(newPage);
  };

  const handleEditClick = (glossary) => {
    setEditingGlossary(glossary);
    setEditFormData({
      term: glossary.term,
      short_form: glossary.short_form,
      category: glossary.category,
      description: glossary.description,
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!editFormData.term || !editFormData.short_form || !editFormData.category || !editFormData.description) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'All fields are required',
      });
      return;
    }

    const updateResult = await updateGlossary(editingGlossary.id, editFormData, token);

    if (updateResult.success) {
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: updateResult.message || 'Glossary updated successfully',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        setShowEditModal(false);
        fetchGlossaries(pagination.page);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update',
        text: updateResult.message || 'An error occurred while updating the glossary',
      });
    }
  };

  const handleDeleteGlossary = (glossaryId, glossaryTerm) => {
    Swal.fire({
      title: 'Delete Glossary',
      text: `Are you sure you want to delete "${glossaryTerm}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResult = await deleteGlossary(glossaryId, token);

        if (deleteResult.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: deleteResult.message || 'Glossary deleted successfully',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            fetchGlossaries();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Delete',
            text: deleteResult.message || 'An error occurred while deleting the glossary',
          });
        }
      }
    });
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Glossaries</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <Link className="btn btn-primary" to="/add-glossary"><i className="fa fa-plus-circle me-2"></i>Add Glossary</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  {isLoading ? (
                    <GlobalLoader visible={true} size="medium" />
                  ) : glossaries.length === 0 ? (
                    <div className="text-center py-5">
                      <p className="text-muted">No glossaries found</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Term</th>
                            <th>Short Form</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {glossaries.map((glossary) => (
                            <tr key={glossary.id}>
                              <td>
                                <strong>{glossary.term}</strong>
                              </td>
                              <td>
                                <span className="badge bg-info">{glossary.short_form}</span>
                              </td>
                              <td>
                                <span className="badge bg-secondary">{glossary.category}</span>
                              </td>
                              <td>
                                <small title={glossary.description}>
                                  {glossary.description?.substring(0, 60)}
                                  {glossary.description?.length > 60 ? '...' : ''}
                                </small>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleEditClick(glossary)}
                                    title="Edit Glossary"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDeleteGlossary(glossary.id, glossary.term)}
                                    title="Delete Glossary"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {totalPages > 1 && glossaries.length > 0 && (
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Page {pagination.page} of {totalPages} | Showing {glossaries.length} of {pagination.total} glossaries
                    </small>
                    <nav aria-label="Page navigation">
                      <ul className="pagination mb-0">
                        <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                          Math.max(0, pagination.page - 2),
                          Math.min(totalPages, pagination.page + 1)
                        ).map((page) => (
                          <li key={page} className={`page-item ${pagination.page === page ? 'active' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${pagination.page === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Glossary</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Term <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="term"
                    value={editFormData.term}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Short Form <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="short_form"
                    value={editFormData.short_form}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category <span className="text-danger">*</span></label>
                  <select 
                    className="form-select" 
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="SMC">SMC</option>
                    <option value="Technical Analysis">Technical Analysis</option>
                    <option value="ICT">ICT</option>
                    <option value="Price Action">Price Action</option>
                    <option value="Risk Management">Risk Management</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description <span className="text-danger">*</span></label>
                  <textarea 
                    className="form-control" 
                    rows="4"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {showEditModal && <div className="modal-backdrop fade show"></div>}

      <Footer />
    </div>
  );
}
