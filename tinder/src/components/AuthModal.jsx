import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const AuthModal = ({ setShowModal }) => {
  const handleClick = () => {
    setShowModal(false)
  }
  return (
    <div className="auth-modal">
      <div onClick={handleClick}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  )
}

export default AuthModal
