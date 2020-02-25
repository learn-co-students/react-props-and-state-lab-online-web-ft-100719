import React from 'react'

class Pet extends React.Component {

  genderRender = (gender) => {
    if (gender === 'male') {
      return '♂'
    } else if (gender === 'female') {
      return '♀'
    }
  };

  optToAdopt = (isAdopted) => {
    return (isAdopted ? ( 
      <button className="ui disabled button">Already adopted</button>
    ) : (
      <button
        onClick={() => this.props.onAdoptPet(this.props.pet.id)}
        className="ui primary button">
        Adopt pet
      </button> )
    )
  };

  render() {
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {this.props.pet.name} {this.genderRender(this.props.pet.gender)}
          </a>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {this.optToAdopt(this.props.pet.isAdopted)}
        </div>
      </div>
    )
  };
}

export default Pet
