import React from 'react';
import './Autorization.css';
import { withRouter } from 'react-router-dom';

class Autorization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: ""
        }
    }

    authorizationHandler = (e) => {
        if (e.target.className === "admin-name") {
            this.setState({ name: e.target.value })
        } else {
            this.setState({ password: e.target.value })
        }
    }


    loginAsAdmin = () => {
        let data = {
            "login": this.state.name,
            "password": this.state.password
        }
        fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(res => res.text())
            .then(res =>{
                if(res.includes("access denied")){
                    this.props.accessStatus(false)
                } else if (res.includes("token")){
                    this.props.accessStatus(true)
                    this.props.history.push("/login/admin");
                    let parsedToken = JSON.parse(res)
                    let userDataArr = [parsedToken.token,parsedToken.user.name]
                    this.props.currentUser(userDataArr)
                    localStorage.setItem("token",parsedToken.token)
                    localStorage.setItem("user",parsedToken.user.name)
                }
            })
    }


    render() {
        
        return ( 
        <div className = "Autorization" >
            <h1> Autorization </h1> 
            <input type = "text" placeholder = "Name" className = "admin-name" onChange = { this.authorizationHandler }/> 
            <input type = "text" placeholder = "Password" className = "admin-password" onChange = { this.authorizationHandler }/> 
            <button className = "submit-btn" onClick = { this.loginAsAdmin }> Login </button> 
            </div>
        );
    }
}

export default withRouter (Autorization);