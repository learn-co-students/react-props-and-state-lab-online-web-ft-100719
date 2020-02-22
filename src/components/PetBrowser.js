import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    // make a card for each pet
    let petCards = this.props.pets.map(pet => (
      <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet}/>
    ))
    return <div className="ui cards">{petCards}</div>

  }
}

export default PetBrowser
