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
    };
  };

  changeType = (select) => {
    console.log(select.target.value);
    this.setState({
      filters: {
        ...this.state.filters,
        type: select.target.value
      }
    });
  };

  setPets = (pets) => {
    this.setState({pets});
  };

  findPetsClick = () => {
    const type = this.state.filters.type;
    if (type === 'all') {
      fetch('/api/pets')
      .then(r => r.json())
      .then(this.setPets);
    } else {
      fetch('/api/pets?type=' + type)
      .then(r => r.json())
      .then(this.setPets);
    }
  };

  adoptPet = (petId) => {
    let pets = [...this.state.pets];
    let index = pets.findIndex(pet=>pet.id === petId);
    pets[index].isAdopted = true;
    this.setState({pets});
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.findPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default App
