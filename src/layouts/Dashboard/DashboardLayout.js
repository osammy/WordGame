import React, { Component } from "react";
import dashboardRoutes from "../../Routes/dashboard.js";
import { sideBarMenuItemsList } from "../";
import Sidebar from "react-sidebar";
import { OverheadLoader, CloseButton, InlineLoader } from "../../Components";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const sidebarStyle = {
  background: "linear-gradient(to right, rgba(5,29,57,1), rgba(30,52,77,1))",
  width: "190px",
  top: "0px",
  paddingLeft: "0px",
  color: "white",
  position: "absolute",
  overflow: "hidden"
};
const contentStyle = { background: "#fff", marginTop: "2px" };

const mql = window.matchMedia(`(min-width: 900px)`);
class DashboardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      mql
    };
  }
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  handleError = err => {
    try {
      var response = err.response;
      var status = response.status;
    } catch (e) {
      this.createNotification(
        "error",
        "Please Check your Internet Connection",
        "Error"
      )();
      return;
    }
    switch (status) {
      case 401:
        message =
          response.data.message ||
          "You are not logged in or your authentication token has expired, login again to continue.";
        this.createNotification("error", message, "Unauthenticated")();
        break;

      case 403:
        message =
          response.data.message ||
          "You are not authorized to perform this action";

        this.createNotification("error", message, "Unauthorized")();
        break;

      case 404:
        message =
          response.data.message || "We cannot find the requested resource";
        this.createNotification("error", message, "Not Found")();
        break;

      case 500:
        message = response.data.message || "An error occured";
        this.createNotification(
          "error",
          message,
          "Please check your network connection"
        )();
        break;

      default:
        this.createNotification(
          "error",
          "An error occured",
          "Unauthenticated"
        )();
    }
  };

  createNotification = (type, msg, title, duration, fn) => {
    return () => {
      switch (type) {
        case "info":
          if (!msg)
            return new Error(
              "Please pass a message content to the ifo notification"
            );
          NotificationManager.info(msg);
          break;
        case "success":
          if (!msg) msg = "Your operation was Successful";
          if (!title) title = "Success";
          NotificationManager.success(msg, title);
          break;
        case "warning":
          if (!msg) msg = "Warning message";
          if (!title) title = "Warning";
          if (!duration) duration = 3000;
          NotificationManager.warning(msg, title, duration);
          break;
        case "error":
          if (!msg) msg = "An error occurred";
          if (!title) title = "Error";
          if (!duration) duration = 5000;
          if (!fn)
            fn = () => {
              console.log("Just showed a notification error");
            };
          NotificationManager.error(msg, title, duration, fn);
          break;
      }
    };
  };

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  handleSidebar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  };

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  handleOpen = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div>
        {this.state.showLoader && <OverheadLoader blurBackground />}
        <Sidebar
          sidebar={
            <SidebarMenu
              items={sideBarMenuItemsList}
              open={this.state.open}
              handleOpen={this.handleOpen}
            />
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: sidebarStyle, content: contentStyle }}
        >
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              return (
                <Route
                  key={key}
                  exact={prop.exact}
                  path={prop.path}
                  component={prop.component}
                />
              );
            })}
          </Switch>
        </Sidebar>
      </div>
    );
  }
}

export default DashboardLayout;
