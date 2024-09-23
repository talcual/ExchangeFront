import './App.css'
import Nav from './components/nav'
import Footer from './components/footer';
import api from './services/api'
import { useEffect, useState } from 'react';


function App() {  

  /**
   * Setup de los states a utilizar
   */
  const [userAuthorized, setAuthorized] = useState(false);
  const [rates, setRates] = useState([]);
  const [conversion, setConversion] = useState({
    origen : '',
    destino: '',
    qty:''
  });

  const [conversionResult, setConversionResult] = useState({
    response: '',
    data: {
      final_amount: 0
    }
  });

  /**
   *  
   * Mecanismo para poder tener en un solo objeto todo los setters del form
   * 
   */
  const conversionChange =  {
    qty : (event:any) => { setConversion({...conversion, qty: event.target.value}) },
    origen : (event:any) => { setConversion({...conversion, origen: event.target.value}) },
    destino : (event:any) => { setConversion({...conversion, destino: event.target.value}) }
  };


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
   * Function para iniciar el proceso de conversion
   * 
   */

  const conversionAction = async () => {
      let conversionParams:any = {
        qty: conversion.qty,
        origen: conversion.origen,
        destino: conversion.destino,
      }

      let response:any = await api.request.post('http://localhost:8000/api/conversion', conversionParams);
      response = await response.json();

      setConversionResult(response);
  }


  /**
   * 
   * Con esta funcion llamamos las diferentes monedas disponibles.
   * 
   */

  const ratesAction = async () => {
    let response:any = await api.request.post('http://localhost:8000/api/rates', {});
    response = await response.json();

    setRates(response.data)

  }

  useEffect(() => {
    ratesAction();
  }, []);  





  return (
    <>

        <Nav />

        <header className="masthead text-center text-white">
            <div className="masthead-content">
                <div className="container px-5">
                    <h1 className="masthead-heading mb-0">Exchanger Basic</h1>
                    <h2 className="masthead-subheading mb-0">Change Money</h2>
                </div>


                {userAuthorized && <div className='container px5 d-flex align-items-center flex-column mt-5  '>
                  
                  {conversionResult.data?.final_amount != 0 && <div className="card col-6 my-2">
                    <div className="card-body">
                        <h4 className='text-dark'>
                           {conversion.qty} {conversion.origen} = {Number(conversionResult.data?.final_amount).toFixed(2)} {conversion.destino}
                        </h4>
                        
                    </div>
                  </div>}
                  
                  <div className="card col-6">
                    <div className="card-body">
                      <div className="row g-4">
                        <div className="col-sm-12">
                          <input type="text" className="form-control" placeholder="Cantidad" onChange={conversionChange.qty}/>
                        </div>
                        <div className="col-sm-5">
                          <select className='form-control' onChange={conversionChange.origen}>
                            <option key="0">Seleccionar Moneda</option>
                            {
                              rates.map((rate:any) => 
                                  <>
                                    <option key={rate.id} value={rate.currency}>{rate.currency}</option>    
                                  </>
                              )
                            }
                          </select>
                        </div>
                        <div className='col d-flex flex-column justify-content-center align-items-center'>
                          <i className="fa-solid fa-arrow-right text-dark fa-xl"></i>
                        </div>
                        <div className="col-sm-5">
                          <select className='form-control' onChange={conversionChange.destino}>
                            <option key="0">Seleccionar Moneda</option>
                            {
                              rates.map((rate:any) => 
                                  <>
                                    <option key={rate.id} value={rate.currency}>{rate.currency}</option>    
                                  </>
                              )
                            }
                          </select>
                        </div>
                      </div>  
                      <div className="row g-4 d-flex align-items-center flex-column pt-3">
                          <button className='btn btn-dark col-4' onClick={conversionAction}>
                              Iniciar Conversión
                          </button>
                      </div>
                    </div>
                  </div>
                </div>}




            </div>
            <div className="bg-circle-1 bg-circle"></div>
            <div className="bg-circle-2 bg-circle"></div>
            <div className="bg-circle-3 bg-circle"></div>
            <div className="bg-circle-4 bg-circle"></div>
        </header>


        <Footer />

    </>
  )
}

export default App
