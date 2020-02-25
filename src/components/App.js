import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    const newType = event.target.value
    this.setState({
      filters: {
        type: newType
      }
    })
  }

  onFindPetsClick = (event) => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets') 
        .then(resp => resp.json())
        .then(petData => {
          this.setState({
            pets: petData
          })
        })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`) 
        .then(resp => resp.json())
        .then(petData => {
          this.setState({
            pets: petData
          })
        })
    }
  }

  onAdoptPet = (id) => {
    const newPets = this.state.pets
    newPets.map(pet => {
      if (pet.id === id) {
        return pet.isAdopted = true
      }
    })
    this.setState({
      pets: newPets
    })
    console.log(this.state.pets)
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
