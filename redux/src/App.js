import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { incrementar, decrementar, setear } from './reducers';
import logo from './logo.svg';
import UserForm from './components/UserForm';
import './App.css';

class App extends Component {
    handlSubmit = payload => {
        console.log(payload)
    }
    render() {
        return (
            <div className="App">
                <UserForm onSubmit={this.handlSubmit} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        valor: state.contador,
    }
}

const mapDispatchProps = dispatch => ({
    // incrementar: () => dispatch(incrementar()),
    // decrementar: () => dispatch(decrementar()),
    // setear: payload => dispatch(setear(payload)),
})

export default connect(mapStateToProps, mapDispatchProps)(App);