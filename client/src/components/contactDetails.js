import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./contactDetail.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import GroupMembers from "./GroupMembers";
import contact from "../img/contact.jpg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommanMember from "./commanMember";
import axios from "axios";
function ContactDetail({
  setContactDetailToggle,
  contactDetailToggle,
  currentlyChatingWith,
  setaddParticapentsToggle,
  setcurrentMember,
  contactList,
  setCurrentlyChatingWith,
  setReloadContactlist,
  setCrossOpen,
}) {
  const TOKEN = localStorage.getItem("Token");
  const URL = process.env.REACT_APP_API_URL;

  const upload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("ID", currentlyChatingWith._id);

    try {
      const response = await axios({
        method: "post",
        url: URL + "/updateimage",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: formData,
      });
      const data = await response.data;
      setReloadContactlist(true);
      setCurrentlyChatingWith(data);
    } catch (error) {
      console.log("err", error);
    }
  };

  const handelLeaveGroup = () => {
    setCrossOpen(true);
  };

  return (
    <div className="ContactDetail">
      {/* head */}
      <div className="ContactDetailHeader">
        <span>
          <IconButton style={{ color: "white" }}>
            <ArrowBackIcon
              onClick={() => setContactDetailToggle(!contactDetailToggle)}
            />
          </IconButton>
        </span>
        <h3>{currentlyChatingWith.name}</h3>
      </div>
      {/* head end */}
      <div className="ContactDetailBody">
        <div className="userImg">
          <img
            src={
              currentlyChatingWith?.profilePic
                ? URL + `/` + currentlyChatingWith.profilePic
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
              // for private chat
              <CommanMember
                contactList={contactList}
                contactID={currentlyChatingWith.contactID}
              />
            ) : (
              // for group chat
              <GroupMembers
                currentlyChatingWith={currentlyChatingWith}
                setaddParticapentsToggle={setaddParticapentsToggle}
                setcurrentMember={setcurrentMember}
              />
            )}
          </>
        </div>
      </div>

      {/* leave group */}
      {currentlyChatingWith.type == "GROUP" ? (
        <div className="leaveGroup" style={{ position: "sticky", bottom: "0" }}>
          <ListItem
            onClick={() => handelLeaveGroup()}
            button
            sx={{ color: "red" }}
          >
            <ExitToAppIcon />
            <ListItemText style={{ margin: "10px" }} primary="leave Group" />
          </ListItem>
        </div>
      ) : null}
      {/* leave group  exit*/}
    </div>
  );
}

export default ContactDetail;
