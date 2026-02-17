import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function AddUser() {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Add User</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <Link className="btn btn-primary" to="/user-list"><i className="fa fa-eye me-2"></i>View All</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="modal-body">
                    <form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Full Name</label>
                          <input type="text" className="form-control" placeholder="Enter full name" />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Email Address</label>
                          <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Role</label>
                          <select className="form-select">
                            <option>Learner</option>
                            <option>Instructor</option>
                            <option>Admin</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Status</label>
                          <select className="form-select">
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Blocked</option>
                          </select>
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">Temporary Password</label>
                          <input type="password" className="form-control" placeholder="Auto-generated or manual" />
                        </div>

                        <div className="col-md-12">
                          <button className="btn btn-secondary">Cancel</button>
                          <button className="btn btn-primary">Create User</button>
                        </div>
                      </div>
                    </form>
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
