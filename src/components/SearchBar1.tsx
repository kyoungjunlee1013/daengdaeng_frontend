// src/components/SearchBar.tsx

import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// 아이콘 (산책에 어울리는 아이콘으로 변경)
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // 소요 시간 (시계)
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // 화살표

// 테마 관련
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 1. 오렌지색 커스텀 테마
const orangeTheme = createTheme({
  palette: {
    primary: {
      main: '#ff7e36', 
    },
  },
});

export default function SearchBar() {
  // -----------------------------------------------------------
  // 1. 상태 관리 (검색어, 시간)
  // -----------------------------------------------------------
  const [keyword, setKeyword] = useState('');
  const [duration, setDuration] = useState<string | null>(null); // 선택된 시간

  // 드롭다운 메뉴 위치 기준점 (Anchor)
  const [timeAnchor, setTimeAnchor] = useState<null | HTMLElement>(null);

  // -----------------------------------------------------------
  // 2. 핸들러 함수들 (메뉴 열기/닫기/선택)
  // -----------------------------------------------------------
  
  // 시간 메뉴
  const openTimeMenu = (event: React.MouseEvent<HTMLElement>) => setTimeAnchor(event.currentTarget);
  const closeTimeMenu = () => setTimeAnchor(null);
  const handleTimeSelect = (value: string) => {
    setDuration(value);
    closeTimeMenu();
  };

  // 검색 실행
  const handleSearch = () => {
    const searchData = {
      keyword: keyword,   // 예: "한강 공원"
      duration: duration, // 예: "30분 ~ 1시간"
    };
    
    console.log("🚀 산책 코스 검색:", searchData);
    alert(`[검색 실행]\n장소: ${keyword || '전체'}\n시간: ${duration || '상관없음'}}`);
  };

  return (
    <ThemeProvider theme={orangeTheme}>
      <Paper
        component="form"
        sx={{ 
          p: '4px 8px', display: 'flex', alignItems: 'center', 
          width: '100%', maxWidth: 800, 
          borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
          margin: '0 auto' 
        }}
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
      >
        {/* --- 1. 지역/공원명 검색 --- */}
        <IconButton sx={{ p: '10px' }} aria-label="search"><SearchIcon /></IconButton>
        <InputBase 
          sx={{ ml: 1, flex: 1 }} 
          placeholder="어디로 산책 가시나요? (공원명, 지역)" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        {/* --- 2. 소요 시간 선택 (드롭다운) --- */}
        <Button
          startIcon={<AccessTimeIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          onClick={openTimeMenu}
          sx={{ 
            color: duration ? '#000000ff' : '#555', // 선택되면 오렌지색
            fontWeight: duration ? 'normal' : 'normal',
            borderRadius: '20px', padding: '10px 15px', minWidth: '140px' 
          }}
        >
          {duration || '소요 시간'}
        </Button>
        
        <Menu
          anchorEl={timeAnchor}
          open={Boolean(timeAnchor)}
          onClose={closeTimeMenu}
          PaperProps={{ sx: { borderRadius: '15px', mt: 1 } }}
        >
          <MenuItem onClick={() => handleTimeSelect('30분 미만')}>30분 미만</MenuItem>
          <MenuItem onClick={() => handleTimeSelect('30분 - 1시간')}>30분 - 1시간</MenuItem>
          <MenuItem onClick={() => handleTimeSelect('1시간 - 2시간')}>1시간 - 2시간</MenuItem>
          <MenuItem onClick={() => handleTimeSelect('2시간 이상')}>2시간 이상</MenuItem>
        </Menu>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      

        {/* --- 4. 검색 버튼 --- */}
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: '#ff7e36',
            borderRadius: '30px',
            padding: '10px 30px',
            fontWeight: 'bold',
            marginLeft: '10px',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#e5621f', boxShadow: '0 4px 10px rgba(229,98,31,0.4)' },
          }}
        >
          검색
        </Button>
      </Paper>
    </ThemeProvider>
  );
}