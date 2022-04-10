import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./contactDetail.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import GroupMembers from "./GroupMembers";
import contact from "../img/contact.jpg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
function ContactDetail({
  setContactDetailToggle,
  contactDetailToggle,
  currentlyChatingWith,
  setaddParticapentsToggle,
  setcurrentMember,
}) {
  const upload = () => {};
  return (
    <div className="ContactDetail">
      <div className="ContactDetailHeader">
        <span>
          <IconButton style={{ color: "white" }}>
            <ArrowBackIcon
              onClick={() => setContactDetailToggle(!contactDetailToggle)}
            />
          </IconButton>
        </span>
        <h3>Profile</h3>
      </div>
      <div className="ContactDetailBody">
        <div className="userImg">
          <img
            src={
              currentlyChatingWith?.profilePic
                ? `http://localhost:8081/` + currentlyChatingWith.profilePic
                : contact
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
        <div className="info" style={{ marginBottom: "20px" }}>
          <>
            <h4>{currentlyChatingWith.name}</h4>
            {currentlyChatingWith.type == "PRIVATE" ? (
              <p>{currentlyChatingWith.phoneNo}</p>
            ) : (
              <p>
                Group
                {" " + currentlyChatingWith.userIDs.length + " "}
                Participants
              </p>
            )}
          </>
        </div>

        {/* <div className="description">description</div> */}

        <div className="otherInfo">
          <>
            {currentlyChatingWith.type == "PRIVATE" ? (
              <div className="comman">comman </div>
            ) : (
              <GroupMembers
                currentlyChatingWith={currentlyChatingWith}
                setaddParticapentsToggle={setaddParticapentsToggle}
                setcurrentMember={setcurrentMember}
              />
            )}
          </>
        </div>
      </div>
      {currentlyChatingWith.type == "GROUP" ? (
        <div className="leaveGroup" style={{ position: "sticky", bottom: "0" }}>
          <ListItem button sx={{ color: "red" }}>
            <ExitToAppIcon />
            <ListItemText style={{ margin: "10px" }} primary="leave Group" />
          </ListItem>
        </div>
      ) : null}
    </div>
  );
}

export default ContactDetail;
