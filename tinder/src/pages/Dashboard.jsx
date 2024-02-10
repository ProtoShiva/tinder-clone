import React from "react"
import { useState, useEffect } from "react"
import TinderCard from "react-tinder-card"
import ChatContainer from "../components/ChatContainer"
import axios from "axios"
import { useCookies } from "react-cookie"

const db = [
  {
    name: "himanshu",
    url: "https://media.assettype.com/filmcompanion%2F2023-10%2Fc4b7dd29-feeb-46c3-a12e-813599ad58ea%2FCover.png"
  },
  {
    name: "ryan gosling",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Ryan_Gosling_in_2018.jpg/640px-Ryan_Gosling_in_2018.jpg"
  },
  {
    name: "Brad pitt",
    url: "https://goldenglobes.com/wp-content/uploads/2023/10/brad-pitt_03_paramount-pictures.jpg"
  },
  {
    name: "Salman Khan",
    url: "https://m.timesofindia.com/photo/97416861/97416861.jpg"
  },
  {
    name: "Hrithik Roshan",
    url: "https://media.assettype.com/filmcompanion%2F2023-10%2Fc4b7dd29-feeb-46c3-a12e-813599ad58ea%2FCover.png"
  }
]

function Dashboard() {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(["user"])
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

  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete)
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
              {characters.map((character) => (
                <TinderCard
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url + ")" }}
                    className="card"
                  >
                    <h3>{character.name}</h3>
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
