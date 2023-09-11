import { Navigate, Outlet } from 'react-router-dom';

function ProtectUser({ isUser, Children }) {
    if (!isUser) return <Navigate to="/login" />;
    return Children ? Children : <Outlet />;
}

export default ProtectUser;