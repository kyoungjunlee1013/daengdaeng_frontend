import Slider from "react-slick";
// 슬라이더의 기본 스타일과 테마 스타일을 불러옵니다. (이게 없으면 슬라이더가 깨져 보입니다)
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// ----------------------------------------------------------------------
// 1. 임시 데이터 (Mock Data)
// 설명: 아직 백엔드가 없으므로, 화면에 보여줄 가짜 데이터를 만들어둡니다.
// ----------------------------------------------------------------------
const dummyItems = [
  { 
    id: 1, 
    tag: "바다와 역사의 도시!", 
    title: "면천읍성부터 펫비치까지 당진 1박2일 여행코스", 
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069" 
  },
  { 
    id: 2, 
    tag: "감성충전 힐링스테이 🌿", 
    title: "여기가 제주도라고?! 이국적인 감성숙소 '스테이온'", 
    img: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=1936" 
  },
  { 
    id: 3, 
    tag: "가을 산책로 추천 🍂", 
    title: "가을을 만끽하며 솔밭을 걸어요. 충남 공주 '고마나루'", 
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1769" 
  },
  { 
    id: 4, 
    tag: "프라이빗 힐링 숙소 🏠", 
    title: "당진 면천읍성 근처 독채 숙소 '도리토리 애견펜션'", 
    img: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=1964" 
  },
  { 
    id: 5, 
    tag: "펫 프렌들리 명소 ✨", 
    title: "산책하기 정말 좋은 애견동반 문화유산! 당진 '면천읍성'", 
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1769" 
  },
];

// ----------------------------------------------------------------------
// 2. 커스텀 화살표 컴포넌트 (Custom Arrows)
// 이유: 라이브러리 기본 화살표는 못생겨서, MUI 아이콘을 써서 예쁘게 만듭니다.
// ----------------------------------------------------------------------

// 오른쪽 화살표 (Next)
function NextArrow(props: any) {
  const { onClick } = props; // Slider가 자동으로 넘겨주는 클릭 함수
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',    // 위치를 강제로 지정하기 위해 사용
        right: '-20px',          // 슬라이더 오른쪽 끝보다 20px 더 바깥으로 뺌
        top: '50%',              // 위에서 50% 위치
        transform: 'translateY(-50%)', // 정확한 수직 중앙 정렬
        zIndex: 10,              // 이미지보다 위에 떠 있어야 클릭 가능함
        bgcolor: 'white',        // 배경 흰색
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // 그림자 (입체감)
        width: '40px', height: '40px',
        '&:hover': { bgcolor: '#f5f5f5' } // 마우스 올렸을 때 색상
      }}
    >
      <ArrowForwardIosIcon fontSize="small" sx={{ color: '#333' }} />
    </IconButton>
  );
}

// 왼쪽 화살표 (Prev)
function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        left: '-20px',           // 왼쪽 바깥으로 뺌
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        bgcolor: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        width: '40px', height: '40px',
        '&:hover': { bgcolor: '#f5f5f5' }
      }}
    >
      <ArrowBackIosNewIcon fontSize="small" sx={{ color: '#333' }} />
    </IconButton>
  );
}

// ----------------------------------------------------------------------
// 3. 메인 컴포넌트
// ----------------------------------------------------------------------
export default function ReviewCarousel() {
  
  // 슬라이더 옵션 설정 (가장 중요!)
  const settings = {
    dots: false,               // 사진 밑에 점(Indicator) 안 보이게
    infinite: true,            // 끝까지 가면 다시 처음으로 무한 반복
    speed: 500,                // 넘어가는 속도 (0.5초)
    slidesToShow: 4,           // 한 화면에 카드 4장 보여주기
    slidesToScroll: 1,         // 버튼 누르면 1장씩 넘기기
    nextArrow: <NextArrow />,  // 우리가 만든 오른쪽 버튼 적용
    prevArrow: <PrevArrow />,  // 우리가 만든 왼쪽 버튼 적용
    
    // 반응형 설정: 화면 크기에 따라 보여줄 카드 개수 조절
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } }, // 태블릿에선 3개
      { breakpoint: 768, settings: { slidesToShow: 2 } },  // 작은 태블릿엔 2개
      { breakpoint: 480, settings: { slidesToShow: 1 } }   // 모바일에선 1개
    ]
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px 0' }}>
      {/* react-slick 라이브러리의 Slider 컴포넌트로 감싸줍니다 */}
      <Slider {...settings}>
        
        {/* 데이터를 돌면서 카드 하나씩 생성 */}
        {dummyItems.map((item) => (
          
          // [중요] 슬라이더 아이템 사이에 간격을 주기 위한 패딩 박스
          <Box key={item.id} sx={{ px: 1 }}> 
            
            {/* --- 카드 본체 (이미지와 텍스트를 감싸는 틀) --- */}
            <Box 
              sx={{ 
                position: 'relative', // 자식들(글씨, 그라데이션)의 위치 기준점 역할
                borderRadius: '2px', // 모서리 둥글게
                overflow: 'hidden',   // 이미지가 둥근 모서리 밖으로 튀어나가지 않게 자름
                height: '350px',      // 세로로 긴 직사각형 형태 고정
                cursor: 'pointer',    // 마우스 올리면 손가락 모양
              }}
            >
              {/* 1. 배경 이미지 */}
              <img 
                src={item.img} 
                alt={item.title} 
                // 이미지를 박스에 가득 채우되 비율은 유지 (찌그러짐 방지)
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />

              {/* 2. 그라데이션 오버레이 (Overlay) */}
              {/* 이유: 사진 위에 흰 글씨를 그냥 쓰면 잘 안 보입니다. 밑에 검은 그림자를 깔아주는 역할 */}
              <Box 
                sx={{
                  position: 'absolute', // 이미지 위에 겹치기
                  bottom: 0, left: 0, width: '100%', height: '60%', // 아래쪽 60%만 덮음
                  // 아래(검정)에서 위(투명)로 그라데이션
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  zIndex: 1 // 이미지(0)보다 위에 있어야 함
                }}
              />

              {/* 3. 텍스트 내용 */}
              <Box 
                sx={{
                  position: 'absolute', // 역시 이미지 위에 겹치기
                  bottom: 0, left: 0, width: '100%',
                  padding: '15px',
                  zIndex: 2, // 그라데이션(1)보다 더 위에 있어야 글씨가 선명함
                  textAlign: 'left',
                  boxSizing: 'border-box',//이미지 전체가 아닌 box사이즈를 보더로 정의
                }}
              >
                {/* 작은 태그 (노란색 강조) */}
                <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5, display: 'block' }}>
                  {item.tag}
                </Typography>
                
                {/* 메인 제목 (흰색) */}
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', lineHeight: 1.3, fontSize: '1.1rem' }}>
                  {item.title}
                </Typography>
              </Box>

            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}