import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useCookies } from "react-cookie"
const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"])

  const logout = () => {
    removeCookie("UserId", cookies.UserId)
    removeCookie("AuthToken", cookies.AuthToken)
    window.location.reload()
  }

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.url} alt={"photo of " + user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <div className="log-out-icon">
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </div>
    </div>
  )
}

export default ChatHeader
