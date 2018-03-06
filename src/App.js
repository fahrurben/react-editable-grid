import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import { bindActionCreators } from 'redux';

import ReactEditableGrid from './components/ReactEditableGrid';
import ReactEditableGridStyle from './components/ReactEditableGrid.css'; 

import Actions from './Actions.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data
    };

    this.columns = [
      {
        name: 'fullname',
        label: 'Fullname',
        accessor: 'fullname',
        width: 100
      },
      {
        name: 'firstname',
        label: 'Firstname',
        accessor: 'firstname',
        width: 100
      },
      {
        name: 'lastname',
        label: 'Lastname',
        accessor: 'lastname',
        width: 100
      },
      {
        name: 'address',
        label: 'Address',
        accessor: 'address',
        width: 100
      }
    ];

    this.searchData = props.searchData;
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data !== 'undefined') {
      this.setState({ data: nextProps.data });
    }
  }

  componentDidMount() {
    this.searchData();
  }

  render() {
    return (
      <div className="App">
        <ReactEditableGrid 
          data={this.state.data}
          gridWidth={300}
          gridHeight={200}
          rowOffsetHeight={25}
          headerOffsetHeight={25}
          columns={this.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.search.data
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({...Actions}, dispatch));

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

