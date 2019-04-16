import { Route } from 'react-router-dom'
import React, { Component } from "react"
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import AnimalList from './animal/AnimalList'
import AnimalManager from '../modules/AnimalManager'


export default class ApplicationViews extends Component {

    state = {
      employees: [],
      locations: [],
      animals: []
    }

    componentDidMount() {
      const newState = {}

      AnimalManager.getAll()
      .then(animals => newState.animals = animals)
      .then(() => fetch("http://localhost:5002/employees")
      .then(r => r.json()))
      .then(employees => {
        newState.employees = employees
        this.setState(newState)
      })
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
            </React.Fragment>
        )
    }
}
