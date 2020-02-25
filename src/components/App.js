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

  handleFilterType = event => {
    this.setState({
      filters: {...this.state.filters, type: event.target.value}
    })
  }

  handleFindPetsClick = () => {
   
    let indexUrl = '/api/pets'
    if(this.state.filters.type !== 'all' ){
      indexUrl += `?type=${this.state.filters.type}`
    }

    fetch(indexUrl)
    .then(res => res.json())
    .then(pet => this.setState({pets: pet}))
 
  }

  handleAdoption = (petId) => {

    this.setState({
      pets: this.state.pets.map(pet => pet.id === petId ? {...pet, isAdopted: true} : pet)
      
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
              <Filters onChangeType={this.handleFilterType} onFindPetsClick={this.handleFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoption}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
