import React, { Component } from 'react';
//import ReactTable -> sulje ohjelma, npm add react-table, npm start
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';
import { CSVLink } from "react-csv";

//sortti ja searchi

class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {cars: [], open: false, message: ''}
    }

    //tsekkaa tentti kysymys että on tällä tavalla
componentDidMount() {
  this.fetchCars();
}

//fetchi

fetchCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then (response => response.json())
    .then (jsondata => this.setState({cars: jsondata._embedded.cars}))

}

//delete
deleteCar = (link) => {
    if (window.confirm("Are you sure?")) {
    fetch(link, {method: 'DELETE'})
    .then(response => this.fetchCars())
        //Snackbaria varten seuraavaksi open:true jotta se tulee näkyviin:
    .then(response => this.setState({open:true, message:'Car deleted'}))
    .catch(err => console.error(err))
    }
}
//edit:
editCar = (link, car) => {
    fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)      
        })
        .then(res => this.fetchCars())
        .then(response => this.setState({open:true, message:'Changes saved'}))
        .catch(err => console.error(err));
}

//https://github.com/github/fetch#post-json

addCar = (newCar) => {
    fetch('https://carstockrest.herokuapp.com/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)      
        })
        .then(res => this.fetchCars())
        .then(response => this.setState({open:true, message:'New car saved'}))
        .catch(err => console.error(err));
}

//Snackbarin handleClose
handleClose= () => {
    this.setState({open:false})
}

    render() {
        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand'
            },
            {
                Header: 'Model',
                accessor: 'model'
            },
            {
                Header: 'Color',
                accessor: 'color'
            },
            {
                Header: 'Year',
                accessor: 'year'
            },
            {
                Header: 'Fuel',
                accessor: 'fuel'
            },
            {
                Header: 'Price',
                accessor: 'price'
            },
            //update existing car:
            {
                Header: "",
                filterable: false,
                sortable: false,
                width: 90,
                accessor: "_links.self.href", 
                Cell: ({value, row}) => (<EditCar editCar={this.editCar} car={row} link={value} />)
            },
            //delete car:
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({value}) => <Button color="secondary" variant="contained" size="small" onClick={() => this.deleteCar(value)}>DELETE</Button>
            }
        ]

        return (
            <div>
                <AddCar addCar={this.addCar} />
                <CSVLink separator={";"} data={this.state.cars}>Download CSV</CSVLink>
               <ReactTable filterable={true} data={this.state.cars} columns={columns} />
               <Snackbar
                    open ={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      message={this.state.message}
                    />
            </div>
        );
    }
}

export default CarList;