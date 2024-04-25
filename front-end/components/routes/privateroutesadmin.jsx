
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutesAdmin = () => {
    let role = localStorage.getItem('role');
    return(
        role==="Admin" ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutesAdmin