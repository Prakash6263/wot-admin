import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function Quizes() {
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
                <h5>Quizes</h5>
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
                    <Link className="btn btn-primary" to="/add-quiz"><i className="fa fa-plus-circle me-2"></i>Add Quiz</Link>
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
                          <th>Quiz</th>
                          <th>Course</th>
                          <th>Questions</th>
                          <th>Pass %</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>TA Basics Quiz</td><td>Technical Analysis</td><td>15</td><td>60%</td><td><span className="badge bg-success">Active</span></td><td>Edit</td></tr>
                        <tr><td>SMC Concepts</td><td>Smart Money</td><td>20</td><td>70%</td><td><span className="badge bg-success">Active</span></td><td>Edit</td></tr>
                        <tr><td>Risk Mgmt</td><td>Forex Risk</td><td>10</td><td>50%</td><td><span className="badge bg-warning">Draft</span></td><td>Edit</td></tr>
                        <tr><td>Indicators</td><td>Price Action</td><td>12</td><td>65%</td><td><span className="badge bg-success">Active</span></td><td>Edit</td></tr>
                        <tr><td>AI Basics</td><td>AI Trading</td><td>8</td><td>60%</td><td><span className="badge bg-info">Review</span></td><td>Edit</td></tr>
                        <tr><td>Options Quiz</td><td>Options Trading</td><td>14</td><td>70%</td><td><span className="badge bg-danger">Disabled</span></td><td>Edit</td></tr>
                        <tr><td>Crypto Scalping</td><td>Crypto</td><td>9</td><td>55%</td><td><span className="badge bg-success">Active</span></td><td>Edit</td></tr>
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
