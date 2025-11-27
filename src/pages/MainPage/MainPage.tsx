// src/pages/MainPage.tsx
import styles from './MainPage.module.css'; // ✨ 연결
import SearchBar from '../../components/SearchBar1';
import img1 from '../../assets/main_img1.jpg'
export default function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <img className={styles.main_img} alt='산책로 풍경' src={img1} />
        <div className={styles.overlayContent}>
          <p className={styles.main_text}>당신의 반려동물에게<br/>새로운 경험을 선물하세요.</p>
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