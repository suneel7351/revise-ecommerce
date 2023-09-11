import { Navigate, Outlet } from 'react-router-dom';

function ProtectAdmin({ isAdmin, Children }) {
    if (!isAdmin) return <Navigate to="/admin-login/Jrkjlsx$04949xbuepx9nvxd904irjisjf" />;
    return Children ? Children : <Outlet />;
}

export default ProtectAdmin;