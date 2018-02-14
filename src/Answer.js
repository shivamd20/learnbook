import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import { Post } from './Feeds';
import Textarea from 'material-ui/Input/Textarea';
import TextField from 'material-ui/TextField/TextField';
import { queryData } from './request';
import Select from 'material-ui/Select/Select';
import MenuItem from 'material-ui/Menu/MenuItem';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '88%',
    margin : '6%',
    minWidth : '60px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    top : '50'
  
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitAnswer(q){

    queryData({
      "type": "insert",
      "args": {
          "table": "answer",
          "objects": [
              {
                  "answeredby": localStorage.hasura_id,
                  "description": this.state.ans,
                  "question": this.props.queId
              }
          ]
      }
  },'Bearer '+localStorage.hasura_token).then(()=>{

    alert('answer added')
 
  }
  ).catch(e=>{

    alert(JSON.stringify(e.response.data)+ JSON.stringify(this.props.queId))
   
  })
  }

  render() {
    const { classes } = this.props;

    if(this.props.queId===undefined){
        return ""
    }

    return (
      <div style={
          {overflowX : 'auto'}
      }>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.onClose}
          style={
          {overflowX : 'scroll'}
      }
        >
          <div  className={classes.paper} >
            

          {/* {JSON.stringify(this.props.data) +"qid="} */}

          {/* {this.props.queId } */}


            {
                <h2>
                    
                    {this.props.data[this.props.queId].statement
                    }
                    

                    </h2>}
                    <Select
            value={10}
            onChange={this.handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

                    {

                this.props.data[this.props.queId] &&
                this.props.data[this.props.queId].answers.map((d,i)=>{
                    return <div>
                    
                        <Post ans={
                            d.description
                        }/>

                    </div>;
                })
            }

            <TextField multiline = {true} rowsMax={20} rows={5} label = "Write your answer here" style={{
              width : '100%'
            }}
            
            onChange = {this.handleChange('ans')}

            />

            <br/>

            <Button style={{
              color : 'blue'
            }} onClick={this.submitAnswer.bind(this)}> 
            
            Submit Answer

            </Button>

          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;