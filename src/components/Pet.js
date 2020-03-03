import React from 'react'

class Pet extends React.Component {

  constructor(props) {
    super()
    this.state = {
      pet: props.pet,
    }
  }

  render() {
    const MALE = '♂ '
    const FEMALE = '♀ ' 
    return (
      <div className="card">
        <div className="content">
          <a className="header">
           { this.state.pet.gender === "male" ? MALE : FEMALE }
           {this.state.pet.name}
          </a>
          <div className="meta">
    <span className="date">{this.state.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.state.pet.age}</p>
            <p>Weight: {this.state.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {
            this.state.pet.isAdopted ? 
            <button className="ui disabled button">Already adopted</button> 
            :
            <button 
            className="ui primary button" 
            onClick={this.props.onAdoptPet(this.state.pet.id)}
            >Adopt pet</button>
          }
        </div>
      </div>
    )
  }
}

export default Pet
