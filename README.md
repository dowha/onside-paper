# ⚽ ONSIDE Rolling Paper

축구 팀 멤버들을 위한 프리미엄 디지털 롤링페이퍼 서비스입니다.  
세련된 축구 테마 디자인과 안전한 메시지 관리 기능을 제공합니다.

---

## ✨ 주요 기능

### 1. 🎨 프리미엄 축구 테마 상시 제공
- **잔디 텍스처 배경**: 경기장의 생동감을 담은 고퀄리티 디자인
- **다이나믹 뷰 모드**: 
  - **슬라이드 뷰**: 한 장 한 장 넘겨보는 아날로그한 감성
  - **그리드 뷰**: 모든 메시지를 한누네 모아보는 갤러리 방식
- **반응형 디자인**: 모바일과 데스크탑 어디서든 완벽한 레이아웃

### 2. 🔐 강력한 보안 및 프라이버시
- **비밀번호 보호**: 각 멤버별 전용 비밀번호를 통한 입장 제한
- **환경 변수 관리**: 민감한 정보(비밀번호, 데이터 소스)를 소스 코드에서 완전히 분리
- **검색 엔진 차단**: `robots.txt` 및 `noindex` 설정으로 개인 정보 보호

### 3. 📊 구글 스프레드시트 연동
- **간편한 내용 관리**: 개발 지식 없이도 구글 시트에서 실시간으로 메시지 수정/추가 가능
- **멀티 시트 지원**: 하나의 구글 시트 파일 내의 여러 탭을 각각 다른 멤버에게 연결 가능
- **데이터 은폐**: GitHub 소스 코드에는 어떤 메시지 내용도 남지 않는 완벽한 은폐 지원

---

## 🛠️ 기술 스택

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (Static Export)

---

## 🚀 시작하기

### 1. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 아래 형식을 채워주세요.

```env
# 멤버 1 설정
NEXT_PUBLIC_PASSWORD_MEMBER1=비밀번호
NEXT_PUBLIC_SHEET_URL_MEMBER1=구글시트_CSV_URL

# 멤버 2 설정
NEXT_PUBLIC_PASSWORD_MEMBER2=비밀번호
NEXT_PUBLIC_SHEET_URL_MEMBER2=구글시트_CSV_URL
```

### 2. 구글 시트 연결 방법
1. 구글 시트 메뉴: **파일 > 공유 > 웹에 게시** 선택
2. '쉼표로 구분된 값(.csv)'으로 설정 후 게시
3. 생성된 URL을 위 환경 변수에 입력 (특정 탭 연결 시 해당 탭의 URL 전체를 사용)

### 3. 로컬 개발
```bash
npm install
npm run dev
```

---

## 📦 배포 (GitHub Pages)

### 1. 정적 빌드
```bash
npm run build
```
빌드 완료 후 생성된 `out` 폴더의 내용을 배포 환경에 업로드합니다.

### 2. GitHub Actions 자동 배포
- 저장소의 **Settings > Secrets and variables > Actions** 에서 환경 변수를 등록하세요.
- GitHub Actions를 사용해 `out` 폴더를 자동으로 배포할 수 있습니다.

---

## 📄 라이선스
이 프로젝트는 개인 소장 및 축구 팀 온사이드를 위해 제작되었습니다.  
Made with ❤️ by Onside Team.
