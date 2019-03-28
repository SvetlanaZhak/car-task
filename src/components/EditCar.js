import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditCar extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, model: '', brand: '', color: '', fuel: '', year: '', price: '' };

    }
    handleClickOpen = () => {
        this.setState({
            open: true,
            brand: this.props.car.brand,
            model: this.props.car.model,
            color: this.props.car.color,
            fuel: this.props.car.fuel,
            year: this.props.car.year,
            price: this.props.car.price,
        });
        console.log(this.props.link);
        console.log(this.props.car);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    addCar = () => {
        const newCar = {
            model: this.state.model,
            brand: this.state.brand,
            color: this.state.color,
            fuel: this.state.fuel,
            year: this.state.year,
            price: this.state.price,

        }
        this.props.updatedCar(this.props.link, newCar);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField onChange={this.handleChange}
                            autoFocus margin="dense" value={this.state.brand} name="brand" label="Brand"
                            fullWidth />

                        <TextField onChange={this.handleChange} value={this.state.model}
                            margin="dense" name="model" label="Model"
                            fullWidth />
                        <TextField onChange={this.handleChange} value={this.state.color}
                            margin="dense" name="color" label="Color"
                            fullWidth />
                        <TextField onChange={this.handleChange} value={this.state.fuel}
                            margin="dense" name="fuel" label="Fuel"
                            fullWidth />
                        <TextField onChange={this.handleChange}
                            margin="dense" name="year" label="Year" value={this.state.year}
                            fullWidth />
                        <TextField onChange={this.handleChange} value={this.state.price}
                            margin="dense" name="price" label="Price"
                            fullWidth />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.addCar} color="primary">
                            Save
                         </Button>
                    </DialogActions>
                </Dialog>
                <Button color="secondary" variant="outlined" onClick={this.handleClickOpen}>EDIT</Button>

            </div>
        );
    }
}

export default EditCar;