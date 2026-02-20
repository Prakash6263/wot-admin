import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function Courses() {
  useEffect(() => {
    if (window.DataTable) {
      new window.DataTable('#example', {});
    }
  }, []);

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Courses</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <div className="dropdown dropdown-action" data-bs-placement="bottom" data-bs-original-title="Download">
                      <a href="#" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                        <span><i className="fe fe-download me-2"></i></span>Export
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <ul className="d-block">
                          <li>
                            <a className="d-flex align-items-center download-item" href="javascript:void(0);" download="">
                              <i className="far fa-file-text me-2"></i>Excel
                            </a>
                          </li>
                          <li>
                            <a className="d-flex align-items-center download-item" href="javascript:void(0);" download="">
                              <i className="far fa-file-pdf me-2"></i>PDF
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link className="btn btn-primary" to="/add-course"><i className="fa fa-plus-circle me-2"></i>Add Course</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table id="example" className="table table-striped">
                      <thead>
                        <tr>
                          <th>Course</th>
                          <th>Level</th>
                          <th>Instructor</th>
                          <th>Lessons</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Technical Analysis Mastery</td><td><span className="badge bg-primary">Intermediate</span></td><td>Rahul Verma</td><td>18</td><td><span className="badge bg-success">Published</span></td><td><button className="btn btn-sm btn-outline-primary">View</button></td></tr>
                        <tr><td>Smart Money Concepts</td><td><span className="badge bg-danger">Advanced</span></td><td>Sarah Lee</td><td>12</td><td><span className="badge bg-warning">Draft</span></td><td><button className="btn btn-sm btn-outline-primary">View</button></td></tr>
                        <tr><td>Price Action Basics</td><td><span className="badge bg-success">Beginner</span></td><td>John Carter</td><td>10</td><td><span className="badge bg-success">Published</span></td><td><button className="btn btn-sm btn-outline-primary">View</button></td></tr>
                        <tr><td>AI Assisted Trading</td><td><span className="badge bg-dark">Advanced</span></td><td>Admin</td><td>8</td><td><span className="badge bg-info">Review</span></td><td><button className="btn btn-sm btn-outline-primary">View</button></td></tr>
                        <tr><td>Forex Risk Management</td><td><span className="badge bg-primary">Intermediate</span></td><td>Emma Brown</td><td>9</td><td><span className="badge bg-danger">Blocked</span></td><td><button className="btn btn-sm btn-outline-primary">View</button></td></tr>
                        <tr><td>Options Trading</td><td><span className="badge bg-danger">Advanced</span></td><td>Chris Wood</td><td>11</td><td><span className="badge bg-success">Published</span></td><td><button className="btn btn-sm btn-outline-primary">View</button></td></tr>
                        <tr><td>Crypto Scalping</td><td><span className="badge bg-warning">Intermediate</span></td><td>Alex Roy</td><td>7</td><td><span className="badge bg-warning">Draft</span></td><td><button className="btn btn-sm btn-outline-primary">View</button></td></tr>
                      </tbody>
                    </table>
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
