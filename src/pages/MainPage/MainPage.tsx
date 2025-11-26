// src/pages/MainPage.tsx
import styles from './MainPage.module.css'; // ✨ 연결
import SearchBar from '../../components/SearchBar1';

export default function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <img className={styles.main_img} alt='산책로 풍경' /*src={}*/ />
        <div className={styles.overlayContent}>
          <p className={styles.main_text}>지겨운 산책코스<br/> 새로운 산책코스 추천 받으세요. </p>
        </div>
      </div>
        <div style={{ marginTop: '30px'}}>
          <SearchBar/>
        </div>

      <div>

      </div>

    </div>
  );
}