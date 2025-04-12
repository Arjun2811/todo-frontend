
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todo-backend-c53w.onrender.com/api' 
});


export default api;


















// src/api.js
// import axios from 'axios';

// // const api = axios.create({
// //   baseURL: 'http://localhost:5000',
// const api = axios.create({
//   baseURL: 'http://localhost:5050/'
//   // withCredentials: true // ❌ Not needed — you're using localStorage
// });

// // Add Authorization header if token exists
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // ✅ This is the correct format
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

























// // src/api.js

// import axios from 'axios';

// // Create an Axios instance
// const api = axios.create({
//   baseURL: 'http://localhost:5000',
// });

// // Add token to every request if it exists
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = token; // or `Bearer ${token}` if backend expects it
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
