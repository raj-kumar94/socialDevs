import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }  

  onDeleteClick = this.onDeleteClick.bind(this);

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteAccount();
  }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    
    if(profile === null || loading === true) {
      dashboardContent = <Spinner />
    } else {
      // check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
            <ProfileActions />
            <div style={{marginBottom: '60px'}}></div>
            <button className="btn btn-danger" onClick={this.onDeleteClick}>Delete My Account</button>
          </div>
        )
      } else {
        // user has logged in nut has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You haven't setup any profile yet, go ahead and add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info" >
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);