import React, { useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default function Dashboard() {
  useEffect(() => {
    // Initialize Chart.js charts
    if (window.Chart) {
      const progressCtx = document.getElementById('progressChart')
      if (progressCtx && !progressCtx.chart) {
        progressCtx.chart = new window.Chart(progressCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Lessons Completed',
              data: [120, 190, 300, 250, 420, 500],
              borderColor: '#0d6efd',
              tension: 0.4
            }]
          }
        })
      }

      const roleCtx = document.getElementById('roleChart')
      if (roleCtx && !roleCtx.chart) {
        roleCtx.chart = new window.Chart(roleCtx, {
          type: 'doughnut',
          data: {
            labels: ['Learners', 'Instructors', 'Admins'],
            datasets: [{
              data: [3200, 980, 100],
              backgroundColor: ['#0d6efd', '#20c997', '#ffc107']
            }]
          }
        })
      }
    }
  }, [])

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header fade-in">
              <div className="row align-items-center">
                <div className="col">
                  <h1 className="page-title">Dashboard</h1>
                  <p className="text-muted">Consolidated AI Analytics overview across all Lession and courses</p>
                </div>
              </div>
            </div>

            {/* Financial KPIs */}
            <div className="stats-grid fade-in">
              {/* KPI Cards */}
              <div className="row g-4 mb-4">
                <div className="col-md-3">
                  <div className="card card-financial p-4">
                    <h6 className="fw-bold mb-2 text-white">Total Users</h6>
                    <h3 className="text-white">4,280</h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card card-financial p-4">
                    <h6 className="fw-bold mb-2 text-white">Active Courses</h6>
                    <h3 className="text-white">38</h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card card-financial p-4">
                    <h6 className="fw-bold mb-2 text-white">Completion Rate</h6>
                    <h3 className="text-white">76%</h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card card-financial p-4">
                    <h6 className="fw-bold mb-2 text-white">AI Requests</h6>
                    <h3 className="text-white">12.4k</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="row g-4 mb-4">
              <div className="col-md-8">
                <div className="card p-4 shadow-soft border-0">
                  <h6 className="mb-3">Learning Progress (Monthly)</h6>
                  <canvas id="progressChart"></canvas>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-4 shadow-soft border-0">
                  <h6 className="mb-3">User Roles</h6>
                  <canvas id="roleChart"></canvas>
                </div>
              </div>
            </div>

            {/* Projects + AI */}
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card p-4 shadow-soft border-0">
                  <h6 className="mb-3">📚 Ongoing Learning Projects</h6>

                  <div className="list-group">
                    <div className="list-group-item d-flex align-items-center justify-content-between">
                      <div>
                        <strong>Technical Analysis Mastery</strong><br />
                        <small className="text-muted">Intermediate • 18 Lessons</small>
                      </div>
                      <span className="badge bg-success">72%</span>
                    </div>

                    <div className="list-group-item d-flex align-items-center justify-content-between">
                      <div>
                        <strong>Smart Money Concepts</strong><br />
                        <small className="text-muted">Advanced • 12 Lessons</small>
                      </div>
                      <span className="badge bg-warning">45%</span>
                    </div>

                    <div className="list-group-item d-flex align-items-center justify-content-between">
                      <div>
                        <strong>Price Action Basics</strong><br />
                        <small className="text-muted">Beginner • 10 Lessons</small>
                      </div>
                      <span className="badge bg-primary">90%</span>
                    </div>

                    <div className="list-group-item d-flex align-items-center justify-content-between">
                      <div>
                        <strong>AI-Assisted Trading</strong><br />
                        <small className="text-muted">Simulation Based</small>
                      </div>
                      <span className="badge bg-danger">28%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card p-4 shadow-soft border-0">
                  <h6 className="mb-3">🤖 AI System Insights</h6>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>AI Tutor Queries Today</span><strong>1,248</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Chart Analysis Requests</span><strong>620</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>RAG Accuracy</span><strong className="text-success">94%</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Avg Response Time</span><strong>1.3s</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Status</span><span className="badge bg-success">Operational</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recently Updated Courses */}
            <div className="card p-4 shadow-soft border-0 mb-4">
              <h6 className="mb-3">🆕 Recently Updated Courses</h6>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Instructor</th>
                      <th>Last Update</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Market Structure & Trend</td>
                      <td>Rahul Verma</td>
                      <td>01 Feb 2026</td>
                      <td><span className="badge bg-success">Published</span></td>
                    </tr>
                    <tr>
                      <td>Forex Risk Management</td>
                      <td>Sarah Lee</td>
                      <td>31 Jan 2026</td>
                      <td><span className="badge bg-warning">Draft</span></td>
                    </tr>
                    <tr>
                      <td>Crypto Scalping</td>
                      <td>John Carter</td>
                      <td>30 Jan 2026</td>
                      <td><span className="badge bg-success">Published</span></td>
                    </tr>
                    <tr>
                      <td>AI Chart Reading</td>
                      <td>Admin</td>
                      <td>29 Jan 2026</td>
                      <td><span className="badge bg-info">Review</span></td>
                    </tr>
                    <tr>
                      <td>Options Greeks</td>
                      <td>Emma Brown</td>
                      <td>28 Jan 2026</td>
                      <td><span className="badge bg-danger">Blocked</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
      {/* /Main Wrapper */}
    </>
  )
}
