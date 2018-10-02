import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createProfile } from '../../actions/profileActions';


class CreateProfile extends Component {
    
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {},
  };

  onChange = this.onChange.bind(this);
  onSubmit = this.onSubmit.bind(this); 

  // while submitting the form and making ajax req to create profile
  // if there is any error, it will be passed in componentWillReceiveProps
  // because we are listening to the errors and same has been declared in mapStateToProps
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({
            errors:nextProps.errors
        });
    }
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        youtube: this.state.youtube,
        instagram: this.stateinstagram
    }

    this.props.createProfile(profileData, this.props.history);
  };
    
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if(displaySocialInputs) {
        socialInputs = (
            <div>
                <InputGroup  
                    placeholder="Twitter Profile Url"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                />
                <InputGroup  
                    placeholder="Linkedin Profile Url"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                />
                <InputGroup  
                    placeholder="Youtube Channel Url"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                />
                <InputGroup  
                    placeholder="Facebook Profile Url"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                />
                <InputGroup  
                    placeholder="Instagram Profile Url"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                />
            </div>
        );
    }
    // select options for status
    const options = [
        { label: '* Select Professional Status', value:0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' },
    ];

    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create Your Profile</h1>
                    <p className="lead text-center">
                        Let's list your awesomeness!
                    </p>
                    <small className="d-block pb-3">* = Required field</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder="* Profile hanlde"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="a unique name for your profile."
                        />
                        <SelectListGroup 
                            placeholder="Status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            error={errors.status}
                            options={options}
                            info="What is your current status ?"
                        />
                        <TextFieldGroup 
                            placeholder="Company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                            info="Where do you work ?"
                        />
                        <TextFieldGroup 
                            placeholder="Website"
                            name="website"
                            value={this.state.website}
                            onChange={this.onChange}
                            error={errors.website}
                            info="Your website here"
                        />
                        <TextFieldGroup 
                            placeholder="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                            info="City or state"
                        />
                        <TextFieldGroup 
                            placeholder="* Skills"
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={errors.skills}
                            info="Please use comma separated values (eg. HTML, JS, PHP)"
                        />
                        <TextFieldGroup 
                            placeholder="Github Username"
                            name="githubusername"
                            value={this.state.githubusername}
                            onChange={this.onChange}
                            error={errors.githubusername}
                            info="Your github profile link"
                        />
                        <TextAreaFieldGroup 
                            placeholder="Short Bio"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="Tell us a little about yourself"
                        />
                        <div className="mb-3">
                            <button 
                            type="button"
                            className="btn btn-light" 
                            onClick={() => {
                                this.setState((prevState) => {
                                    return {
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }
                                })
                            }}>
                                Add Social Network Links 
                            </button>
                            <span className="text-muted">Optional</span>
                        </div>
                        {socialInputs}
                        <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));