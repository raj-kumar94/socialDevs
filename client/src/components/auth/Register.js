import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import registerUser from '../../actions/authActions';
import PropTypes from 'prop-types'

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
    }
    // binding this to methods
    onChangeHandler = this.onChangeHandler.bind(this);
    onSubmit = this.onSubmit.bind(this);

    // defining methods
    onChangeHandler(e) {
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
        // axios.post('/api/users/register', newUser)
        //     .then(result => console.log(result.data))
        //     .catch(err => this.setState({errors: err.response.data}));

        // registerUser action was mapped by connect method
        this.props.registerUser(newUser);
    }

  render() {
      const {errors} = this.state;
      const { user } = this.props.auth;
    return (
      <div>
        <div className="register">
        {user.name ? user.name: "true"}
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your SocialDevs account</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    {/* class 'is-invalid' will be applied only if there is errors.name */}
                    <input type="text" className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.name
                    })} placeholder="Name" name="name" required value={this.state.name} onChange={this.onChangeHandler} />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>

                    <div className="form-group">
                    <input type="email" className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.email
                    })} placeholder="Email Address" name="email" required value={this.state.email} onChange={this.onChangeHandler} />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                    </div>

                    <div className="form-group">
                    <input type="password" className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.password
                    })} placeholder="Password" name="password" required value={this.state.password} onChange={this.onChangeHandler} />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>

                    <div className="form-group">
                    <input type="password" className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.password2
                    })} placeholder="Confirm Password" name="password2" required value={this.state.password2} onChange={this.onChangeHandler} />
                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                    </div>
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
Register.PropTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

// getting auth state from auth reducer, (see index.js)
const mapStateToProps = (state, props) => {
    // console.log({state})
    // state.auth is coming from root reducer (inside combineReducer method)
    return {
      auth: state.auth
    };
  };


export default connect(mapStateToProps, {registerUser:registerUser})(Register);
