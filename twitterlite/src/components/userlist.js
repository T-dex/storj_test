import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link } from 'react-router-dom' 

class UserList extends Component{
    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event){
        const checked=event.target.checked; 
        const checkedUser= event.target.value;            
        const userData= {checked, checkedUser}
        this.props.displayUser(userData)        
       //change checked of user to !checked
    }
    render(){
        const userName=Object.keys(this.props.users).map(key=>{
            return <FormControlLabel
            key={key}
            control={
                <Switch
                key={key}
                checked={this.props.users[key].active}
                onChange={this.handleChange}
                component={Link}
                to={this.props.users[key].userName}
                value={this.props.users[key].userName}
                />
            }label={this.props.users[key].userName} />
        })
       
        
        return(
            <div className="User">
                <FormGroup column>
                  {userName}
                </FormGroup>
            </div>
        )
    }
}
export default UserList;