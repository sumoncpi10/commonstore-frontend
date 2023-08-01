// pages/protected-page.js

import withRole from '../pages';

const ProtectedPage = () => {
  return <div>This page is protected and can only be accessed by authorized users.</div>;
};

export default withRole(ProtectedPage, ['admin', 'moderator']);
