import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CustomizePopover({
  avatar,
  background,
  bio,
  socket,
  username,
  setProfileInfo
}) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Customize your profile!
        </DialogTitle>
        <DialogContent>
          <TextField
            id="customizeProfileImageURL"
            label="Profile image URL"
            placeholder="Placeholder"
            defaultValue={avatar}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="customizeBackgroundImageURL"
            label="Background image URL"
            placeholder="Placeholder"
            defaultValue={background}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="customizeBio"
            label="Bio"
            placeholder="Placeholder"
            defaultValue={bio}
            fullWidth
            margin="normal"
            multiline
            InputLabelProps={{
              shrink: true
            }}
            rows="10"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const customization = {
                username: username,
                avatar: document.getElementById("customizeProfileImageURL")
                  .value,
                background: document.getElementById(
                  "customizeBackgroundImageURL"
                ).value,
                bio: document.getElementById("customizeBio").value
              };

              socket.emit("userEditProfile", customization);
              setOpen(false);
              setProfileInfo(oldProfileInfo => {
                console.log("WHOSSSSSSSSSSSSS BUYT UI", oldProfileInfo);
                return {
                  ...oldProfileInfo,
                  avatar: document.getElementById("customizeProfileImageURL")
                    .value
                };
              });
              // console.log("happy birddddddddddddddd", profileInfo);
              // setProfileInfo()

              //   if (imgExists(customization.avatar)) {
              //     if (imgExists(customization.background)) {
              //       socket.emit("userEditProfile", customization);
              //       setOpen(false);
              //     } else {
              //       alert(
              //         "Background image URL is not valid! Resetting to the previous URL now"
              //       );
              //       document.getElementById(
              //         "customizeBackgroundImageURL"
              //       ).value = background;
              //     }
              //   } else {
              //     alert(
              //       "Profile image URL is not valid! Resetting to the previous URL now"
              //     );
              //     document.getElementById(
              //       "customizeProfileImageURL"
              //     ).value = avatar;
              //   }
            }}
            color="primary"
          >
            Customize
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// let imgExists = function(url) {
//   var image = new Image();
//   image.src = url;
//   if (image.width === 0) {
//     return false;
//   } else {
//     return true;
//   }
// };
