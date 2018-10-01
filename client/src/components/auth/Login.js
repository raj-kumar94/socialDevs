import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {

    state = {
        email: "",
        password: "",
        errors: {}
    }

    onSubmit = this.onSubmit.bind(this);
    onChangeHandler = this.onChangeHandler.bind(this);

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);
        this.props.loginUser(user);
        
    };

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

  render() {
    const { errors } = this.state;

    return (
        <div className="login">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your SocialDevs account</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input type="email" className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.email
                    })} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChangeHandler} />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                    <input type="password" className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.password
                    })} placeholder="Password" name="password" value={this.state.password} onChange={this.onChangeHandler} />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
    )
  }
}


Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
};

export default connect(mapStateToProps, { loginUser: loginUser })(Login);
