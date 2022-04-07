import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./contactDetail.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import GroupMembers from "./GroupMembers";
function ContactDetail({
  setContactDetailToggle,
  contactDetailTogget,
  currentlyChatingWith,
}) {
  const upload = () => {};

  return (
    <div className="ContactDetail">
      <div className="ContactDetailBody"></div>
      <div className="ContactDetailHeader">
        <span>
          <IconButton style={{ color: "white" }}>
            <ArrowBackIcon
              onClick={() => setContactDetailToggle(!contactDetailTogget)}
            />
          </IconButton>
        </span>
        <h3>Profile</h3>
      </div>
      <div className="userImg">
        <img
          src={
            currentlyChatingWith?.profilePic
              ? `http://localhost:8081/` + currentlyChatingWith.profilePic
              : ""
          }
          alt="img"
        />
        {currentlyChatingWith.type == "PRIVATE" ? null : (
          <>
            <label id="icon-button-file" className="edit">
              <PhotoCameraIcon />
              <input
                type="file"
                accept="image/*"
                id="icon-button-file"
                onChange={(e) => {
                  upload(e);
                }}
                style={{ display: "none" }}
              />
            </label>
          </>
        )}
      </div>
      <div className="info">
        <h4>{currentlyChatingWith.name}</h4>
        {currentlyChatingWith.type == "PRIVATE" ? (
          <p>{currentlyChatingWith.phoneNo}</p>
        ) : (
          <p>Group 4 Participants</p>
        )}
      </div>

      <div className="description">description</div>

      <div className="otherInfo">
        {currentlyChatingWith.type == "PRIVATE" ? (
          <div className="comman">comman </div>
        ) : (
          <GroupMembers currentlyChatingWith={currentlyChatingWith} />
        )}
      </div>
    </div>
  );
}

export default ContactDetail;
