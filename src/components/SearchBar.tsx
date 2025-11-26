// src/components/SearchBar.tsx

import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// 아이콘
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// 날짜 관련 (Day.js)
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 설정

// 테마 및 스타일 관련
import { createTheme, ThemeProvider } from '@mui/material/styles';

// --------------------------------------------------------------------------
// 1. 스타일 정의 영역
// --------------------------------------------------------------------------

// 오렌지색 커스텀 테마 생성
const orangeTheme = createTheme({
  palette: {
    primary: {
      main: '#ff7e36', // 메인 오렌지색
    },
  },
  components: {
    // @ts-ignore: MUI X 컴포넌트 타입 이슈 해결 (가장 확실한 방법)
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#ff7e36 !important', // 선택된 날짜 배경색 강제 적용
            color: 'white',
          },
        },
      },
    },
  },
});

// 달력 주말 색상 스타일 (일요일 빨강, 토요일 파랑)
const calendarSx = {
  '.MuiDateCalendar-root': { width: '100%' },
  '.MuiDayCalendar-header': { justifyContent: 'space-between' },
  '.MuiDayCalendar-weekContainer > button:first-of-type': { color: '#ff3b30' }, // 일요일
  '.MuiDayCalendar-weekContainer > button:last-of-type': { color: '#007aff' }, // 토요일
  '.MuiPickersDay-today': { borderColor: '#ff7e36 !important' }, // 오늘 날짜 테두리
};

export default function SearchBar() {
  // --------------------------------------------------------------------------
  // 2. 상태 관리 (State) - "화면을 바꾸는 변수들"
  // const [현재값, 리모컨(Setter)] = useState(초기값);
  // --------------------------------------------------------------------------
  
  // 검색 데이터 상태
  const [keyword, setKeyword] = useState('');
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [personCount, setPersonCount] = useState(2);
  const [petCount, setPetCount] = useState(1);

  // 팝업 앵커 상태 (팝업창 위치 기준점)
  const [dateAnchor, setDateAnchor] = useState<HTMLButtonElement | null>(null);
  const [countAnchor, setCountAnchor] = useState<HTMLButtonElement | null>(null);

  // --------------------------------------------------------------------------
  // 3. 이벤트 핸들러 (Handlers) - "행동 대장 함수들"
  // on... (센서)가 감지하면 실행되는 실제 함수
  // --------------------------------------------------------------------------

  // 날짜 버튼 핸들러
  const handleDateClick = (event: React.MouseEvent<HTMLButtonElement>) => setDateAnchor(event.currentTarget);
  const handleDateClose = () => setDateAnchor(null);
  
  // 인원 버튼 핸들러
  const handleCountClick = (event: React.MouseEvent<HTMLButtonElement>) => setCountAnchor(event.currentTarget);
  const handleCountClose = () => setCountAnchor(null);

  // ⭐ 검색 실행 함수 (백엔드 전송용)
  const handleSearch = () => {
    const searchData = {
      keyword: keyword,
      checkIn: checkIn?.format('YYYY-MM-DD'), // 날짜 객체를 문자열로 변환
      checkOut: checkOut?.format('YYYY-MM-DD'),
      person: personCount,
      pet: petCount
    };
    
    console.log("🚀 백엔드로 전송할 데이터:", searchData);
    alert(`검색 데이터 확인 (콘솔 참고)\n날짜: ${searchData.checkIn} ~ ${searchData.checkOut}\n인원: ${personCount}명, 반려견 ${petCount}마리`);
  };

  return (
    <ThemeProvider theme={orangeTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <Paper
          component="form"
          sx={{ 
            p: '4px 8px', display: 'flex', alignItems: 'center', 
            width: '100%', maxWidth: 850, 
            borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
            margin: '0 auto' 
          }}
          // --------------------------------------------------------------------------
          // 4. 이벤트 리스너 (Listeners) - "감지 센서 (on...)"
          // --------------------------------------------------------------------------
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }} // 엔터키 입력 시 검색 실행
        >
          {/* 1. 검색어 입력 */}
          <IconButton sx={{ p: '10px' }} aria-label="search"><SearchIcon /></IconButton>
          <InputBase 
            sx={{ ml: 1, flex: 1 }} 
            placeholder="여행지나 숙소를 검색해보세요" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // 입력할 때마다 keyword 상태 업데이트
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          {/* 2. 날짜 선택 버튼 */}
          <Button
            startIcon={<CalendarMonthIcon />}
            onClick={handleDateClick} // 클릭 시 팝업 열기
            sx={{ color: '#555', borderRadius: '20px', padding: '10px 20px', minWidth: '180px' }}
          >
            {checkIn && checkOut 
              ? `${checkIn.format('MM.DD')} - ${checkOut.format('MM.DD')}` 
              : '날짜 선택'}
          </Button>

          {/* 날짜 선택 팝업 */}
          <Popover
            open={Boolean(dateAnchor)}
            anchorEl={dateAnchor}
            onClose={handleDateClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            PaperProps={{ sx: { borderRadius: '20px', padding: '10px' } }}
          >
            <Box sx={{ p: 2, display: 'flex', gap: 2, ...calendarSx }}>
              <DatePicker 
                label="체크인" 
                value={checkIn} 
                onChange={(newValue) => setCheckIn(newValue)} 
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker 
                label="체크아웃" 
                value={checkOut} 
                onChange={(newValue) => setCheckOut(newValue)} 
                slotProps={{ textField: { size: 'small' } }}
              />
            </Box>
          </Popover>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          {/* 3. 인원/반려동물 선택 버튼 */}
          <Button
            startIcon={<PetsIcon />}
            onClick={handleCountClick}
            sx={{ color: '#555', borderRadius: '20px', padding: '10px 20px', minWidth: '120px' }}
          >
            {personCount}인, {petCount}마리
          </Button>

          {/* 인원 선택 팝업 */}
          <Popover
            open={Boolean(countAnchor)}
            anchorEl={countAnchor}
            onClose={handleCountClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            PaperProps={{ sx: { borderRadius: '20px', padding: '20px', width: '280px' } }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* 사람 수 조절 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>인원</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton 
                      onClick={() => setPersonCount(Math.max(1, personCount - 1))}
                      sx={{ 
                          color: personCount > 1 ? '#ff7e36' : '#e0e0e0',
                          padding: '4px' 
                      }}
                  >
                      <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Typography sx={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{personCount}</Typography>
                  <IconButton 
                      onClick={() => setPersonCount(personCount + 1)}
                      sx={{ color: '#ff7e36', padding: '4px'}}
                  >
                      <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* 반려견 수 조절 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>반려동물</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton 
                      onClick={() => setPetCount(Math.max(0, petCount - 1))}
                      sx={{ 
                          color: petCount > 0 ? '#ff7e36' : '#e0e0e0',
                          padding: '4px'
                      }}
                  >
                      <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Typography sx={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{petCount}</Typography>
                  <IconButton 
                      onClick={() => setPetCount(petCount + 1)}
                      sx={{ color: '#ff7e36',padding: '4px' }}
                  >
                      <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Popover>

          {/* 4. 검색 버튼 */}
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              backgroundColor: '#ff7e36',
              borderRadius: '30px',
              padding: '10px 30px',
              fontWeight: 'bold',
              marginLeft: '10px',
              '&:hover': { backgroundColor: '#e5621f' },
            }}
          >
            검색
          </Button>
        </Paper>
      </LocalizationProvider>
    </ThemeProvider>
  );
}