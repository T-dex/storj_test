import React, { Component } from 'react';
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'



class UserMess extends Component{
    constructor(props){
        super(props)
        this.onClick=this.onClick.bind(this)
        this.state={
            messageBox:""
        }
    }
    handleChange=(event)=>{
        this.setState({messageBox:event.target.value})
    }
 onClick(){
     const newMessage=this.state.messageBox
     this.props.changeUserMessage(newMessage)
     this.setState({messageBox:""})
 }
    render(){
        const message=Object.keys(this.props.tweet).map(key=>{
            if(this.props.tweet[key].active===true){
                return  <li className="list">{this.props.tweet[key].userName} says  {this.props.tweet[key].message}</li>
            }
        })
        
            
        
        return(
            <div className="User Center">
            <div className="input">
                <FormControl>
                    <Input className="inputbox" ref="input" value={this.state.messageBox} onChange={this.handleChange}/>
                    <Button variant="contained" size="medium" color="primary" onClick={this.onClick}>Your thoughts</Button>
                </FormControl>
            </div>
            <div>
                <ul>{message}</ul>
            </div>
            </div>
        )
    }
}
export default UserMess;