# 제4회 문수림배 문예경연대회 Supabase 설정 안내

이 문서는 `/contest/2027/apply` 파일 접수 기능을 실운영 Supabase에 적용하기 위한 수동 작업 안내입니다. Codex는 실운영 Supabase 프로젝트에 직접 접속하거나 `db push`, `migration up`, bucket 생성 명령을 실행하지 않습니다. 운영자가 Supabase Dashboard SQL Editor 또는 CLI에서 직접 검토하고 적용해야 합니다.

## 전제

기존 Supabase DB에는 `public.contest_submissions` 테이블이 이미 존재하지만, 제3회 접수 데이터는 더 이상 보존하지 않습니다. 이 문서와 migration은 기존 `contest_submissions` 테이블을 제4회 파일 접수 기준으로 drop/recreate 하는 방식을 사용합니다.

건드리지 않는 대상:

- `auth.users` 등 Supabase 인증 관련 테이블
- 기존 `/contest/2026/Results` 페이지
- Storage bucket의 실운영 생성 작업

## 구현 범위

- `/contest/2027/apply` 접수폼
- Supabase Storage private bucket 업로드 코드
- `contest_submissions` insert 코드
- 운영자 메일 발송 코드
- 환경변수 목록
- Supabase Dashboard 수동 작업 목록
- Storage bucket 생성 안내
- RLS policy SQL 초안

## 필요한 환경변수

| 변수명 | 용도 | 노출 범위 |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 클라이언트 노출 가능 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | 클라이언트 노출 가능 |
| `RESEND_API_KEY` | 운영자 알림 메일 발송 | 서버 전용 |
| `MAIL_FROM` | 발신자 주소. 예: `Sulim Studio <no-reply@surimstudio.com>` | 서버 전용 |
| `CONTEST_ADMIN_EMAIL` | 접수 알림 수신 주소. 미설정 시 `surimstudio@gmail.com` 사용 | 서버 전용 |

주의:

- 현재 제4회 접수 API는 `SUPABASE_SERVICE_ROLE_KEY`를 사용하지 않습니다.
- service role key를 사용할 경우 반드시 서버 전용 환경변수로만 사용합니다.
- service role key를 하드코딩하거나 `NEXT_PUBLIC_` 환경변수로 노출하지 않습니다.

## 적용할 SQL migration

초안 파일:

`supabase/migrations/004_contest_2027_submissions.sql`

방식:

- `drop table if exists public.contest_submissions;`
- 제4회 파일 접수 기준으로 `public.contest_submissions` 재생성
- `auth.users(id)` foreign key 유지
- RLS 활성화
- authenticated 사용자에게 `select`, `insert`만 grant
- 자기 row insert/select 정책 추가
- authenticated update 권한과 update policy는 만들지 않음
- service role은 RLS를 우회하므로 전체 row 조회/수정 가능
- Storage object policy 초안 포함

`drop table ... cascade`는 사용하지 않았습니다. 의존 객체가 있어 drop이 실패하면 운영자가 의존성을 확인한 뒤 직접 판단해야 합니다.

## 최종 스키마 요약

주요 컬럼:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `user_email text not null`
- `contest_year integer not null default 2027`
- `category text not null`
- `work_title text not null`
- `pen_name text not null`
- `reference_link text`
- `file_bucket text not null default 'contest-submissions'`
- `file_path text not null`
- `original_file_name text not null`
- `file_size_bytes bigint not null`
- `file_mime_type text`
- `consent_original boolean not null default false`
- `consent_no_infringement boolean not null default false`
- `consent_publication boolean not null default false`
- `submitted_at timestamp with time zone not null default now()`
- `status text not null default 'submitted'`
- `email_sent_at timestamp with time zone`
- `email_error text`

제약:

- `category in ('novel', 'poetry', 'essay')`
- `status in ('submitted', 'reviewed', 'selected', 'not_selected')`
- `file_size_bytes <= 5242880`
- `contest_year = 2027`
- `file_bucket = 'contest-submissions'`
- 세 동의 항목은 모두 `true`

인덱스:

- `contest_submissions_user_id_idx` on `(user_id)`
- `contest_submissions_contest_year_idx` on `(contest_year)`
- `contest_submissions_contest_year_category_idx` on `(contest_year, category)`
- `contest_submissions_submitted_at_idx` on `(submitted_at)`

## RLS 정책 초안

기본 방향:

- 로그인 사용자는 자신의 접수 row를 insert할 수 있습니다.
- 로그인 사용자는 자신의 접수 row를 select할 수 있습니다.
- 로그인 사용자는 `contest_submissions` row를 update할 수 없습니다.
- 일반 사용자는 다른 사람의 접수 row를 볼 수 없습니다.
- service role은 RLS를 우회하므로 전체 접수 row를 읽거나 수정할 수 있습니다. service role key는 서버 전용으로만 관리합니다.

정식 SQL은 migration 파일에 포함되어 있습니다.

## Storage bucket 설정

사용 bucket 이름:

`contest-submissions`

필수 조건:

- public bucket 사용 금지
- private bucket으로 생성
- 운영자가 Supabase Dashboard에서 직접 생성
- Codex가 실운영 bucket 생성 명령을 실행하지 않음

Dashboard에서 수동 생성:

1. Supabase Dashboard > Storage > Buckets > New bucket
2. Name: `contest-submissions`
3. Public bucket: Off
4. 생성 후 Storage policy를 migration 초안과 맞춰 적용

파일 저장 경로:

`2027/{user_id}/{submission_id}/{submission_id}.{ext}`

Storage RLS policy는 `(storage.foldername(name))[1] = '2027'` 및 `(storage.foldername(name))[2] = auth.uid()::text` 조건으로 로그인 사용자가 자기 `user_id` 경로에만 insert/select 가능하도록 작성되어 있습니다.

## 저장 흐름

제출 처리 순서:

1. 로그인 사용자 확인
2. 폼 입력값 검증
3. 파일 확장자 검증
4. 파일 크기 5MB 이하 검증
5. 서버에서 `submissionId` 생성
6. `2027/{user_id}/{submission_id}/{submission_id}.{ext}` 형태로 Storage path 구성
7. Supabase Storage private bucket에 파일 업로드
8. 업로드 성공 후 DB에 접수 row 생성
9. private file에 대해 signed download URL 생성
10. 운영자 이메일 발송
11. Storage upload 실패 시 DB row를 만들지 않고 서버 로그만 남김
12. 이메일 발송 결과는 DB update 없이 서버 로그로만 남김
13. 사용자에게 접수 완료 안내 표시

`contest_submissions`에 authenticated update 권한이 없으므로, 접수 API는 일반 사용자 권한으로 row를 update하지 않습니다. `email_sent_at`과 `email_error`는 현재 API에서 기록하지 않으며, 필요하면 서버 전용 service role client를 별도로 도입해야 합니다.

## 제4회 접수 DB 저장값

- `contest_year`: `2027`
- `user_id`: 로그인한 Supabase user id
- `user_email`: 로그인한 user email
- `category`: `novel`, `poetry`, `essay` 중 하나
- `work_title`: 대표 작품 제목
- `pen_name`: 필명 또는 SNS 닉네임
- `reference_link`: 선택 입력값
- `file_bucket`: `contest-submissions`
- `file_path`: Supabase Storage 저장 경로
- original_file_name: 사용자가 업로드한 원본 파일명. 한글 파일명도 그대로 보존
- Storage 저장 파일명: 원본 파일명을 쓰지 않고 {submission_id}.{ext} 형식 사용
- `file_size_bytes`: 파일 크기
- `file_mime_type`: 파일 MIME type
- `consent_original`: `true`
- `consent_no_infringement`: `true`
- `consent_publication`: `true`
- `status`: `submitted`

## 운영자 메일

파일은 이메일에 직접 첨부하지 않습니다.

운영자 이메일에는 다음 정보를 포함합니다.

- 접수 시각
- 접수 ID
- 로그인 이메일
- 필명/SNS 닉네임
- 참고 링크
- 응모 부문
- 대표 작품 제목
- `contest_year`
- 원본 파일명
- 파일 크기
- MIME type
- Storage bucket
- Storage path
- signed download URL
- 필수 동의 항목 확인 여부

## 운영 전 점검

- `/contest/2027` 접수 버튼이 `/contest/2027/apply`로 연결되는지 확인
- 비로그인 사용자가 접수 페이지 접근 시 로그인 페이지로 이동하는지 확인
- 로그인/이메일 인증 사용자가 접수폼을 볼 수 있는지 확인
- 로그인 계정 이메일이 읽기 전용으로 표시되는지 확인
- 허용 확장자: `hwp`, `hwpx`, `doc`, `docx`, `pdf`, `txt`
- 차단 확장자: `zip`, `7z`, `rar`, 이미지, 실행 파일, 기타 미허용 파일
- 5MB 초과 파일 차단 확인
- `contest_year = 2027`로 row 저장 확인
- Storage path가 `2027/{user_id}/{submission_id}/...` 형태인지 확인
- Storage bucket이 private인지 확인
- 운영자 메일에 파일 첨부가 없고 Storage path와 signed URL이 들어가는지 확인
- 기존 `/contest/2026/Results` 페이지에 영향이 없는지 확인

## 현재 코드 위치

- 접수 페이지: `src/app/contest/2027/apply/page.tsx`
- 접수폼 컴포넌트: `src/components/contest/2027/Contest2027ApplyForm.tsx`
- 접수 API: `src/app/api/contest/2027/apply/route.ts`
- 공고 페이지 버튼: `src/app/contest/2027/page.tsx`
- SQL 초안: `supabase/migrations/004_contest_2027_submissions.sql`