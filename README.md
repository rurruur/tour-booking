## 투어 예약 서비스

- [init.sql](database/init.sql)
- [docker-compose.yml](database/docker-compose.yml)

### 서버 실행

1. `npm i`
2. `docker-compose -f database/docker-compose.yml up -d`
3. `npm run start:dev`

### swagger

서버 시작 후 `localhost:3000/api` 접속

## 기능

### 판매자

1. 판매자 리스트 조회

2. 상세조회

   - 판매자ID를 이용하여 정보 상세조회

3. 등록

   - 중복 등록 방지를 위해 이메일 이용

4. 예약 자동승인 횟수 변경

   - 기본값: 일별 5회
   - 설정된 횟수 이내의 예약건은 자동 승인
   - 추가 예약건은 수동 승인

5. 휴일 설정

   - 특정 날짜 혹은 요일로 지정 가능
   - 휴무일로 지정한 날에 대기중인 예약이 있을 경우 취소 처리
   - 휴무일로 지정한 날에 확정된 예약이 있을 경우 휴무 지정 불가

6. 예약 승인/거절

   - 예약일로부터 1일 전까지 가능
   - 대기 상태로 예약일이 되는 경우 자동 거절

### 예약

1. 가능한 예약 일정 조회(월 단위)

   - 1년 이내 조회 가능

2. 예약 신청

   - 1년 이내까지 예약 가능
   - 이메일당 하루에 한 건만 예약 가능

3. 예약 상태 변경

   - 취소: 여행일 3일 전까지 취소 가능
   - 수락/거절: 여행일 하루 전까지만 가능
   - PENDING 상태로 예약일이 된 경우 자동 취소

4. 예약 취소

   - 예약 취소는 예약일 3일 전까지 가능

5. 예약 조회

   - 예약시 기입한 이메일로 전체 예약 내역 확인
