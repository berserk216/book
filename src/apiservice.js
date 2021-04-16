// import axios from 'axios';

// const api = axios.create({
//     baseurl: process.env.REACT_APP_BACKEND_API,
//     headers: {
//         "content-type": "application/json",
//     },

// });


// api.interceptors.request.use(
//     (request)=> {
//         console.log("starting request", request );
//         return request;
//     },
//     function (error){
//         console.log( "request error" , error);

//     }
// );


// api.interceptors.request.use( 
//     (response) => {
//         console.log("response", response);
//         return response;
//     },
//     function (error) {
//         error = error.response.data;
//         console.log("responce error",error);
//         return Promise.reject({message: error.split("\n")[0] });
//     }


// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject({ message: error.split("\n")[0] });
  }
);

export default api;