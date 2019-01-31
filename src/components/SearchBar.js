import React, { Component } from 'react';
import Select from 'react-select';
import './searchBar.css';

class SearchBar extends Component {
  onFormSubmit = (e) => {
    e.preventDefault();
  }

  onSelectChange = (option) => {
    if (option) {
      this.props.onSelectChange(option.value);
    }
  };

  render() {
    return (
      <div className="search-bar">
        <Select 
          options={this.props.options} 
          placeholder={this.props.placeholder}
          isClearable="true"
          onChange={(option) => this.onSelectChange(option)}
        />
      </div>
    );
  }
}

export default SearchBar;