import React from "react";
import {
  LandingBranchesWarp,
  BranchHeading,
  LandingBranchesImage,
  StyledButton,
} from "./BatchesLandingPageBanner.style";
import { Carousel } from "antd";
import { MdCalendarMonth } from "react-icons/md";

const LandingBranches = ({ data }) => {
  const { banners, stats } = data;


  return (
    <>
      <LandingBranchesWarp>
        <div className="content-overlay">
          <p className="Neverbtn">Never Stop Learning</p>
          <BranchHeading>
            Grow up your future by online learning with Topper Academy
          </BranchHeading>
          <div className="btnratings">
            <StyledButton>Explore Path</StyledButton>
            <div className="CountStudent">
              <MdCalendarMonth className="CountStudentIcon" />
              <div className="countDetail">
                <p className="Count">{stats?.totalStudents || 0}</p>
                <p className="StudentDetail">Assisted Student</p>
              </div>
            </div>
          </div>
        </div>
        {banners.length > 0 ? (
          <Carousel>
            {banners.map((banner, index) => (
              <div key={index}>
                <LandingBranchesImage
                  src={banner.banner_image}
                  alt={`Banner ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No banners available</p>
        )}
      </LandingBranchesWarp>
    </>
  );
};

export default LandingBranches;
