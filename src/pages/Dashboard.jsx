import React, { useEffect, useRef } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default function Dashboard() {
  const progressChartRef = useRef(null)
  const roleChartRef = useRef(null)

  useEffect(() => {
    let progressChartInstance = null
    let roleChartInstance = null

    const initCharts = () => {
      if (!window.Chart) {
        setTimeout(initCharts, 100)
        return
      }

      // Progress Chart
      if (progressChartRef.current) {
        progressChartInstance = new window.Chart(progressChartRef.current, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Lessons Completed',
              data: [120, 190, 300, 250, 420, 500],
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true }
            }
          }
        })
      }

      // Role Chart
      if (roleChartRef.current) {
        roleChartInstance = new window.Chart(roleChartRef.current, {
          type: 'doughnut',
          data: {
            labels: ['Learners', 'Instructors', 'Admins'],
            datasets: [{
              data: [3200, 980, 100],
              backgroundColor: ['#8b5cf6', '#06b6d4', '#f59e0b']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              }
            }
          }
        })
      }
    }

    initCharts()

    // Cleanup charts on unmount
    return () => {
      if (progressChartInstance) progressChartInstance.destroy()
      if (roleChartInstance) roleChartInstance.destroy()
    }
  }, [])

  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content container-fluid">

          {/* Page Header */}
          <div className="page-header fade-in">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="page-title">Dashboard</h1>
                <p className="text-muted">
                  Consolidated AI Analytics overview across all Lesson and courses
                </p>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="row g-4 mb-4">
            {[
              { title: "Total Users", value: "4,280" },
              { title: "Active Courses", value: "38" },
              { title: "Completion Rate", value: "76%" },
              { title: "AI Requests", value: "12.4k" },
            ].map((item, i) => (
              <div className="col-md-3" key={i}>
                <div className="card card-financial p-4">
                  <h6 className="fw-bold mb-2 text-white">{item.title}</h6>
                  <h3 className="text-white">{item.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="row g-4 mb-4">
            <div className="col-md-8">
              <div className="card p-4 shadow-soft border-0">
                <h6 className="mb-3">Learning Progress (Monthly)</h6>
                <div style={{ height: "300px" }}>
                  <canvas ref={progressChartRef}></canvas>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 shadow-soft border-0">
                <h6 className="mb-3">User Roles</h6>
                <div style={{ height: "250px" }}>
                  <canvas ref={roleChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>

          {/* Projects & AI */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card p-4 shadow-soft border-0">
                <h6 className="mb-3">📚 Ongoing Learning Projects</h6>
                <div className="list-group">
                  {[
                    ["Technical Analysis Mastery", "Intermediate • 18 Lessons", "72%", "success"],
                    ["Smart Money Concepts", "Advanced • 12 Lessons", "45%", "warning"],
                    ["Price Action Basics", "Beginner • 10 Lessons", "90%", "primary"],
                    ["AI-Assisted Trading", "Simulation Based", "28%", "danger"],
                  ].map(([title, desc, percent, color], i) => (
                    <div key={i} className="list-group-item d-flex justify-content-between">
                      <div>
                        <strong>{title}</strong><br />
                        <small className="text-muted">{desc}</small>
                      </div>
                      <span className={`badge bg-${color}`}>{percent}</span>
                    </div>
                  ))}
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
                  {[
                    ["Market Structure & Trend", "Rahul Verma", "01 Feb 2026", "success", "Published"],
                    ["Forex Risk Management", "Sarah Lee", "31 Jan 2026", "warning", "Draft"],
                    ["Crypto Scalping", "John Carter", "30 Jan 2026", "success", "Published"],
                    ["AI Chart Reading", "Admin", "29 Jan 2026", "info", "Review"],
                    ["Options Greeks", "Emma Brown", "28 Jan 2026", "danger", "Blocked"],
                  ].map(([course, instructor, date, color, status], i) => (
                    <tr key={i}>
                      <td>{course}</td>
                      <td>{instructor}</td>
                      <td>{date}</td>
                      <td><span className={`badge bg-${color}`}>{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
