import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(["user"])
  let navigate = useNavigate()
  const handleClick = () => {
    setShowModal(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Password need to match")
        return
      }
      const response = await axios.post(
        `http://localhost:3000/${isSignUp ? "signup" : "login"}`,
        { email, password }
      )

      setCookie("UserId", response.data.userId)
      setCookie("AuthToken", response.data.token)

      const success = response.status === 201
      if (success && isSignUp) navigate("/onboarding")
      if (success && !isSignUp) navigate("/dashboard")
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <h2>{isSignUp ? "Create Account" : "Log in"}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>
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
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <>
            <label htmlFor="password-check">Confirm Password</label>
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
        <hr />
        <h2>Get the App</h2>
      </form>
    </div>
  )
}

export default AuthModal
