

import { useEffect, useState } from 'react';


function Nav() {
    
    const [userAuthorized, setAuthorized] = useState(false);
    const [isLogged, setLogged] = useState(false);

    useEffect(() => {
        let auth = localStorage.getItem('token_access');
        
        if(auth != null){
            setAuthorized(true);
            setLogged(true)
        }
        
    }, []);  

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div className="container px-5">
                    <a className="navbar-brand" href="/">Exchanger</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            {userAuthorized && <li className="nav-item"><a className="nav-link" href="/historial">Historial</a></li>}
                            {!isLogged && <li className="nav-item"><a className="nav-link" href="/login">Log In</a></li>}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Nav

