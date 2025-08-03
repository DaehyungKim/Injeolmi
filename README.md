# 프로젝트

Express.js + Next.js + PostgreSQL

## 🛠 기술 스택

### Backend (Express)
- **Node.js** + **Express.js**
- **TypeScript**
- **PostgreSQL** (데이터베이스)
- **TypeORM** (ORM)
- **JWT** (인증)

### Frontend (Next.js)
- **Next.js 15**
- **React 18**
- **TypeScript**
- **Redux Toolkit** (상태관리)
- **Axios** (HTTP 클라이언트)

## 📋 사전 요구사항

- **Node.js** - [다운로드](https://nodejs.org/)
- **PostgreSQL** - [다운로드](https://www.postgresql.org/download/)

## 🗄️ PostgreSQL 설치 및 설정

### 1. PostgreSQL 설치

#### Windows
1. [PostgreSQL 공식 사이트](https://www.postgresql.org/download/windows/)에서 Windows 인스톨러 다운로드

2. 인스톨러 실행 후 다음 설정으로 설치:
   - Port: `5432` (기본값)



### 2. 데이터베이스 생성

```bash
# PostgreSQL 사용자로 로그인
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE board_db;

# 종료
\q

```

### 3. 데이터베이스 연동

```bash
express > src > dataSource.ts
```

## 🚀 프로젝트 설정 및 실행


```bash
# 의존성 설치
npm install

```


### 4. 서버 실행

#### Backend 실행
```bash
# express 폴더에서
npm run dev
```


#### Frontend 실행
```bash
npm run dev
```


## 📁 프로젝트 구조

```
project/
├── express/          # Backend (Express.js)
│   ├── src/
│   │   ├── controllers/    # 컨트롤러
│   │   ├── entities/       # 데이터베이스 엔티티
│   │   ├── services/       # 비즈니스 로직
│   │   ├── routes/         # 라우트 정의
│   │   └── common/         # 유틸리티
│   └── public/uploads/     # 파일 업로드 폴더
├── front/            # Frontend (Next.js)
│   ├── src/app/           # App Router
│   │   ├── (api)/         # API 함수들
│   │   ├── (common)/      # 공통 컴포넌트
│   │   ├── (store)/       # Redux 스토어
│   │   ├── auth/          # 인증 페이지
│   │   └── guest-board/   # 게시판 페이지
│   └── public/            # 정적 파일
└── README.md         # 이 파일
```


### NextJS의 렌더링 방식들

#### 🎨 CSR (Client-Side Rendering)
**클라이언트에서 렌더링하는 방식**

- **특징**: 브라우저에서 JavaScript로 페이지를 동적으로 생성
- **장점**: 
  - 페이지 전환이 빠름 (SPA와 유사)
  - 서버 부하 감소
  - 사용자 상호작용이 많은 페이지에 적합
- **단점**: 
  - 초기 로딩 시간이 길 수 있음
  - SEO 최적화 어려움
  - JavaScript가 비활성화되면 작동하지 않음

```tsx
// CSR 예시 - useEffect로 데이터 페칭
'use client'
import { useEffect, useState } from 'react'

export default function CSRPage() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  return <div>{data ? JSON.stringify(data) : '로딩 중...'}</div>
}
```

#### 🚀 SSR (Server-Side Rendering)
**서버에서 렌더링하는 방식**

- **특징**: 요청할 때마다 서버에서 HTML을 생성해서 전송
- **장점**: 
  - SEO 최적화 우수
  - 초기 로딩 속도 빠름
  - 실시간 데이터 반영 가능
- **단점**: 
  - 서버 부하 증가
  - 페이지 전환 시 깜빡임 발생
  - 서버 응답 시간에 의존

```tsx
// SSR 예시 - 서버에서 데이터를 가져와서 렌더링
export default async function SSRPage() {
  // 서버에서 실행됨
  const response = await fetch('http://localhost:3001/api/data')
  const data = await response.json()
  
  return (
    <div>
      <h1>서버에서 렌더링된 페이지</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

#### ⚡ SSG (Static Site Generation)
**빌드 시점에 정적 페이지를 생성하는 방식**

- **특징**: 빌드할 때 미리 HTML 파일을 생성
- **장점**: 
  - 가장 빠른 로딩 속도
  - CDN 캐싱 최적화
  - 서버 부하 없음
  - SEO 최적화 우수
- **단점**: 
  - 실시간 데이터 반영 불가
  - 빌드 시간 증가
  - 동적 콘텐츠 처리 어려움

```tsx
// SSG 예시 - 빌드 시점에 정적 페이지 생성
export default function SSGPage({ posts }: { posts: any[] }) {
  return (
    <div>
      <h1>정적으로 생성된 블로그</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}

// 빌드 시점에 실행되어 props를 생성
export async function generateStaticParams() {
  const posts = await fetch('http://localhost:3001/api/posts').then(res => res.json())
  return { props: { posts } }
}
```

#### 🔄 ISR (Incremental Static Regeneration)
**정적 생성과 서버 렌더링의 장점을 결합한 방식**

- **특징**: 정적 페이지를 주기적으로 재생성
- **장점**: 
  - SSG의 빠른 속도 + 데이터 업데이트 가능
  - 서버 부하 최소화
  - SEO 최적화 우수
  - 확장성 좋음
- **단점**: 
  - 복잡한 캐싱 전략 필요
  - 실시간성이 떨어질 수 있음

```tsx
// ISR 예시 - 60초마다 페이지 재생성
export default function ISRPage({ posts }: { posts: any[] }) {
  return (
    <div>
      <h1>점진적 정적 재생성 페이지</h1>
      <p>60초마다 업데이트됩니다.</p>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await fetch('http://localhost:3001/api/posts').then(res => res.json())
  
  return {
    props: { posts },
    revalidate: 60 // 60초마다 재생성
  }
}
```

#### 🎯 프로젝트에서의 활용 예시

```typescript
// 우리 프로젝트에서의 활용
├── app/
│   ├── page.tsx                   
│   ├── auth/
│   │   ├── login/page.tsx         # CSR - 로그인 폼
│   │   └── register/page.tsx      # CSR - 회원가입 폼
│   └── guest-board/
│       ├── list/page.tsx          # SSR + CSR 게시글 목록 (초기 로딩 : SSR, 페이지네이션: CSR)
│       ├── read/[id]/page.tsx     # SSR - 게시글 상세
│       └── create/page.tsx        # CSR - 게시글 작성 폼
```


### NextJS의 라우팅 방식

Next.js 13+ App Router는 파일 시스템 기반의 라우팅을 사용합니다.

#### 📁 기본 라우팅 구조

```
src/app/
├── page.tsx                 # / (메인 페이지)
├── layout.tsx              # 루트 레이아웃
├── loading.tsx             # 로딩 UI
├── error.tsx               # 에러 페이지
├── not-found.tsx           # 404 페이지
├── auth/
│   ├── login/
│   │   └── page.tsx        # /auth/login
│   └── register/
│       └── page.tsx        # /auth/register
└── guest-board/
    ├── list/
    │   └── page.tsx        # /guest-board/list
    ├── read/
    │   └── [id]/
    │       └── page.tsx    # /guest-board/read/123 (동적 라우팅)
    ├── create/
    │   └── page.tsx        # /guest-board/create
    └── update/
        └── [id]/
            └── page.tsx    # /guest-board/update/123
```

#### 🔧 특수 폴더명 (괄호 폴더)

Next.js에서 괄호로 감싼 폴더는 **라우팅에 영향을 주지 않는** 조직화 폴더입니다.

##### 📂 현재 프로젝트의 괄호 폴더들

```
src/app/
├── (api)/              # API 관련 함수들 (URL에 포함되지 않음)
│   ├── authApi.tsx     # 인증 관련 API
│   ├── client.ts       # HTTP 클라이언트 설정
│   ├── config.tsx      # API 설정
│   └── guestBoardApi.tsx # 게시판 API
├── (common)/           # 공통 컴포넌트들 (URL에 포함되지 않음)
│   └── components/
│       ├── auth/
│       │   └── AuthNav.tsx
│       ├── editor/
│       │   └── MenuBar.tsx
│       └── ui/
│           └── Modal.tsx
├── (store)/            # 상태 관리 (URL에 포함되지 않음)
│   ├── store.ts
│   ├── StoreProvider.tsx
│   └── slice/
│       └── authSlice.ts
└── (type)/             # 타입 정의 (URL에 포함되지 않음)
    ├── auth/
    │   └── auth.ts
    └── guest-board/
        └── board.ts
```


#### 🚀 동적 라우팅 (Dynamic Routes)

```tsx
// [id] 폴더: 동적 매개변수
├── guest-board/
│   ├── read/
│   │   └── [id]/
│   │       └── page.tsx    # /guest-board/read/123
│   └── update/
│       └── [id]/
│           └── page.tsx    # /guest-board/update/456
```

**동적 라우팅 사용 예시:**
```tsx
// guest-board/read/[id]/page.tsx
interface PageProps {
  params: {
    id: string
  }
}

export default function ReadPage({ params }: PageProps) {
  const { id } = params // URL에서 id 추출
  
  return <div>게시글 ID: {id}</div>
}
```



