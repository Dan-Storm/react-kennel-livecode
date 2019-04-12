import React, { Component } from 'react'

export default class AnimalList extends Component {
  render() {
      return (
          <article className="content">
              <h1>Our Adorable Animals</h1>
              {
                this.props.animals.map(animal =>
                    <div key={animal.id}>
                        {animal.name}
                    </div>
                )
              }
          </article>
      );
  }
}
