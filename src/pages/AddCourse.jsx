import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function AddCourse() {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Add New Courses</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <Link className="btn btn-primary" to="/courses"><i className="fa fa-plus-circle me-2"></i>View All</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label">Course Title</label>
                      <input type="text" className="form-control" placeholder="Enter course name" />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Level</label>
                      <select className="form-select">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Instructor</label>
                      <select className="form-select">
                        <option>Rahul Verma</option>
                        <option>Sarah Lee</option>
                        <option>Admin</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Price (₹)</label>
                      <input type="number" className="form-control" placeholder="0 = Free" />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option>Draft</option>
                        <option>Published</option>
                        <option>Blocked</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Course Description</label>
                      <textarea className="form-control" rows="4" placeholder="Detailed course overview"></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Course Thumbnail</label>
                      <input type="file" className="form-control" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Visibility</label>
                      <select className="form-select">
                        <option>Public</option>
                        <option>Private</option>
                        <option>Members Only</option>
                      </select>
                    </div>

                    <div className="col-md-12 text-end mt-3">
                      <button className="btn btn-secondary">Cancel</button>
                      <button className="btn btn-primary">
                        <i className="bi bi-check-circle"></i> Save Course
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
