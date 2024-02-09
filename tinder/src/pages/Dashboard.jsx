import React from "react"
import { useState } from "react"
import TinderCard from "react-tinder-card"
import ChatContainer from "../components/ChatContainer"

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
