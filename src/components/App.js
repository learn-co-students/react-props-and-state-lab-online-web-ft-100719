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

  checkFilterType = () => {
    let type = this.state.filters.type
    if (type !== "all"){
      return `?type=${type}`
    } else {
      return ""
    }
  }

  fetchReq = () => {
    const BASE_URL = '/api/pets'
    let URL_EXTENSION = this.checkFilterType()
    fetch(BASE_URL + URL_EXTENSION)
    .then(resp => resp.json())
    .then(pet => {
      this.setState({
        pets: pet
      })
    })
  }

  handleFilterChange = (event) => {
    event.persist()
    this.setState(prevState => {
      return {
        ...prevState,
          filters: {
            type: event.target.value
          }
      }
    })
  }

  adoptPet = (id) => {
    const pets = this.state.pets
    pets.map(pet => {
      if (pet.id === id){
        return pet.isAdopted = true
      }
    })
    this.setState({
      pets: pets
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
    <Filters onChangeType={this.handleFilterChange} onFindPetsClick={this.fetchReq} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
