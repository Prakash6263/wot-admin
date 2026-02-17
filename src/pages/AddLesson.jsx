import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function AddLesson() {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <div>
                <h5>Add New Lesson</h5>
              </div>
              <div className="list-btn">
                <ul className="filter-list">
                  <li>
                    <Link className="btn btn-primary" to="/lessons"><i className="fa fa-plus-circle me-2"></i>View All</Link>
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
                      <label className="form-label">Lesson Title</label>
                      <input type="text" className="form-control" placeholder="Enter lesson name" />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Course</label>
                      <select className="form-select">
                        <option>Technical Analysis</option>
                        <option>Smart Money Concepts</option>
                        <option>AI Trading</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Lesson Type</label>
                      <select className="form-select">
                        <option>Video</option>
                        <option>Text</option>
                        <option>Hybrid</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Lesson Order</label>
                      <input type="number" className="form-control" placeholder="1" />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Duration (mins)</label>
                      <input type="number" className="form-control" placeholder="15" />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Lesson Content</label>
                      <textarea className="form-control" rows="5" placeholder="Lesson text or video description"></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Video URL (optional)</label>
                      <input type="url" className="form-control" placeholder="https://" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option>Draft</option>
                        <option>Published</option>
                        <option>Blocked</option>
                      </select>
                    </div>

                    <div className="col-md-12 text-end mt-3">
                      <button className="btn btn-secondary">Cancel</button>
                      <button className="btn btn-primary">
                        <i className="bi bi-check-circle"></i> Save Lesson
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
