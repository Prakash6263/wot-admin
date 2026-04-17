import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getUsers } from '../api/users';
import { broadcastNotification } from '../api/tools';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Notifications = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sendToAll, setSendToAll] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: {
      english: '',
      hindi: '',
      spanish: ''
    },
    body: {
      english: '',
      hindi: '',
      spanish: ''
    }
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(token, 1, 100);
      if (response.success) {
        setUsers(response.data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (field, lang, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
    }));
  };

  const handleUserToggle = (email) => {
    setSelectedUsers(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.english.trim()) {
      Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'English title is required' });
      return;
    }
    if (!formData.body.english.trim()) {
      Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'English body is required' });
      return;
    }

    if (!sendToAll && selectedUsers.length === 0) {
      Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select at least one user' });
      return;
    }

    const payload = {
      title: formData.title,
      body: formData.body,
    };

    if (!sendToAll) {
      payload.emails = selectedUsers;
    }

    setLoading(true);

    try {
      const result = await broadcastNotification(token, payload);
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: result.message || 'Notification sent successfully',
          timer: 1500,
          showConfirmButton: false
        });

        // Reset form
        setFormData({
          title: { english: '', hindi: '', spanish: '' },
          body: { english: '', hindi: '', spanish: '' }
        });
        setSelectedUsers([]);
        setSendToAll(true);
      } else {
        Swal.fire({ icon: 'error', title: 'Failed', text: result.message || 'Failed to send notification' });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">

          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Broadcast Notifications</h5>
                <p className="text-muted mt-1">Send multi-language push notifications to your users</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>

                    {/* Language Titles Section */}
                    <div className="form-group-item">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <h6 className="text-primary"><i className="fas fa-heading me-2"></i>Notification Titles</h6>
                          <hr />
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>English Title <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="English Title"
                              value={formData.title.english}
                              onChange={(e) => handleInputChange('title', 'english', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Hindi Title</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Hindi Title"
                              value={formData.title.hindi}
                              onChange={(e) => handleInputChange('title', 'hindi', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Spanish Title</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Spanish Title"
                              value={formData.title.spanish}
                              onChange={(e) => handleInputChange('title', 'spanish', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Language Bodies Section */}
                    <div className="form-group-item mt-4">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <h6 className="text-primary"><i className="fas fa-align-left me-2"></i>Notification Content</h6>
                          <hr />
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className="form-group">
                            <label>English Body <span className="text-danger">*</span></label>
                            <textarea
                              className="form-control"
                              rows="3"
                              placeholder="English Content"
                              value={formData.body.english}
                              onChange={(e) => handleInputChange('body', 'english', e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Hindi Body</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              placeholder="Hindi Content"
                              value={formData.body.hindi}
                              onChange={(e) => handleInputChange('body', 'hindi', e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Spanish Body</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              placeholder="Spanish Content"
                              value={formData.body.spanish}
                              onChange={(e) => handleInputChange('body', 'spanish', e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Targeting Section */}
                    <div className="form-group-item mt-4">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <h6 className="text-primary"><i className="fas fa-users me-2"></i>Recipients</h6>
                          <hr />
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="d-block">Send To:</label>
                            <div className="btn-group w-100" role="group">
                              <button
                                type="button"
                                className={`btn ${sendToAll ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setSendToAll(true)}
                              >
                                All Users
                              </button>
                              <button
                                type="button"
                                className={`btn ${!sendToAll ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setSendToAll(false)}
                              >
                                Selected Users
                              </button>
                            </div>
                          </div>
                        </div>

                        {!sendToAll && (
                          <div className="col-md-12 mt-3">
                            <div className="form-group">
                              <label>Search and Select Users</label>
                              <div className="input-group mb-2">
                                <span className="input-group-text"><i className="fas fa-search"></i></span>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search by name or email..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                />
                              </div>
                              <div className="user-selection-list border rounded p-2" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                {filteredUsers.map(user => (
                                  <div
                                    key={user.user_id}
                                    className={`d-flex align-items-center p-2 mb-1 rounded cursor-pointer ${selectedUsers.includes(user.email) ? 'bg-primary text-white' : 'bg-light'}`}
                                    onClick={() => handleUserToggle(user.email)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <div className="flex-grow-1">
                                      <div className="fw-bold">{user.name || 'Anonymous'}</div>
                                      <div className={`small ${selectedUsers.includes(user.email) ? 'text-white-50' : 'text-muted'}`}>{user.email}</div>
                                    </div>
                                    {selectedUsers.includes(user.email) && <i className="fas fa-check-circle"></i>}
                                  </div>
                                ))}
                                {filteredUsers.length === 0 && <div className="text-center p-3 text-muted">No users found</div>}
                              </div>
                              <div className="mt-2 small text-muted">
                                Selected: <strong>{selectedUsers.length}</strong> users
                              </div>
                            </div>
                          </div>
                        )}

                        {sendToAll && (
                          <div className="col-md-12 mt-2">
                            <div className="alert alert-info py-2 mb-0">
                              <i className="fas fa-info-circle me-2"></i>
                              This notification will be broadcasted to <strong>all</strong> registered users.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-end mt-4 pt-3 border-top">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Broadcasting...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>Broadcast Now
                          </>
                        )}
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
};

export default Notifications;
