import React, { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {authRoles} from "../../auth/authRoles";
import { navigationsAI ,navigationsFarmer,navigationsSuper} from "../../navigations";
import { MatxVerticalNav } from "matx";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import localStorageService from  "../../services/localStorageService"

const Sidenav = props => {
  const updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = props;
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  const renderOverlay = () => (
    <div
      onClick={() => updateSidebarMode({ mode: "close" })}
      className="sidenav__overlay"
    />
  );
  const user = localStorageService.getItem("auth_user")
  return (
    <Fragment>
      <Scrollbar
        options={{ suppressScrollX: true }}
        className="scrollable position-relative"
      >
        {props.children}
       {user && user.role=="ROLE_admin" ? <MatxVerticalNav navigation={navigationsAI} /> : user.role=="ROLE_superadmin" ? <MatxVerticalNav navigation={navigationsSuper} /> :<MatxVerticalNav navigation={navigationsFarmer} />} 
      </Scrollbar>
      {renderOverlay()}
    </Fragment>
  );
};

Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withRouter(
  connect(mapStateToProps, {
    setLayoutSettings
  })(Sidenav)
);
