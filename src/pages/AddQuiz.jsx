import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function AddQuiz() {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Add New Quiz</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <Link className="btn btn-primary" to="/quizes"><i className="fa fa-plus-circle me-2"></i>View All</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form className="row g-4">
                    <div className="col-md-8">
                      <label className="form-label">Quiz Title</label>
                      <input type="text" className="form-control" placeholder="e.g. Technical Analysis Basics Quiz" />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Course</label>
                      <select className="form-select">
                        <option>Technical Analysis</option>
                        <option>Smart Money Concepts</option>
                        <option>AI Trading</option>
                        <option>Options Trading</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Passing Percentage</label>
                      <input type="number" className="form-control" defaultValue="60" />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Time Limit (mins)</label>
                      <input type="number" className="form-control" defaultValue="30" />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Max Attempts</label>
                      <input type="number" className="form-control" defaultValue="3" />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option>Draft</option>
                        <option>Published</option>
                        <option>Disabled</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Quiz Instructions</label>
                      <textarea className="form-control" rows="4" placeholder="Explain quiz rules, passing criteria, negative marking etc."></textarea>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Quiz Settings</label>
                      <div className="d-flex flex-wrap gap-4">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Shuffle Questions</label>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Shuffle Options</label>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Show Result Instantly</label>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Negative Marking</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="alert alert-primary d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Questions:</strong> 0 added
                          <span className="badge badge-soft ms-2">MCQ</span>
                          <span className="badge badge-soft ms-1">Single Correct</span>
                        </div>
                        <button type="button" className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-plus-circle"></i> Add Questions
                        </button>
                      </div>
                    </div>

                    <div className="col-md-12 text-end">
                      <button className="btn btn-secondary">Cancel</button>
                      <button className="btn btn-primary">
                        <i className="bi bi-check-circle"></i> Save Quiz
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
