import { Navigate, Outlet } from 'react-router-dom';

function ProtectSeller({ isSeller, Children }) {
    if (!isSeller) return <Navigate to="/seller/login" />;
    return Children ? Children : <Outlet />;
}

export default ProtectSeller;