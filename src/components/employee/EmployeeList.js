import React, { Component } from 'react'

export default class EmployeeList extends Component {
  render() {
      return (
          <article>
              <h1>Employee List</h1>
              {
                this.props.employees.map(employee =>
                    <div key={employee.id}>
                        {employee.name}
                    </div>
                )
              }
          </article>
      );
  }
}
