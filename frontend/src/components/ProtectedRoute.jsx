import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({children, adminOnly= false}){
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <p>Loading...</p>
    }

    if (!user){
        return <Navigate to="/"/>;
    }

    if (adminOnly && !user.is_admin){
        return <Navigate to="/profile"/>
    }

    console.log(user);

    return children;
}

export default ProtectedRoute;