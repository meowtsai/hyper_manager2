// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserTasks } from '../redux/actions';
import ProfileDropdown from './ProfileDropdown';
import logoSm from '../assets/images/logo_sm.png';
import logo from '../assets/images/logo-light.png';

const ProfileMenus = [
  {
    label: '自訂快選回覆',
    icon: 'mdi mdi-flash-outline',
    redirectTo: '/platform/preset_messages'
  },
  {
    label: '後台操作紀錄',
    icon: 'mdi mdi-history',
    redirectTo: '/platform/action_history'
  },
  {
    label: '修改密碼',
    icon: 'mdi mdi-account-key-outline',
    redirectTo: '/platform/modify_password'
  },

  {
    label: '登出',
    icon: 'mdi mdi-logout',
    redirectTo: '/account/logout'
  }
];

const Topbar = props => {
  const [menu, setMenu] = useState(ProfileMenus);

  useEffect(() => {
    props.getUserTasks();
  }, []);

  useEffect(() => {
    if (props.userTasks && props.userTasks.favorCount) {
      setMenu([
        {
          label: `收藏 (${props.userTasks.favorCount})`,
          icon: 'mdi mdi-star-outline',
          redirectTo: '/service/questions/favorite'
        },
        ...ProfileMenus
      ]);
    }
  }, [props.userTasks]);

  /**
   * Toggles the right sidebar
   */
  const handleRightSideBar = () => {
    props.showRightSidebar();
  };

  //console.log("props", props);
  const hideLogo = props.hideLogo || false;
  const navCssClasses = props.navCssClasses || '';
  const containerCssClasses = !hideLogo ? 'container-fluid' : '';
  const user = props.user;
  const userTasks = props.userTasks;

  return (
    <React.Fragment>
      <div className={`navbar-custom ${navCssClasses}`}>
        <div className={containerCssClasses}>
          {!hideLogo && (
            <Link to='/' className='topnav-logo'>
              <span className='topnav-logo-lg'>
                <img src={logo} alt='logo' height='16' />
              </span>
              <span className='topnav-logo-sm'>
                <img src={logoSm} alt='logo' height='16' />
              </span>
            </Link>
          )}

          <ul className='list-unstyled topbar-right-menu float-right mb-0'>
            <li className='notification-list'>
              {user && (
                <ProfileDropdown
                  menuItems={menu}
                  username={user.account}
                  userTitle={user.role}
                />
              )}
            </li>
          </ul>

          <button
            className='button-menu-mobile open-left disable-btn'
            onClick={props.openLeftMenuCallBack}>
            <i className='mdi mdi-menu'></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.Auth.user,
  userTasks: state.AdminUsers.user_tasks
});

export default connect(mapStateToProps, { getUserTasks })(Topbar);
