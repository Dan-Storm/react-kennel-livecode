import React, { Component } from 'react'
import EmployeeList from "./employee/EmployeeList"  // Import EmployeeList component
import LocationList from './location/LocationList';

export default class Kennel extends Component {
  /*
    Although you will eventually be pulling your objects
    from your json-server API, for this chapter, we're
    faking it and just creating those arrays in the component
    itself
*/
  employeesFromAPI = [
    { id: 1, name: "Jessica Jones" },
    { id: 2, name: "Jordan Nelson" },
    { id: 3, name: "Zoe LeBlanc" },
    { id: 4, name: "Blaise Roberts" }
  ]

  // This will eventually get pulled from the API
  locationsFromAPI = [
      { id: 1, name: "Nashville North", address: "500 Circle Way" },
      { id: 2, name: "Nashville South", address: "10101 Binary Court" }
  ]

  state = {
    employees: this.employeesFromAPI,
    locations: this.locationsFromAPI
  }

  addEmployee = () => {
    let new_employee = {id: 324, name: "Bubba Sparkle"}
    let employeeList = [...this.state.employees]
    employeeList.push(new_employee)
    this.setState({employees: employeeList})
  }

  render() {
    return (
      <div>
        <h3>Student Kennels</h3>
        <LocationList locations={this.state.locations}/>
        <EmployeeList employees={this.state.employees}/>
        <button onClick={this.addEmployee}>Click me</button>
      </div>
    );
  }
}
