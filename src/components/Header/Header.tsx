// src/components/Header.tsx
import style from './Header.module.css';  
import { useNavigate } from 'react-router-dom'; // 네비게이션 훅

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <div className={style.logo} onClick={() => navigate('/')}>
        댕댕런
      </div>
      <nav className={style.nav}>
        <button className={style.loginButton} onClick={() => navigate('/login')}>로그인/회원가입</button>
      </nav>
    </header>
  );
}

