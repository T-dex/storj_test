import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class UserList extends Component{
    constructor(props){
        super(props)
    }
    handleChange(event){
        const checked=!event.target.checked;
        console.log(checked, event.target.checked);
        const test ="this is getting passed along"
        console.log(this.props);
        
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