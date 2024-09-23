import Nav from '../../components/nav'
import Footer from '../../components/footer';
import api from '../../services/api'
import { useEffect, useState } from 'react';


function HistorialIndex() {  

  /**
   * Setup de los states a utilizar
   */
  const [userAuthorized, setAuthorized] = useState(false);
  const [historial, setHistorial] = useState([]);
 

  /**
   * 
   * Usando useEffect para validar que el usuario esta autenticado
   * 
   */

  useEffect(() => {
      let auth = localStorage.getItem('token_access');
      
      if(auth != null){
          setAuthorized(true);
      }
      
  }, []);  



  /**
   * 
   * Con esta funcion llamamos el historial de conversiones.
   * 
   */

  const historyAction = async () => {
    let response:any = await api.request.post('http://localhost:8000/api/historial', {});
    response = await response.json();

    setHistorial(response.data)

  }

  useEffect(() => {
    historyAction();
  }, []);  





  return (
    <>

        <Nav />

        <header className="masthead text-center text-white">
            <div className="masthead-content">
                <div className="container px-5">
                    <h2 className="masthead-subheading mb-0">Historial</h2>
                </div>


                {userAuthorized && <div className='container px5 d-flex align-items-center flex-column mt-5  '>
                  
                
                  <div className="card col-8">
                    <div className="card-body">
                      <div className="row g-4">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Moneda Origen</th>
                                        <th>Qty Origen</th>
                                        <th>Moneda Destino</th>
                                        <th>Qty Destino</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        historial.map((row:any) => 
                                            <>
                                                <tr>    
                                                    <td>{row.o_currency}</td>
                                                    <td>{row.o_qty}</td>
                                                    <td>{row.d_currency}</td>
                                                    <td>{Number(row.d_qty).toFixed(2)}</td>
                                                    <td>{row.creado}</td>
                                                </tr>
                                            </>
                                        )

                                    }
                                </tbody>
                            </table>
 
                      </div>
                    </div>
                  </div>
                </div>}


            </div>
        </header>

        <Footer />
    </>
  )
}

export default HistorialIndex
