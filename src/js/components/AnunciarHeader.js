import React from "react"
import { observer } from "mobx-react"
import AppBar from 'material-ui/AppBar'
import Announcement from 'material-ui/svg-icons/action/announcement'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'


const style = {
  margin: 0,
}
const buttonStyle ={
    padding: 6,
}
const customContentStyle = {
  maxWidth: '800px',
  width: '100%'
};
@observer
export default class AnunciarHeader extends React.Component {
    constructor(){
        super()
        this.state = {
            open: false,
            signUpopen: false,
            calOpen: false
        }
    }

    signup(){
      var email = document.getElementById('signup_email').value
      var password = document.getElementById('signup_password').value
      var passwordConfirmation = document.getElementById('signup_passwordConfirmation').value
      var username = document.getElementById('signup_username').value
      if(password != passwordConfirmation){
        alert('passwords must match')
      }
      else{
        this.props.anunciarStore.signup(email, username, password, passwordConfirmation)
        this.handlesignUpClose()
      }
    }
    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }
    login(){
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value
        this.props.anunciarStore.login(email, password)
        this.handleClose()
    }

    logout(){
        this.props.anunciarStore.logout()
        this.handleClose()
    }
    handleSignUpOpen(){
      this.setState({signUpopen: true})
    }
    handlesignUpClose(){
      this.setState({signUpopen: false})
    }

    handleOpenCal(){
      this.setState({calOpen: true})
    }

    handleCalClose(){
      this.setState({calOpen: false})
    }

    goToCal(){
      window.open('https://calendar.google.com/calendar/embed?src=86u3c4vqkr7o5g07qd1pip0fd4%40group.calendar.google.com&ctz=Asia/Calcutta', '_blank');
    }
    render(){
        var loading = this.props.anunciarStore.processing ? <CircularProgress color='#fff' size={30} /> : <div></div>
        var snackBar = this.props.anunciarStore.errors ? <Snackbar
                      open={true}
                      message={this.props.anunciarStore.error + " Error. Please try again"}
                      autoHideDuration={4000}
                    /> : <div></div>
        if(this.props.anunciarStore.isLoggedIn == 'true'){
            const actions = [
              <FlatButton
                label="Logout"
                secondary={true}
                disabled={!this.props.anunciarStore.isOnline}
                keyboardFocused={true}
                onTouchTap={this.logout.bind(this)}
              />,
            ];
            var { user } = this.props.anunciarStore

            return <div>
                <AppBar
                    title={<span>Anunciar</span>}
                    iconElementLeft={
                      <IconButton
                        tooltip={'Time table is here!'}
                        onTouchTap={this.handleOpenCal.bind(this)}
                      ><Announcement /> </IconButton>
                    }
                    iconElementRight={<div>
                        {loading}
                        <IconButton
                        tooltip={this.props.anunciarStore.user.email}
                        tooltipPosition="bottom-left"
                        style={style}
                        onTouchTap={this.handleOpen.bind(this)}>
                            <AccountCircle color='#fff' />
                        </IconButton></div>}
                  />

                  <Dialog
                      title="Hello!"
                      actions={actions}
                      modal={false}
                      contentStyle={customContentStyle}
                      autoScrollBodyContent={true}
                      open={this.state.open}
                      onRequestClose={this.handleClose.bind(this)}
                    >
                      <h3> {user.email} </h3>
                      <h7> {user.role} </h7>
                    </Dialog>
                  <Dialog
                      title="Time-table"
                      modal={false}
                      contentStyle={customContentStyle}
                      autoScrollBodyContent={true}
                      open={this.state.calOpen}
                      onRequestClose={this.handleCalClose.bind(this)}
                    >
                      <h3> Hello to Calendar! </h3>
                      <br />
                      <p> To get the time-table of the class use the link below to access it. You can click on the class that you are in and add it to your calendar. It is that simple. </p>
                      <br />
                      <br />
                      <FlatButton
                        label='Get your time-table'
                        secondary='true'
                        disabled={!this.props.anunciarStore.isOnline}
                        keyboardFocused={true}
                        onTouchTap={this.goToCal.bind(this)}
                        />
                    </Dialog>
                    {snackBar}
            </div>
        }
        else{
            const signUpactions = [
              <FlatButton
                label="Sign up"
                secondary={true}
                keyboardFocused={true}
                disabled={!this.props.anunciarStore.isOnline}
                onTouchTap={this.signup.bind(this)}
                />,
            ]
            const actions = [
              <FlatButton
                label="Login"
                secondary={true}
                keyboardFocused={true}
                disabled={!this.props.anunciarStore.isOnline}
                onTouchTap={this.login.bind(this)}
              />,
            ];
            return <div>
                <AppBar
                    title={<span>Anunciar</span>}
                    iconElementLeft={<IconButton><Announcement /></IconButton>}
                    iconElementRight={
                        <div>
                        {loading}
                        <FlatButton
                        label="Login"
                        secondary={true}
                        labelStyle={{color:'white'}}
                        style={buttonStyle}
                        onTouchTap={this.handleOpen.bind(this)}/>
                        <FlatButton
                        label="Sign Up"
                        secondary={true}
                        labelStyle={{color:'white'}}
                        style={buttonStyle}
                        onTouchTap={this.handleSignUpOpen.bind(this)}/>
                        </div>}
                  />
                  <Dialog
                      title="Login"
                      actions={actions}
                      modal={false}
                      contentStyle={customContentStyle}
                      autoScrollBodyContent={true}
                      open={this.state.open}
                      onRequestClose={this.handleClose.bind(this)}
                    >
                      <TextField
                          hintText="example@example.com"
                          floatingLabelText="Email"
                          fullWidth={true}
                          id='email'
                        /><br />
                      <TextField
                          hintText="shhhh"
                          floatingLabelText="Password"
                          type="password"
                          fullWidth={true}
                          id='password'
                        /><br />
                    </Dialog>
                    <Dialog
                      title="Sign Up"
                      actions={signUpactions}
                      modal={false}
                      contentStyle={customContentStyle}
                      autoScrollBodyContent={true}
                      open={this.state.signUpopen}
                      onRequestClose={this.handlesignUpClose.bind(this)}
                    >
                      <TextField
                          hintText="example@example.com"
                          floatingLabelText="Email"
                          fullWidth={true}
                          id='signup_email'
                        /><br />
                      <TextField
                          hintText="shhhh"
                          floatingLabelText="Password"
                          type="password"
                          fullWidth={true}
                          id='signup_password'
                        /><br />
                      <TextField
                        hintText="password confirmation"
                        floatingLabelText="Again"
                        type='password'
                        fullWidth={true}
                        id='signup_passwordConfirmation'
                        />
                        <br />
                        <TextField
                          hintText='we will use this in our future builds'
                          floatingLabelText='Username'
                          type='text'
                          fullWidth={true}
                          id='signup_username'
                        />
                    </Dialog>
                    {snackBar}
            </div>
        }
    }
}
