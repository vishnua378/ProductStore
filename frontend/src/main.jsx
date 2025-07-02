import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import { ChakraProvider } from '@chakra-ui/react'
// import { StrictMode } from 'react'
// import {BrowserRouter} from 'react-router-dom'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )
