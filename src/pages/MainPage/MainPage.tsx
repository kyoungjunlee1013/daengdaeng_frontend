// src/pages/MainPage.tsx
import styles from './MainPage.module.css'; // ✨ 연결
import SearchBar from '../../components/SearchBar1';
import ReviewPage from '../ReviewPage/ReviewPage';
import img1 from '../../assets/main_img1.jpg'
import { useNavigate } from 'react-router-dom';
import ReviewCarousel from '../../components/ReviewCarousel';

export default function MainPage() {
  const navigate = useNavigate();
  
  return (

    <div className={styles.container}>
      <div className={styles.heroSection}>
        <img className={styles.main_img} alt='산책로 풍경' src={img1} />
        <div className={styles.overlayContent}>
          <p className={styles.main_text}>당신의 반려동물에게<br/>새로운 순간을 선물하세요.</p>
        </div>
      </div>
        <div style={{ marginTop: '30px'}}>
          <SearchBar/>
        </div>
        <div className={styles.reviewSection}>
          <nav className={styles.review_text}  onClick={() => navigate('/ReviewPage')}>리뷰 전체보기</nav>
          <ReviewCarousel/>
        </div>
      <div>

      </div>

    </div>
  );
}