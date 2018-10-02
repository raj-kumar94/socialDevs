import React, { Component } from 'react';
import { connect } from 'react-redux';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
    }
    // binding this to methods
    onChange = this.onChange.bind(this);
    onSubmit = this.onSubmit.bind(this);

    // lifecycle methods

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    // we could also do istead of using componentWillReceiveProps method
    // const {errors} = this.props.erros;



    // defining methods
    onChange(e) {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(newUser);

        // registerUser action was mapped by connect method
        this.props.registerUser(newUser, this.props.history);
    }

  render() {
      const {errors} = this.state;
    return (
      <div>
        <div className="register">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your SocialDevs account</p>
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={errors.name}
                    />

                    <TextFieldGroup
                        placeholder="Email Address"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                        info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                    />

                    <TextFieldGroup
                        placeholder="Password2"
                        type="password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        error={errors.password2}
                    />
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}


// Any property you have in component, you should map it to PropTypes
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

// getting auth state from auth reducer, (see index.js)
const mapStateToProps = (state, props) => {
    // console.log({state})
    // state.auth is coming from root reducer (inside combineReducer method)
    return {
      auth: state.auth,
      errors: state.errors
    };
  };


export default connect(mapStateToProps, {registerUser:registerUser})(withRouter(Register));
