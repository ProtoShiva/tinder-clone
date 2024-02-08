import React, { useState } from "react"
import Nav from "../components/Nav"
import AuthModal from "../components/AuthModal"
const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  const authToken = false
  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(true)
  }
  return (
    <div className="overlay">
      <Nav
        minimal={false}
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Start something epic.</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "SignIn" : "Create Acccount"}
        </button>
        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  )
}

export default Home
