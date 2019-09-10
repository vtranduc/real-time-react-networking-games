import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog() {
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
        Open form dialog
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
            // style={{ margin: 8 }}
            placeholder="Placeholder"
            // helperText="Full width!"
            defaultValue="hello"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="customizeBackgroundImageURL"
            label="Background image URL"
            // style={{ margin: 8 }}
            placeholder="Placeholder"
            // helperText="Full width!"
            defaultValue="hello"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="customizeBio"
            label="Bio"
            // style={{ margin: 8 }}
            placeholder="Placeholder"
            // helperText="Full width!"
            defaultValue="hello"
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
              console.log("another chat box project");
              console.log(
                document.getElementById("customizeProfileImageURL").value
              );
              document.getElementById("customizeProfileImageURL").value = "";
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

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Popper from "@material-ui/core/Popper";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Fade from "@material-ui/core/Fade";
// import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles(theme => ({
//   typography: {
//     padding: theme.spacing(2)
//   }
// }));

// export default function SimplePopper() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   function handleClick(event) {
//     setAnchorEl(anchorEl ? null : event.currentTarget);
//   }

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popper" : undefined;

//   return (
//     <div>
//       <Button
//         aria-describedby={id}
//         variant="contained"
//         color="primary"
//         onClick={handleClick}
//         // style={{ color: "red" }}
//       >
//         Toggle Popper
//       </Button>
//       <Popper id={id} open={open} anchorEl={anchorEl} transition>
//         {({ TransitionProps }) => (
//           <Fade {...TransitionProps} timeout={350}>
//             <Paper>
//               <Typography className={classes.typography}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-evenly",
//                     width: "100%"
//                   }}
//                 >
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => {
//                       console.log("clicked");
//                     }}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => {
//                       console.log("clicked");
//                     }}
//                   >
//                     Decline
//                   </Button>
//                 </div>
//               </Typography>
//             </Paper>
//           </Fade>
//         )}
//       </Popper>
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import "../../styles/chatBubble.css";

// // import Cookies from "universal-cookie";

// // const cookies = new Cookies();

// // cookies.set("myCat", "HEllo world", {
// //   path: "/"
// // });
// // console.log("LooKKK JERE", cookies.get("myCat")); // Pacman

// export default function World({ match, testStr }) {
//   useEffect(() => {
//     console.log("show meeeeeeee", testStr, match);
//   }, []);
//   return (
//     <div
//       style={{
//         position: "absolute",
//         right: 0,
//         width: "30%",
//         height: "100%",
//         border: "solid"
//       }}
//     >
//       <h1>Test123 HERE</h1>
//     </div>
//   );
// }
