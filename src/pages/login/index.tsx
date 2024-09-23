import { useState } from 'react'
import Nav from '../../components/nav'
import Footer from '../../components/footer';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom';


function IndexLogin() {
  
    /**
     * 
     * Se realiza el setting de los useStates y el navigator
     * 
     */

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    device_name:'X1554'
  })

  /**
   * Seeter del formulario de login
   * 
   */

  const loginChange =  {
     email : (event:any) => { setLoginData({...loginData, email: event.target.value}) },
     password : (event:any) => { setLoginData({...loginData, password: event.target.value}) }
  };


  /**
   * 
   * Accion para realizar el login de usuario
   * 
   */
  const LoginAction = async () => {
    let form = {
        email       : loginData.email,
        password    : loginData.password,
        device_name : 'X1250' 
    }

    let response:any = await api.request.post('http://localhost:8000/api/login', form);
        response = await response.json();
        
        localStorage.setItem('token_access', response.token);
        navigate('/');
  }

  return (
    <>
        
        <Nav />

        <header className="masthead text-center text-white">
            <div className="masthead-content">
                <div className="container px-5">


                <div className="container d-flex justify-content-center align-items-center">
                    <div className="col-md-4">
                    <h3 className="text-center mb-4">Iniciar Sesión</h3>
                    <div className="card">
                        <div className="card-body">
                        <form>
                            
                            <div className="mb-3">
                            <label className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={loginChange.email} placeholder="Ingresa tu correo" required />
                            </div>

                            <div className="mb-3">
                            <label  className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={loginChange.password} placeholder="Ingresa tu contraseña" required />
                            </div>


                            <button type="button" className="btn btn-primary w-100" onClick={LoginAction}>Iniciar Sesión</button>
                        </form>
                        </div>
                    </div>
                    
                    <div className="text-center mt-3">
                    </div>
                    </div>
                </div>



                </div>
            </div>

        </header>


        <Footer />


    </>
  )
}

export default IndexLogin