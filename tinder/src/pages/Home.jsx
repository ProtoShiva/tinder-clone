import React, { useState } from "react"
import Nav from "../components/Nav"
import AuthModal from "../components/AuthModal"
const Home = () => {
  const [showModal, setShowModal] = useState(false)

  const authToken = false
  const handleClick = () => {
    setShowModal(true)
  }
  return (
    <div className="overlay">
      <Nav minimal={false} authToken={authToken} setShowModal={setShowModal} showModal={showModal} />
      <div className="home">
        <h1>Start something epic.</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "SignIn" : "Create Acccount"}
        </button>
        {showModal && (<AuthModal setShowModal={setShowModal} />)}
      </div>
    </div>
  )
}

export default Home
