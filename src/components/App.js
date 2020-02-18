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
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    let fetchURL = '';
    switch (this.state.filters.type) {
      case 'cat':
        fetchURL = '/api/pets?type=cat'
        break;
      case 'dog':
        fetchURL = '/api/pets?type=dog'
        break;
      case 'micropig':
        fetchURL = '/api/pets?type=micropig'
        break;
      case 'all':
        fetchURL = '/api/pets'
    }
    fetch(fetchURL)
    .then(response => response.json())
    .then(petsArray => this.setState({
      pets: petsArray,
    }))
  }

  onAdoptPet = (id) => {
    this.setState({
      pets: this.state.pets.map(pet => pet.id === id ? {...pet, isAdopted: true} : pet)
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
