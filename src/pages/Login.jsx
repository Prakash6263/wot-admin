import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="login-30 tab-box">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-12">
            <div className="form-section mt-3 rounded">
              <div className="login-inner-form">
                <div className="details">
                  {/* Logo */}
                  <div className="text-center">
                    <img src="/assets/img/logo.png" className="img-fluid" style={{ maxWidth: '200px' }} alt="Logo" />
                  </div>

                  <h5 className="mb-4">Login to access to your dashboard</h5>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="first_field" className="form-label float-start">Email address</label>
                      <input name="email" type="email" className="form-control" id="first_field" placeholder="Email Address" aria-label="Email Address" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="second_field" className="form-label float-start">Password</label>
                      <input name="password" type="password" className="form-control" autoComplete="off" id="second_field" placeholder="Password" aria-label="Password" />
                    </div>

                    <div className="checkbox form-group clearfix">
                      <div className="form-check float-start">
                        <input className="form-check-input" type="checkbox" id="rememberme" />
                        <label className="form-check-label" htmlFor="rememberme">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="form-group clearfix">
                      <button type="submit" className="btn btn-primary btn-lg w-100"><span>Login</span></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
