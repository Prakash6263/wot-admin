import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function Lessons() {
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
                <h5>Lessons</h5>
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
                    <Link className="btn btn-primary" to="/add-lesson"><i className="fa fa-plus-circle me-2"></i>Add Lesson</Link>
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
                          <th>Lesson</th>
                          <th>Course</th>
                          <th>Type</th>
                          <th>Order</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Market Structure</td><td>Technical Analysis</td><td>Video</td><td>1</td><td><span className="badge bg-success">Published</span></td><td>Edit</td></tr>
                        <tr><td>Support & Resistance</td><td>Technical Analysis</td><td>Video</td><td>2</td><td><span className="badge bg-success">Published</span></td><td>Edit</td></tr>
                        <tr><td>Trendlines</td><td>Price Action</td><td>Text</td><td>3</td><td><span className="badge bg-warning">Draft</span></td><td>Edit</td></tr>
                        <tr><td>Indicators</td><td>Technical Analysis</td><td>Hybrid</td><td>4</td><td><span className="badge bg-success">Published</span></td><td>Edit</td></tr>
                        <tr><td>Entry Strategy</td><td>Smart Money</td><td>Video</td><td>1</td><td><span className="badge bg-info">Review</span></td><td>Edit</td></tr>
                        <tr><td>Risk Management</td><td>Forex Risk</td><td>Text</td><td>2</td><td><span className="badge bg-success">Published</span></td><td>Edit</td></tr>
                        <tr><td>AI Chart Reading</td><td>AI Trading</td><td>Hybrid</td><td>1</td><td><span className="badge bg-danger">Blocked</span></td><td>Edit</td></tr>
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
