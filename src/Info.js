import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { queryData } from './request';
import { query } from './request';
import Select from 'material-ui/Select/Select';
import MenuItem from 'material-ui/Menu/MenuItem';

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
    uid : localStorage.hasura_id,
    sems : [],
    branchs : [],
    semester : 3,
    branch : 'CSE',
  
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount(){



  }

  fetchInfo(){
    queryData({
      "type": "select",
      "args": {
          "table": "syllbus",
          "columns": [
              "*"
          ],
          "where": {}
      }
  }, 'Bearer '+localStorage.hasura_token).then((e)=>{

   
    var sems = []
    var branchs = []

    e.data.forEach(element => {

      // alert(JSON.stringify(element))

     

      sems.push(element.semester);

      branchs.push(element.branch)

    });

  sems=  sems.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  })

 branchs = branchs.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  })
   

    this.setState({
      branchs,sems,
      semester:3
    },()=> alert(JSON.stringify(this.state)))

    

   



  }).catch(x=>{

    console.log(x)

    })
      
    
  }

  componentWillMount(){
    this.fetchInfo();
  }



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
                  "semster": ""+data.semester
              }
          ]
      }
  },'Bearer '+localStorage.hasura_token).then(()=>{
    localStorage.info= JSON.stringify(data)
 
    window.location.hash = "/"
    window.location.reload()
  }
  ).catch(e=>{
    alert('error: '+JSON.stringify(e.response.data))
   
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
         

<br/>
           <span style = {{color : 'gray'}}> Branch  :   </span> 
          

            <Select
            value={this.state.branch}
            onChange={this.handleChange('branch')}
            displayEmpty
            name="age"
            label = 'df'
            className={classes.selectEmpty}
            style={{
              width:'120px'
            }}

          >
          

          {
            this.state.branchs.map((x)=>{

             return  <MenuItem value={x}>{x}</MenuItem>
            })
          }
          </Select>

          <br/>

          <span style = {{color : 'gray'}}> SEMESTER  :  </span> 

          <Select
            value={this.state.semester}
            onChange={this.handleChange('semester')}
            displayEmpty
            name="age"
            label = 'df'
            className={classes.selectEmpty}

            style={{
              width:'100px'
            }}

          >
            <MenuItem style={{
              width:'100%'
            }} value="">
              <em>None</em>
            </MenuItem>

          {
            this.state.sems.map((x)=>{

             return  <MenuItem value={x}>{x}</MenuItem>
            })
          }
          </Select>

          <br/>

  


       


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