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

class Info extends React.Component {
  state = {
    open: true,
    uid : localStorage.hasura_id
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };




  onLogin() {


  }

  onRegister(e) {

    var data= this.state;



    queryData({
      "type": "insert",
      "args": {
          "table": "user",
          "objects": [
              {
                  "uid": data.uid,
                  "name": data.name,
                  "college": data.college,
                  "branch": data.branch,
                  "semster": data.semester
              }
          ]
      }
  },'Bearer '+localStorage.hasura_token).then(()=>{
    localStorage.info= JSON.stringify(data)
 
    window.location.hash = "/"
    window.location.reload()
  }
  ).catch(e=>{
    alert(JSON.stringify(e.response.data))
   
  })

  }


  render() {
    const { classes } = this.props;

    return (

      <center>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >

         
          <center style={getModalStyle()} className={classes.paper}>

      { !localStorage.info ?
          <React.Fragment>

            <h2>Enter your information</h2>

            <br /> <TextField label="uid" value={localStorage.hasura_id} disabled onChange = {this.handleChange('uid')}> </TextField>
            <br />
            <TextField label="name" value={this.state.name}  onChange = {this.handleChange('name')}> </TextField>
            <br />
            <TextField label="college" value={this.state.college} onChange = {this.handleChange('college')}> </TextField>
            <br />
            <TextField label="branch" value={this.state.branch} onChange = {this.handleChange('branch')}> </TextField>
            <br />
            <TextField label="semester" value={this.state.semester} onChange = {this.handleChange('semester')}> </TextField>


            <br />
            <br />

            <Button onClick={this.onRegister.bind(this)} style={{
              color: 'blue'
            }}>submit</Button>


            </React.Fragment> : 'Info already filled'
      }

          </center> 
        </Modal>
      </center>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const wInfo = withStyles(styles)(Info);

export default wInfo;