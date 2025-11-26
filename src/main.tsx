// src/main.tsx (완전 복구)
// StrictMode와 렌더러 기능을 반드시 불러와야 합니다.
import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App.tsx'; // 이 파일을 불러옴

// document.getElementById('root')를 찾아서 App 컴포넌트를 렌더링
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);