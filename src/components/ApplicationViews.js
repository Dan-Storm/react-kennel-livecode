import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import AnimalList from './animal/AnimalList'
import AnimalManager from '../modules/AnimalManager'
import AnimalDetail from './animal/AnimalDetail'
import { withRouter } from 'react-router'
import AnimalForm from './animal/AnimalForm'
import Login from './authentication/Login'
import AnimalEditForm from './animal/AnimalEditForm'
class ApplicationViews extends Component {

    state = {
        employees: [],
        locations: [],
        animals: []
    }

    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null


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

    addAnimal = animal =>
        AnimalManager.post(animal)
            .then(() => AnimalManager.getAll())
            .then(animals =>
                this.setState({
                    animals: animals
                })
            );

    updateAnimal = (editedAnimalObject) => {
        return AnimalManager.put(editedAnimalObject)
            .then(() => AnimalManager.getAll())
            .then(animals => {
                this.setState({
                    animals: animals
                })
            });
    };

    render() {
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals} deleteAnimal={this.deleteAnimal} {...props} />
                }} />
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList deleteEmployee={this.deleteEmployee}
                            animals={this.state.animals}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route
                    path="/animals/:animalId(\d+)/edit" render={props => {
                        return <AnimalEditForm {...props} employees={this.state.employees} updateAnimal={this.updateAnimal} />
                    }}
                />
                <Route exact path="/animals/:animalId(\d+)" render={(props) => {
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

                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees} />
                }} />
            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)
