import React from 'react';
import PropTypes from 'prop-types';
import UnauthenticatedRoutes from './UnAuthenticRoutes';
import AdminRoutes from './AdminRoutes';

export default function Routes({ user }) {
  return (
    <>
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
