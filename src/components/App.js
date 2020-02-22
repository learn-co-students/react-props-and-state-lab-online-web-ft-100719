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

  onAdoptPet = id =>{
    this.setState({
      pets: this.state.pets.map( pet => pet.id === id ? {...pet, isAdopted: true} : pet)
    }) 
  }

  handleChange = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }}, 
      () => console.log(this.state.filters.type) 
    )}
  
  handleClick = () => {
    if (this.state.filters.type === 'all'){
      fetch('/api/pets')
      .then(resp => resp.json())
      .then((pets) => {
        this.setState({
          pets: pets
        })
      })
     
    } else if (this.state.filters.type !== "all"){
      // console.log('this will get rendered')
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then((pets) => {
        this.setState({
          pets: pets
        })
      })
    }
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
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.handleClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
