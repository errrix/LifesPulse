import React, {Fragment} from 'react';
import about from "../pages/about";
import blog from "../pages/blog";
import Usercard from "../pages/usercard/usercard";
import AdminRouting from "./admin-routing";
import Header from "../components/header";
import Registration from "../pages/registration/registration";
import donate from "../pages/donate";
import Faq from "../pages/faq/faq";
import Rules from "../pages/rules";
import RegistrationConfirm from "../pages/registration-confirm";
import pageNotFound from "../pages/404";
import ThxCreate from "../pages/thx-create";
import UserAccount from "../pages/user-account/user-account";
import SearchPage from "../pages/searchpage";
import Footer from "../components/footer";
import Homepage from "../pages/homepage/homepage";
import CreateFundraiser from "../pages/create-fundraiser/create-fundraiser";
import confidentiality from "../pages/confidentiality";
import successStories from "../pages/success-stories";
import AllFundraiser from "../pages/all-fundraiser";
import ActivateUser from "../pages/activate-user";
import LoginPopup from '../components/popup/loginPopup'

import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router";
import {addUserId, addUserRole} from "./../actions";
import {addUserInfo, changePopup} from "../actions";
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './../modules/scrollToTop';
import CSSTransitionGroup from "react-addons-css-transition-group"

import url from "../modules/url"
import ThxDonate from "../pages/thx-donate";
import ResendTokenPopup from "../components/popup/resendTokenPopup";

class MainRouting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            update_user: false,
            show_resend_popup: false,
            resend_email: ''
        };

        this.toggleStatusResendPopup = this.toggleStatusResendPopup.bind(this);
        this.closeResendPopup = this.closeResendPopup.bind(this);
    }

    IsUser() {
        return this.props.roles.indexOf('user') !== -1
    }

    toggleStatusResendPopup (popup_status, email) {
        this.setState({
            show_resend_popup: popup_status,
            resend_email: email
        })
    }

    closeResendPopup() {
        this.setState({
            show_resend_popup: false,

        })
    }

    componentDidMount() {
        fetch(`${url}/api/users/auth`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            credentials: "include"
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({update_user: true});
                if (data.success) {
                    // console.log(data);
                    this.props.addUserId(data.response.id);
                    this.props.addUserRole(data.response.roles);
                } else {
                    // console.log(data);
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {
        return (
            <BrowserRouter>
                <ScrollToTop>
                    <Switch>
                        <Route path="/admin" render={(props) => {return <AdminRouting{...props} update_user={this.state.update_user}/>}}/>
                        <Fragment>
                            <CSSTransitionGroup transitionName="logn-popup"
                                                transitionEnter={true}
                                                transitionEnterTimeout={300}
                                                transitionLeave={true}
                                                transitionLeaveTimeout={300}>
                                {this.props.show_popup ? (<LoginPopup toggleStatusResendPopup={this.toggleStatusResendPopup}/>) : (false)}
                                {this.state.show_resend_popup ? <ResendTokenPopup email={this.state.resend_email} closeResendPopup={this.closeResendPopup}/> : (false)}
                            </CSSTransitionGroup>
                            <Route path="/" component={Header}/>
                            <Switch>
                                <Route exact path="/" component={Homepage}/>
                                <Route exact path="/thanks-donate" component={ThxDonate}/>
                                <Route exact path="/faq" component={Faq}/>
                                <Route exact path="/blog" component={blog}/>
                                <Route exact path="/search" component={SearchPage}/>
                                <Route exact path="/success-stories" component={successStories}/>
                                <Route exact path="/allcampaing" component={AllFundraiser}/>
                                <Route exact path="/registration" render={(props) => {
                                    return !this.IsUser() ? <Registration {...props}/> : <Redirect to="/"/>
                                }}/>
                                <Route exact path="/confidentiality" component={confidentiality}/>
                                <Route exact path="/rules" component={Rules}/>
                                <Route exact path="/about" component={about}/>
                                <Route exact path="/activate/:token" component={ActivateUser}/>
                                <Route exact path="/donate" component={donate}/>
                                <Route exact path="/account" component={() => {
                                    return this.IsUser() ? <UserAccount/> : <Redirect to="/"/>
                                }}/>
                                <Route exact path="/usercard/:value" component={Usercard}/>
                                <Route exact path="/create-fundraiser" render={(props) => {
                                    return this.IsUser() ? <CreateFundraiser {...props}/> : <Redirect to="/"/>
                                }}/>

                                <Route exact path="/edit-fundraiser" render={(props) => {
                                    return this.IsUser() ? <CreateFundraiser {...props}/> : <Redirect to="/"/>
                                }}/>
                                <Route exact path="/registration-confirm" component={RegistrationConfirm}/>
                                <Route exact path="/thanks-create" render={(props) => {
                                    return this.IsUser() ? <ThxCreate {...props}/> : <Redirect to="/"/>
                                }}/>
                                <Route component={pageNotFound}/>
                            </Switch>
                            <Route path="/" component={Footer}/>
                        </Fragment>
                    </Switch>
                </ScrollToTop>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store,
        user_id: store.user_id,
        roles: store.user_roles,
        show_popup: store.show_popup
    }
};

const mapDispatchToProps = dispatch => ({
    addUserId: string => dispatch(addUserId(string)),
    addUserRole: array => dispatch(addUserRole(array)),
    addUserInfo: object => dispatch(addUserInfo(object)),
    changePopup: boolean => dispatch(changePopup(boolean))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRouting);

