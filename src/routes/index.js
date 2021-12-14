import React from 'react';
import PropTypes from 'prop-types';
import UnauthenticatedRoutes from './UnAuthenticRoutes';
import AdminRoutes from './AdminRoutes';

export default function Routes({ user }) {
  console.warn(user);
  return (
    <>
      {user ? <h5>Role ROUTER INDEX- {user.role}</h5> : 'No Role'}
      {user?.role === 'Admin' || user?.role === 'Staff' ? (
        <h5>Role ROUTER INDEX- ADMIN TEST PASS</h5>
      ) : (
        <h5>Role ROUTER INDEX- NO ADMIN</h5>
      )}
      {user?.role === 'Admin' || user?.role === 'Staff' ? (
        <AdminRoutes user={user} />
      ) : (
        ''
      )}
      <UnauthenticatedRoutes user={user} />
    </>
  );
}

Routes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Routes.defaultProps = {
  user: null,
};
