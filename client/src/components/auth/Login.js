import React, { Component } from 'react'

class Login extends Component {

    state = {
        email: "",
        password: "",
        errors: {}
    }

    onSubmit = this.onSubmit.bind(this);
    onChangeHandler = this.onChangeHandler.bind(this);

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);
        
    };

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

  render() {
    return (
        <div className="login">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your SocialDevs account</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChangeHandler} />
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.email} onChange={this.onChangeHandler} />
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

export default Login;
