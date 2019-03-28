import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import AddCar from './AddCar';
import Snackbar from '@material-ui/core/Snackbar';
import EditCar from './EditCar';


class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '', cars: [], open: false };

    }
    //fetch cars
    componentDidMount() {
        this.loadCars();
    }


    loadCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(jsondata => this.setState({ cars: jsondata._embedded.cars }))
            .catch(err => console.error(err));
    }
    //Delete cars
    deleteCar = (carLink) => {
        if (window.confirm("Are you sure?")) {
            fetch(carLink, { method: 'DELETE' })
                .then(res => this.loadCars())
                .then(res => this.setState({ open: true, message: 'Car deleted' }))
                .catch(err => console.error(err))

        }
    };
    saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)


            })
            .then(res => this.loadCars())
            .then(res => this.setState({ open: true, message: 'New Car added' }))
            .catch(err => console.error(err));

    };

    //Update a car
    updatedCar = (link, updatedCar) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCar)
            })
            .then(res => this.loadCars())
            .then(res => this.setState({ open: true, message: 'Changes saved' }))
            .catch(err => console.error(err));

    };
    handleClose = () => {
        this.setState({ open: false })
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
                Header: 'Fuel',
                accessor: 'fuel'
            },
            {
                Header: 'Year',
                accessor: 'year'
            },
            {
                Header: 'Price',
                accessor: 'price'
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({ value, row }) => <EditCar updatedCar={this.updatedCar} link={value} car={row} />
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({ value }) => <Button variant="outlined" color="secondary" onClick={() => this.deleteCar(value)}>Delete</Button>
            },

        ];
        return (
            <div>
                <AddCar saveCar={this.saveCar} />
                <ReactTable filterable={true} data={this.state.cars} columns={columns} />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={this.state.message}
                />
            </div >
        );
    }
}

export default CarList;