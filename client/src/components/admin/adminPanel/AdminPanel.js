import React from 'react';
import './AdminPanel.css';
import { withRouter } from 'react-router-dom';

class AdminPanel extends React.Component {
  


LogOutHandler = () =>{
  localStorage.clear()
  this.props.history.push("/");
}

  componentDidMount(){

  // fetch('http://localhost:5000/login/admin', {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         }
  //     }).then(res => res.text())
  //     .then(res => {
  //       // if(res === "Forbidden"){
  //       //   localStorage.clear()
  //       // }
  //     })
  }

  render(){
    // console.error(this.props.isLogin)
    // console.error(this.props.currentUserToken)
    if(!this.props.currentUserToken){
      return <div>Not Autorized as Admin</div>
    } else{
      return (
        <div className="AdminPanel">
          <h1>Admin panel is on</h1>
          <p>Hello, {this.props.currentUserName}</p>
          <button onClick={this.LogOutHandler}>Log OUT</button>
        </div>
      );
    }
  }
}

export default withRouter (AdminPanel)