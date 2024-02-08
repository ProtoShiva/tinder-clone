import React from "react"
import Nav from "../components/Nav"
const Home = () => {
  const authToken = false
  const handleClick = () => {
    console.log("clicked button")
  }
  return (
    <>
      <Nav minimal={false} />
      <div className="home">
        <h1>Start something epic.</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "SignIn" : "Create Acccount"}
        </button>
      </div>
    </>
  )
}

export default Home
