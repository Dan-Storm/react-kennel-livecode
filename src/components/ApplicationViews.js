import { Route } from 'react-router-dom'
import React, { Component } from "react"
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import AnimalList from './animal/AnimalList'
import AnimalManager from '../modules/AnimalManager'
import AnimalDetail from './animal/AnimalDetail'
import { withRouter } from 'react-router'

class ApplicationViews extends Component {

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

    deleteAnimal = id => AnimalManager.delete(id)
    .then(AnimalManager.getAll)
    .then(animals => {
        this.props.history.push("/animals")
        this.setState({ animals: animals })
    })

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals} deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    // Find the animal with the id of the route parameter
                    console.log("PROPS", props)
                    console.log("THIS.PROPS", this.props)
                    let animal = this.state.animals.find(animal =>
                        animal.id === parseInt(props.match.params.animalId)
                    )

                    // If the animal wasn't found, create a default one
                    if (!animal) {
                        animal = { id: 404, name: "404", breed: "Dog not found" }
                    }

                    return <AnimalDetail animal={animal}
                        deleteAnimal={this.deleteAnimal} />
                }} />
            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)
