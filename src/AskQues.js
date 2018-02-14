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


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class AskQue extends React.Component {
  state = {
    open: true,
    que : ''
  };



  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  onRegister(e) {

    var data= this.state;


    queryData({
      "type": "insert",
      "args": {
          "table": "question",
          "objects": [
              {
                  "statement": this.state.que,
                  "askedby": localStorage.hasura_id
              }
          ]
      }
  },'Bearer '+localStorage.hasura_token).then(()=>{

    alert('question added')
 
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
          onClose={
              ()=>{
                  window.location.hash='/'
              }
          }
        >

         
          <center style={getModalStyle()} className={classes.paper}>

      {
          <React.Fragment>

            <h2>Ask Question</h2>

            <br /> <TextField label="Write your question here" value={this.state.que}  multiline = {true} onChange = {this.handleChange('que')} rows={3} style={{
                width:'100%'
            }} rowsMax={12}> </TextField>
            <br />
     
    

            <Button onClick={this.onRegister.bind(this)} style={{
              color: 'blue'
            }}>submit</Button>


            </React.Fragment> 
      }

          </center> 
        </Modal>
      </center>
    );
  }
}

AskQue.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const wInfo = withStyles(styles)(AskQue);

export default wInfo;