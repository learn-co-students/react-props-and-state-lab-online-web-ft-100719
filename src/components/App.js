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

  updateFilterType = (newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: newValue
      }
    });
  }

  setAdopted = (petId) => {
    const newPetState = this.state.pets.map(pet => {
      if (pet.id === petId)
        return { ...pet, isAdopted: true }
      else 
        return pet
    });
    this.setState({ pets: newPetState });
   
  }

  fetchMyPets = () => {
    let fetchURL = "/api/pets";
    switch (this.state.filters.type) {
      case "all":
        break;
      case "cat":
        fetchURL += "?type=cat"
        break;
      case "dog":
        fetchURL += "?type=dog"
        break;
      case "micropig":
        fetchURL += "?type=micropig"
        break;
      default:
        break;
    }
    
    console.log(fetchURL)
    fetch(fetchURL )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Could not fetch pets');
      }
    })
    .then((data) => { this.setState({ pets: data }) })
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
              <Filters onChangeType="this.updateFilterType"
              onFindPetsClick={this.fetchMyPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.setAdopted}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
