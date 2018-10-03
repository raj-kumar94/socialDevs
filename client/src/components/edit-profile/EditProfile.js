import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';


class EditProfile extends Component {
    
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
    if(nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
        const skills = profile.skills.join(',');
        profile.company = !isEmpty(profile.company) ? profile.company : "";
        profile.website = !isEmpty(profile.website) ? profile.website : "";
        profile.location = !isEmpty(profile.location) ? profile.location : "";
        profile.status = !isEmpty(profile.status) ? profile.status : "";
        profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : "";
        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
        profile.social = !isEmpty(profile.social) ? profile.profile : {};
        profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
        profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";
        profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";
        profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";
        profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";

        this.setState({
            handle: profile.handle,
            skills: skills,
            website: profile.website,
            company: profile.company,
            status: profile.status,
            location: profile.location,
            githubusername: profile.githubusername,
            bio: profile.bio,
            social: profile.social,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            youtube: profile.youtube,
            instagram: profile.linkedin
        });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    // const profileData = {
    //     handle: this.state.handle,
    //     company: this.state.company,
    //     website: this.state.website,
    //     location: this.state.location,
    //     status: this.state.status,
    //     skills: this.state.skills,
    //     githubusername: this.state.githubusername,
    //     bio: this.state.bio,
    //     twitter: this.state.twitter,
    //     facebook: this.state.facebook,
    //     linkedin: this.state.linkedin,
    //     youtube: this.state.youtube,
    //     instagram: this.state.instagram
    // }

    const profileData = {
        ...this.state
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
                    <h1 className="display-4 text-center">Edit Profile</h1>
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

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));