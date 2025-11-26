// src/pages/LoginPage.tsx

import { Container, Typography, Button, Box, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // 구글 아이콘은 있음
import { useNavigate } from 'react-router-dom';
// ------------------------------------------------------------------
// 1. 없는 아이콘(네이버, 카카오) 직접 만들기 (SVG 코드)
// ------------------------------------------------------------------

// 네이버 아이콘 (N 로고)
const NaverIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.85 9.95L7.15 2H2V18H7.15V10.05L12.85 18H18V2H12.85V9.95Z" fill="white"/>
  </svg>
);

// 카카오 아이콘 (말풍선 로고)
const KakaoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.58172 3 4 5.68629 4 9C4 10.8954 5.00914 12.5846 6.58172 13.6931L6.00914 15.8333C5.93333 16.1167 6.25 16.35 6.5 16.1833L9.30914 14.3167C10.15 14.75 11.0583 15 12 15C16.4183 15 20 12.3137 20 9C20 5.68629 16.4183 3 12 3Z" fill="#000000"/>
  </svg>
);

// ------------------------------------------------------------------
// 2. 메인 로그인 화면 컴포넌트
// ------------------------------------------------------------------

export default function LoginPage() {

  const navigate = useNavigate();
  const handleLogin = (provider: string) => {
    alert(`${provider} 로그인 버튼 클릭! (나중에 백엔드 연결)`);
    // 나중에 여기에 window.location.href = 'http://localhost:8080/oauth2/authorization/kakao' 등을 넣음
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 1. 헤더 텍스트 */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h5" sx={{fontWeight: 'bold'}}>
          <span style={{ color: '#ff7e36'}}>댕댕런</span>
          <span style={{color: 'black', fontSize:'21px'}}>에서</span>
        </Typography>
        <Typography variant="h6" color="black" sx={{ mt: 1, fontWeight: 'bold'}}>
          <span style={{fontSize:'20px'}}>여러분의 반려동물에게 새로운 코스를 선물하세요.</span>
        </Typography>
        <Typography variant="h5" sx={{}}>
          <span style={{ color: 'grey',fontSize: '13px' }}>Ai 산책코스 추천과 리뷰까지</span>
        </Typography>
      </Box>

      {/* 2. 버튼 스택 (Stack을 쓰면 버튼 사이 간격 자동 조절) */}
      <Stack spacing={2} sx={{ width: '100%' }}>
        
        {/* 네이버 버튼 (#03C75A) */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<NaverIcon />}
          onClick={() => handleLogin('Naver')}
          sx={{
            backgroundColor: '#03C75A',
            color: 'white',
            fontWeight: 'bold',
            height: '50px',
            fontSize: '1rem',
            '&:hover': { backgroundColor: '#02b351' }, // 마우스 올렸을 때 색
          }}
        >
          네이버로 시작하기
        </Button>

        {/* 카카오 버튼 (#FEE500) */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<KakaoIcon />}
          onClick={() => handleLogin('Kakao')}
          sx={{
            backgroundColor: '#FEE500',
            color: '#191919', // 카카오는 글씨가 검정색이어야 잘 보임
            fontWeight: 'bold',
            height: '50px',
            fontSize: '1rem',
            '&:hover': { backgroundColor: '#e6cf00' },
          }}
        >
          카카오로 시작하기
        </Button>

        {/* 구글 버튼 (흰색 + 테두리) */}
        <Button
          fullWidth
          variant="outlined" // 테두리 있는 스타일
          startIcon={<GoogleIcon />}
          onClick={() => handleLogin('Google')}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderColor: '#ddd',
            fontWeight: 'bold',
            height: '50px',
            fontSize: '1rem',
            '&:hover': { backgroundColor: '#f5f5f5', borderColor: '#ccc' },
          }}
        >
          Google로 시작하기
        </Button>

      </Stack>

      {/* 3. 하단 링크 */}
      <Box sx={{ mt: 5 }}>
        <Typography 
            variant="body2" 
            sx={{ 
                color: '#666', 
                textDecoration: 'underline', 
                cursor: 'pointer',
                '&:hover': { color: '#333' }
            }}
            onClick={() => navigate('/Signup') }
        >
          이메일로 회원가입
        </Typography>
      </Box>

    </Container>
  );
}