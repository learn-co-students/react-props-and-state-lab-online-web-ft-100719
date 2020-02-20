import React from 'react'

class Pet extends React.Component {

  determineGender = (petInfo) => {
    if (petInfo.gender === "male"){
      return "♂"
    } else {
      return "♀"
    }
  }

  handleClick = () => {
    this.props.onAdoptPet(this.props.pet.id)
  }

  determineAdoptability = (petInfo) => {
    if (petInfo.isAdopted){
      return <button className="ui disabled button">Already adopted</button>
    } else {
      return <button className="ui primary button" onClick={this.handleClick}>Adopt pet</button>
    }
  }
  render() {
    let petInfo = this.props.pet
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {petInfo.name} {this.determineGender(petInfo)}
          </a>
          <div className="meta">
    <span className="date">{petInfo.type}</span>
          </div>
          <div className="description">
          <p>Age: {petInfo.age}</p>
            <p>Weight: {petInfo.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {this.determineAdoptability(petInfo)}
        </div>
      </div>
    )
  }
}

export default Pet
