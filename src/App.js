import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };

  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(
      resp => resp.json()).then(
        users => this.setState({ monsters: users })
      )
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  searchFilter(searchTerm, inputsToFilter) {
    //this is the original code from the class
    //intend to create an and search
    // return inputsToFilter.filter(input =>
    //   input.name.toLowerCase().includes(searchTerm.toLowerCase())
    // )

    let individualSearchTerms = searchTerm.split(" ");
    let matches = [];
    if (!searchTerm) {
      return inputsToFilter
    }
    for (let i = 0; i < inputsToFilter.length; i++) {
      let matchCount = 0;
      let currentInput = inputsToFilter[i];
      console.log(currentInput);
      for (let j = 0; j < individualSearchTerms.length; j++) {
        let currentSearchTerm = individualSearchTerms[j].toLowerCase();
        console.log(currentSearchTerm.toLowerCase(), currentInput.name.toLowerCase());
        console.log(currentInput.name.toLowerCase().indexOf(currentSearchTerm));
        if (currentInput.name.toLowerCase().indexOf(currentSearchTerm) >= 0) {
          console.log('match', matchCount)
          matchCount += 1;
        } else {
          console.log('no match');
          break
        };
      };

      if (matchCount === individualSearchTerms.length) {
        matches.push(currentInput);
      }
    };

    return matches;
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = this.searchFilter(searchField, monsters);





    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox placeholder="Search Monsters" handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;
