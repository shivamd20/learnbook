import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { queryData } from './request';
import { query } from './request';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


// query({}).then(e=> console.log(e)).catch(e=>console.log(e));

queryData({ type: 'select' }).then(e => console.log('data ', e.response)).catch(e => console.log('error', e.response));;


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  state = {
    open: true,
    uname: '',
    password: ''
  };




  onLogin() {



    query({
      method: 'post',
      data:
        {
          "provider": "username",
          "data": {
            "username": this.state.uname,
            "password": this.state.password
          }
        },
      url: 'https://auth.broadminded63.hasura-app.io/v1/login',
    }).then(e => {

    //   {
    //     "auth_token": "5a17d7476ed9f4730b0c932a2557544ba46b256dd0516dbd",
    //     "username": "johnksmijth",
    //     "hasura_id": 27,
    //     "hasura_roles": [
    //         "user"
    //     ]
    // }

    localStorage.hasura_token = e.data.auth_token;
    localStorage.username = e.data.username;
    localStorage.hasura_id = e.data.hasura_id;

    window.location.reload();

    alert(JSON.stringify(e))

    }).catch(e =>{
      alert(e.response.data.message)
    })


  }

  onRegister() {


    query({
      method: 'post',
      data:
        {
          "provider": "username",
          "data": {
            "username": this.state.uname,
            "password": this.state.password
          }
        },
      url: 'https://auth.broadminded63.hasura-app.io/v1/signup',
    }).then(e => {

    //   {
    //     "auth_token": "5a17d7476ed9f4730b0c932a2557544ba46b256dd0516dbd",
    //     "username": "johnksmijth",
    //     "hasura_id": 27,
    //     "hasura_roles": [
    //         "user"
    //     ]
    // }

    localStorage.hasura_token = e.data.auth_token;
    localStorage.username = e.data.username;
    localStorage.hasura_id = e.data.hasura_id;

    window.location.reload();

    }).catch(e =>{
      alert(e.response.data.message)
    })

  }


  render() {
    const { classes } = this.props;

    if(localStorage.hasura_token)
         return (

        <center>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={()=>{
              window.location.hash = '/';
            }}
          >
  
            <center style={getModalStyle()} className={classes.paper}>
              <h2>Logged In</h2> <br />
              <br />
              <br />
  
            
              <Button onClick={()=>{

                localStorage.clear();
                window.location.reload();


              }} style={{
                color: 'blue'
              }}>Logout</Button>
  
            </center>
          </Modal>
        </center>
      );
    
      else

    return (

      <center>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >

          <center style={getModalStyle()} className={classes.paper}>
            <h2>Login | Register</h2> <br />
            <TextField label="Username" value={this.state.uname} onChange={

              (e) => {

                this.setState({
                  uname: e.target.value
                })

              }

            }> </TextField>
            <br />
            <TextField label="password" type="password" value={this.state.password}

              onChange={

                (e) => {

                  this.setState({
                    password: e.target.value
                  })

                }

              }
            >dfghjfgh </TextField>
            <br />
            <br />

            <Button onClick={this.onLogin.bind(this)}>Login</Button>
            <Button onClick={this.onRegister.bind(this)} style={{
              color: 'blue'
            }}>Register</Button>

          </center>
        </Modal>
      </center>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;