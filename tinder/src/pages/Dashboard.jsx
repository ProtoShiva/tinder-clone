import React from "react"
import { useState } from "react"
import TinderCard from "react-tinder-card"
import ChatContainer from "../components/ChatContainer"

const db = [
  {
    name: "Richard Hendricks",
    url: "https://media.assettype.com/filmcompanion%2F2023-10%2Fc4b7dd29-feeb-46c3-a12e-813599ad58ea%2FCover.png"
  },
  {
    name: "Erlich Bachman",
    url: "https://media.assettype.com/filmcompanion%2F2023-10%2Fc4b7dd29-feeb-46c3-a12e-813599ad58ea%2FCover.png"
  },
  {
    name: "Monica Hall",
    url: "https://media.assettype.com/filmcompanion%2F2023-10%2Fc4b7dd29-feeb-46c3-a12e-813599ad58ea%2FCover.png"
  },
  {
    name: "Jared Dunn",
    url: "https://media.assettype.com/filmcompanion%2F2023-10%2Fc4b7dd29-feeb-46c3-a12e-813599ad58ea%2FCover.png"
  },
  {
    name: "Dinesh Chugtai",
    url: "https://media.assettype.com/filmcompanion%2F2023-10%2Fc4b7dd29-feeb-46c3-a12e-813599ad58ea%2FCover.png"
  }
]

function Dashboard() {
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
    <div className="dashboard">
      <ChatContainer />
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
  )
}

export default Dashboard
