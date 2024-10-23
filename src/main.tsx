import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './root.css';
import Loading from './Routes/Loading/Loading';
import SetTimer from "./Routes/SetTimer/SetTimer";
import CountdownView from './Routes/CountdownView/CountdownView';
import AlarmView from './Routes/AlarmView/AlarmView';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Loading />,
  },
  {
    path: "/timer/set",
    element: <SetTimer />,
  },
  {
    path: "/timer/countdown",
    element: <CountdownView />,
  },  
  {
    path: "/timer/finished",
    element: <AlarmView />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <section className='main-wrapper'>
                <RouterProvider router={router} />
            </section>
    </StrictMode>,
)
