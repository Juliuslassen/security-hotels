import { Outlet, redirect } from "react-router-dom";
import NavLinkLayout from "./NavLinkLayout";


export async function loader({isLoggedIn}) {
    if(!isLoggedIn){
        return redirect('/login');
    } else if(isLoggedIn){
        return;
    }
}

function MainLayout({isLoggedIn}) {

    
    return ( 
        <div>
            <NavLinkLayout isLoggedIn={isLoggedIn}/>
            
            <Outlet />
        </div>
     );
}

export default MainLayout;