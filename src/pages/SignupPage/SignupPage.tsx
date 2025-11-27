
import { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // 테마 임시 적용

// 미니멀리즘 스타일을 위한 커스텀 테마 (입력 필드 밑줄 스타일)
const minimalistTheme = createTheme({
    typography: {
        fontFamily: '"Gowun Batang", serif',
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'standard', // 밑줄만 있는 'standard' 스타일로 고정
            },
            styleOverrides: {
                // 활성화/포커스 시 밑줄 색상 변경 방지 (옵션)
                root: {
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#ff7e36', // 포커스 시 색상
                    },
                },
            },
        },
    },
});


export default function SignupPage() {

  const navigate = useNavigate();
  // 1. 상태 관리: 모든 입력 필드는 상태(State)로 관리됩니다.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  
  // ⭐ [핵심 로직] 폼 활성화 조건 검사
  const isFormValid = email !== '' && 
                    password !== '' && 
                    confirmPassword !== '' && 
                    password === confirmPassword && // 비밀번호 일치 확인
                    nickname !== '';


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 기본 동작(새로고침) 막기
    
    // 유효성 검사 (프론트엔드 2차 검증)
    if (!isFormValid) {
        // 이미 버튼이 disabled 상태이므로 이 알림창은 뜰 일이 없지만, 대비합니다.
        alert('모든 필수 항목을 올바르게 입력해주세요.');
        return;
    }

    // 🚨 나중에 여기에 백엔드 API 호출 로직(axios.post('/api/signup'))이 들어갑니다.
    console.log('회원가입 시도:', { email, password, nickname });
    alert(`[임시] 가입 완료! ${nickname}님, 환영합니다.`);
    navigate('/login');
  };
  

  return (
    // 테마 적용 (밑줄만 있는 인풋 스타일)
    <ThemeProvider theme={minimalistTheme}>
        <Container maxWidth="sm" sx={{ mt: 8, mb: 4, width: '100%', maxWidth: '500px' }}>
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* 제목 */}
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 5, fontSize: '1.8rem', color: 'black' }}>
                    필수정보 입력
                </Typography>

                {/* 입력 폼 */}
                <Box component="form" onSubmit={handleSignup} noValidate sx={{ width: '100%' }}>
                    
                    {/* 1. 이메일 */}
                    <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold', color: 'black'}}>이메일</Typography>
                    <TextField
                        required
                        fullWidth
                        placeholder="example@san-kki.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // 밑줄 스타일 활성화 및 비활성화 기능은 defaultProps에서 처리
                    />
                    
                    {/* 2. 비밀번호 */}
                    <Typography variant="subtitle1" sx={{ mt: 4, fontWeight: 'bold', color: 'black'}}>비밀번호</Typography>
                    <TextField
                        required
                        fullWidth
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        영문/숫자/특수문자 조합 8자 이상
                    </Typography>

                    {/* 3. 비밀번호 확인 */}
                    <Typography variant="subtitle1" sx={{ mt: 4, fontWeight: 'bold', color: 'black' }}>비밀번호 확인</Typography>
                    <TextField
                        required
                        fullWidth
                        placeholder="위 비밀번호와 동일하게 입력해주세요"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        // 비밀번호 불일치 시 에러 메시지 표시
                        error={password !== confirmPassword && confirmPassword !== ''}
                        helperText={password !== confirmPassword && confirmPassword !== '' ? "비밀번호가 일치하지 않습니다." : ""}
                    />

                    {/* 4. 닉네임 */}
                    <Typography variant="subtitle1" sx={{ mt: 4, fontWeight: 'bold', color: 'black' }}>닉네임</Typography>
                    <TextField
                        required
                        fullWidth
                        placeholder="사용하실 닉네임을 입력해주세요"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        한글/영문/숫자, 10자까지
                    </Typography>


                    {/* 가입하기 버튼 (베이지 톤) */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained" 
                        // ⭐ isFormValid 변수를 disabled 속성에 연결
                        disabled={!isFormValid}
                        sx={{
                            mt: 5,
                            height: '50px',
                            // 비활성화(기본) 스타일
                            backgroundColor: '#f4f4f4', 
                            color: '#aaaaaa', 
                            boxShadow: 'none',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            
                            // ⭐ 활성화 시 스타일 (모든 조건 충족 시)
                           '&:not(.Mui-disabled)': { 
                            backgroundColor: '#ff7e36', 
                            color: 'white',
                            boxShadow: '0 3px 5px rgba(255, 126, 54, 0.3)', 
                            },
                          }}
                    >
                        가입하기
                    </Button>

                </Box>
            </Box>
        </Container>
    </ThemeProvider>
  );
}