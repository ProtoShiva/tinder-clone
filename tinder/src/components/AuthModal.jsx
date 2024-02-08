import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const AuthModal = ({ setShowModal }) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const isSignUp = true
  const handleClick = () => {
    setShowModal(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <h2>{isSignUp ? "Create Account" : "Log in"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password-check">Confirm Password</label>
        <input
          type="password"
          id="password-check"
          name="password-check"
          placeholder="confirm Password"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
        <hr />
        <h2>Get the App</h2>
      </form>
    </div>
  )
}

export default AuthModal
