
import { createRoot } from 'react-dom/client';
import AppRouter from './routers/router';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <AppRouter />
);