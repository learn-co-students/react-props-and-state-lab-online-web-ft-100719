import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return this.props.pets.map((pet, index) => <div className="ui cards" key={index}> <Pet key={index} id={pet.id} onAdoptPet={this.props.onAdoptPet}/> </div>)
  }
}

export default PetBrowser
