import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


//tästä Add painike, save ja lomake

class AddCar extends Component {

    state = {
        open: false, brand: '', model: '', year: '', color: '', fuel: '', price: ''
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

      saveCar = () => {
        const newCar ={
            model: this.state.model,
            brand: this.state.brand,
            color: this.state.color,
            fuel: this.state.fuel,
            year: this.state.year,
            price: this.state.price
        };

        this.props.addCar(newCar);
        this.handleClose();
      };
      
      

    render() {
        return (
            <div>
                <Button style={{marginTop:10, marginBottom: 10}} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          New Car
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Car</DialogTitle>
          <DialogContent>            
            <TextField autoFocus margin="dense" name="brand" value={this.state.brand} onChange={this.handleChange} label="Brand" fullWidth />
            <TextField margin="dense" name="model" value={this.state.model} onChange={this.handleChange} label="Model" fullWidth />
            <TextField margin="dense" name="color" value={this.state.color} onChange={this.handleChange} label="Color" fullWidth />
            <TextField margin="dense" name="fuel" value={this.state.fuel} onChange={this.handleChange} label="Fuel" fullWidth />
            <TextField margin="dense" name="year" value={this.state.year} onChange={this.handleChange} label="Year" fullWidth />
            <TextField margin="dense" name="price" value={this.state.price} onChange={this.handleChange} label="Price (€)" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveCar} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
            </div>
        );
    }
}

export default AddCar;