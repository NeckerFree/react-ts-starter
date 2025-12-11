import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';
import { store } from './app/redux/store';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
