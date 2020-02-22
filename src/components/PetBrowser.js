import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  
  render() {
    // console.log(this.props)
    const petsKard = this.props.pets.map( pet => (
      <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet}  />
    ));
    return (
    <div className="ui cards">
      {/* <Pet  /> */}
      {petsKard}
    </div> )
  }
}

export default PetBrowser
