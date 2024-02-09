import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
const ChatHeader = () => {
  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src="" alt="" />
        </div>
        <h3>Username</h3>
      </div>
      <div className="log-out-icon">
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </div>
    </div>
  )
}

export default ChatHeader
