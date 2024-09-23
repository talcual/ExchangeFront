

/**
 * 
 * Servicio en creado para consumir apis, de forma generica.
 * 
 */

const api = {
    request : {
        get : (uri:any, data:any) => {
            return fetch(uri,{
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer ' + localStorage.getItem('token_access')
                },
                body: JSON.stringify(data) 
            });
        },
         
        post : (uri:any, data:any) => {
            return fetch(uri, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer ' + localStorage.getItem('token_access')
                },
                body: JSON.stringify(data) 
            })
        }
    }
}

export default api;