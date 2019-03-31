import React from 'react';
import {Formik} from 'formik';
import './dashboard.css';
import * as Yup from 'yup';
import {actions} from './actions';
import {connect} from 'react-redux';

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {error:'' };    
      }
    handleReset = () =>{   
        this.setState({error : ""});     
        this.nam.value = '';
    }
    handleSubmit = () => { 
        this.setState({error : ""});
        if(this.nam.value){       
            this.props.loadUserData(this.nam.value);
        }
        else{
            this.setState({error : "Input field cannot be empty. Try Again"});
            console.log(this.state.error);
        }
    }
    render() {               
        return (            
            <div > 
                <div className="row">
                    <div className="col-md-10 col-md-offset-1 custom">
                    </div>
                </div>              
                <section>  
                <div className="row">      
                <div className="col-md-10 col-md-offset-1" >           
                    <h2>GitHub Name</h2>  
                    <form >
                        <div className="form-group">
                            <input type="text" ref={input => this.nam = input} className="form-control" placeholder="Enter your username" />
                        </div>
                        {this.state.error && <div className="alert alert-danger" style={{color:'red', fontSize: '80%'}}>{this.state.error}</div>}
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="button"  onClick = {this.handleReset}>Reset</button>
                        </div>                       
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="button"  onClick = {this.handleSubmit}>Submit</button>
                        </div>
                    </form>  
                    
                    </div>   
                    </div>             
                </section>
                    <div className="row">      
                        <div className="col-md-10 col-md-offset-1" >
                        <div className="output">
                            {JSON.stringify(this.props.user, null, 2)}
                        </div>
                        </div>   
                    </div> 
                <section>

                </section>
            </div>       
        );
    }
}

// making the most current state of 'user' available as props in the component
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

// creating a function called 'loadUserData'
// that dispatches a 'LOAD_USER_DATA' action to the store
// so that saga can trigger and start the API request
const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    };
};

// connect the Dashboard component and export it for use in <App />
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
