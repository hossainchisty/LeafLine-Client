import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SkeletonTheme baseColor='#999' highlightColor='#444'>
    <BrowserRouter>
      <App />
      <Toaster position='top-right' reverseOrder={false} />
    </BrowserRouter>
  </SkeletonTheme>
);
