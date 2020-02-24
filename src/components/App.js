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

  changeFilterType = newFilterType => {
    this.setState(prevState => {
      return {
        ...prevState,
        filters: {
          ...prevState.filters,
          type: newFilterType
        }
      }
    })
  }

  findPets = () => {
    let fetchUrl = '/api/pets'
    fetchUrl += (this.state.filters.type !== 'all') ? '?type=' + this.state.filters.type : ''

    fetch(fetchUrl).then(resp => resp.json()).then(json => {
      this.setState({
        pets: json
      })
    })
  }

  findAndAdoptPet = id => {
    const petIndex = this.state.pets.findIndex(pet => pet.id === id)
    const adoptedPet = this.state.pets[petIndex]
    adoptedPet.isAdopted = true
    let modifyPets = this.state.pets
    modifyPets[petIndex] = adoptedPet
    this.setState(prevState => {
      return {
        ...prevState,
        pets: modifyPets
      }
    })
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
              <Filters onChangeType={this.changeFilterType} onFindPetsClick={this.findPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.findAndAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
