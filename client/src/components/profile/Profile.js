import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth: { isAuthenticated, loading: authLoading, user },
}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <section className="container">
      {!profile || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {!!isAuthenticated && !authLoading && user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {!!profile.experience.length ? (
                profile.experience.map((experience) => (
                  <ProfileExperience
                    key={experience._id}
                    experience={experience}
                  />
                ))
              ) : (
                <h4>No experience</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {!!profile.education.length ? (
                profile.education.map((education) => (
                  <ProfileEducation key={education._id} education={education} />
                ))
              ) : (
                <h4>No education</h4>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, auth }) => ({ profile, auth });

export default connect(mapStateToProps, { getProfileById })(Profile);
