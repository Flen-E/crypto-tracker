import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";


import App from './App';
import { ThemeProvider } from "styled-components";
import { theme } from './theme';

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(

  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>



    
);

