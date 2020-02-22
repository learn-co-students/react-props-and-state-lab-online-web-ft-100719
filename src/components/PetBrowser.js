import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAdopted: false
    }
  }

  adoptPet = () =>{
    this.setState({
      isAdopted: true
    }, () => console.log(this.state.isAdopted)) 
  }

  render() {
    const petsKard = this.props.pets.map( pet => (
      <Pet pet={pet} key={pet.id} onAdoptPet={this.adoptPet}  />
    ));
    return (
    <div className="ui cards">
      {/* <Pet  /> */}
      {petsKard}
    </div> )
  }
}

export default PetBrowser
