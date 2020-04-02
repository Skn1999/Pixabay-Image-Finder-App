import React, { Component } from 'react'
import { GridList } from 'material-ui'
import TextField from 'material-ui/TextField';
import Select from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../image-results/ImageResults';
import axios from 'axios';


class SearchBar extends Component {
state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "15681304-6baa92707b6512c6376eb7b8b",
    images: []
}

    onTextChange = (e) => {
        let val = e.target.value;
        this.setState({
            [e.target.name]: val
        }, () => {
            if( val === ''){
                this.setState({ images : []})
            } else{
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then( res => this.setState({
                    images: res.data.hits
                }))
                .catch(err => console.log(err));
            }
            
        });
    }

    onAmountChange = (e, name, value) => this.setState({
        amount : value
    })

    render() {
        console.log(this.state.images);
        return (
            <div>
                <GridList container ></GridList>
                <TextField name="searchText" value={this.state.searchText} onChange={this.onTextChange} floatingLabelText="Search for images" fullWidth={true} />
                <br />
                <Select
                    name="amount" 
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={30}>30</MenuItem>

                </Select>
                <br />
                    {this.state.images.length > 0 ? <ImageResults images ={this.state.images} /> : null }

                </div>
        )
    }
}

export default SearchBar
