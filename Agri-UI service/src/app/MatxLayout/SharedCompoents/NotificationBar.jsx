import React ,{ useState }from "react";
import {
  Icon,
  Badge,
  Card,
  Button,
  IconButton,
  Drawer
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import { getTimeDifference } from "utils.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getNotification,
  deleteAllNotification,
  deleteNotification
} from "../../redux/actions/NotificationActions";
import {getNotificationCount} from "../../services/api-services"
import localStorageService from "../../services/localStorageService"
import SockJsClient from 'react-stomp';

const NotificationBar = props => {
  const {
    container,
    theme,
    settings,
    notification: notifcationList = [],
    getNotification,
    deleteAllNotification,
    deleteNotification,
    
  } = props;

  const [count, setCount] = useState(0);
  

  const [panelOpen, setPanelOpen] = React.useState(false);

  function handleDrawerToggle() {
    if (!panelOpen) {
      var user = localStorageService.getItem("auth_user")
      getNotification(user.userId);
    }
    setPanelOpen(!panelOpen);
  }
  const parentThemePalette = theme.palette;

  function getCount(){
    var user = localStorageService.getItem("auth_user")
    if(user && user.role!=="ROLE_superadmin"){
      getNotificationCount(user.userId).then(response=>{
        setCount(response.data);
     })
    }
    
  }

  function DeleteOne(id){
    deleteNotification(id);
    // var user = localStorageService.getItem("auth_user");
    //   getNotification(user.userId);
    // var user = localStorageService.getItem("auth_user")
    // getNotificationCount(user.userId).then(response=>{
    //    setCount(response.data);
    // })
  }

  return (
    <ThemeProvider theme={settings.themes[settings.activeTheme]}>

      <SockJsClient url='http://localhost:8083/api/notification/websocket/'
          topics={['/officer/user']}
          onConnect={() => {
            getCount();
            console.log("connected");
          }}
          onDisconnect={() => {
            console.log("Disconnected");
          }}
          onMessage={async (mgs) => {
            await getCount();
          }}
           />

      <IconButton
        onClick={handleDrawerToggle}
        style={{
          color:
            parentThemePalette.type === "light"
              ? parentThemePalette.text.secondary
              : parentThemePalette.text.primary
        }}
      >
        <Badge color="secondary" badgeContent={count}>
          <Icon>notifications</Icon>
        </Badge>
      </IconButton>

      <Drawer
        width={"100px"}
        container={container}
        variant="temporary"
        anchor={"right"}
        open={panelOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className="notification">
          <div className="notification__topbar flex items-center p-4 mb-4">
            <Icon color="primary">notifications</Icon>
            <h5 className="ml-2 my-0 font-medium">Notifications</h5>
          </div>

          {notifcationList.map(notification => (
            <div
              key={notification.id}
              className="notification__card position-relative"
            >
              <IconButton
                size="small"
                className="delete-button bg-light-gray mr-6"
                onClick={() => DeleteOne(notification.id)}
              >
                <Icon className="text-muted" fontSize="small">
                  clear
                </Icon>
              </IconButton>
              <Link to={`/${notification.path}`} onClick={handleDrawerToggle}>
                <Card className="mx-4 mb-6" elevation={3}>
                  <div className="card__topbar flex items-center justify-between p-2 bg-light-gray">
                    <div className="flex items-center">
                      <div className="card__topbar__button">
                        <Icon
                          className="card__topbar__icon"
                          fontSize="small"
                          color="primary"
                        >
                          chat
                        </Icon>
                      </div>
                      <span className="ml-4 font-medium text-muted">
                        Request
                      </span>
                    </div>
                    <small className="card__topbar__time text-muted">
                      {getTimeDifference(new Date(notification.createdAt))} ago
                    </small>
                  </div>
                  <div className="px-4 pt-2 pb-4">
                    <p className="m-0">{notification.message}</p>
                    <small className="text-muted">
                      From: {notification.actionBy}
                    </small>
                  </div>
                </Card>
              </Link>
            </div>
          ))}

          <div className="text-center">
            <Button onClick={deleteAllNotification}>Clear Notifications</Button>
          </div>
        </div>
      </Drawer>
    </ThemeProvider>
  );
};

NotificationBar.propTypes = {
  settings: PropTypes.object.isRequired,
  notification: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  deleteAllNotification: PropTypes.func.isRequired,
  notification: state.notification,
  settings: state.layout.settings
});

export default withStyles(
  {},
  { withTheme: true }
)(
  connect(mapStateToProps, {
    getNotification,
    deleteNotification,
    deleteAllNotification
  })(NotificationBar)
);
