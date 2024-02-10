import React from "react"
import { useState, useEffect } from "react"
import TinderCard from "react-tinder-card"
import ChatContainer from "../components/ChatContainer"
import axios from "axios"
import { useCookies } from "react-cookie"

function Dashboard() {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(["user"])
  const [lastDirection, setLastDirection] = useState()
  const userId = cookies.UserId
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user", {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGenderUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/gendered-users", {
        param: { gender: user?.gender_interest }
      })
      setGenderedUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    getGenderUsers()
  }, [])

  // console.log("user", user)
  // console.log("gendered Users", genderedUsers)

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:3000/addmatch", {
        userId,
        matchedUserId
      })
      getUser()
    } catch (error) {
      console.log(error)
    }
  }

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + " left the screen!")
  }

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swiper-container">
            <div className="card-container">
              {genderedUsers?.map((character) => (
                <TinderCard
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.user_id)}
                  onCardLeftScreen={() => outOfFrame(character.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url + ")" }}
                    className="card"
                  >
                    <h3>{character.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p></p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
