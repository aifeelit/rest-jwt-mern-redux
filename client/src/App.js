import React, { Component } from 'react';
import AppNavbar from './components/navbar'
import ShoppingList from './components/shoppingList'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import store from './store'
import ItemModal from './components/itemmodal'
import {Container} from 'reactstrap'
import {loadUser} from './actions/authactions'


class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser())
  }

  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/> 
          <Container>
          <ItemModal/>
          <ShoppingList/>
          </Container>
        </div>
      </Provider>
      
    );
  }
  
}

export default App;
