import React, { Component } from 'react';
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { log } from 'util';

class UserMess extends Component{
    constructor(props){
        super(props)
        this.onClick=this.onClick.bind(this)
        this.state={
            messageBox:"Test"
        }
    }
    handleChange=(event)=>{
        this.setState({messageBox:event.target.value})
    }
 onClick(){
     console.log(this.state.messageBox);
 }
    render(){
        return(
            <div className="User">
            <FormControl>
                <Input ref="input" value={this.state.messageBox} onChange={this.handleChange}/>
                <Button variant="contained" size="medium" color="primary" onClick={this.onClick}>Your thoughts</Button>
            </FormControl>
            </div>
        )
    }
}
export default UserMess;