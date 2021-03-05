import React, { Component } from 'react';
import './App.css';
import Home from '../components/home/Home'
import Autorization from '../components/admin/autorization/Autorization'
import AdminPanel from '../components/admin/adminPanel/AdminPanel'
import page404 from '../components/page404/Page404'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { accessStatus } from "../flux/actions/autorizationActions"
import { currentUser } from "../flux/actions/autorizationActions"

class App extends Component {
  
  render() { 
    const { checkAccessStatus, currentUserData } = this.props
    console.error(this.props)
    return (

<Router history={this.props.history}>
      <div className="App">
          <Switch>
              <Route path='/' exact component={Home}/>
              <Route path="/login" exact component={() => <Autorization currentUser={currentUserData} accessStatus={checkAccessStatus}/>}/>
              <Route path="/login/admin"  component={() => <AdminPanel currentUserToken={this.props.currentUserToken} 
              currentUserName={this.props.currentUserName} />}/>
              <Route  component={page404} />
          </Switch>
      </div>
</Router>
    );
  }
}

const mapStateToProps = store => {
  console.warn(store) 
  return {
    accessStatus: store.autorization.accessStatus,
    currentUserToken: store.autorization.userToken,
    currentUserName: store.autorization.userName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAccessStatus: access => dispatch(accessStatus(access)),
    currentUserData: userData => dispatch(currentUser(userData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
