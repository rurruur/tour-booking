## 투어 예약 서비스

- [init.sql](database/init.sql)
- [docker-compose.yml](database/docker-compose.yml)

### 서버 실행

1. `npm i`
2. `docker-compose -f database/docker-compose.yml up -d`
3. `npm run start:dev`

## 기능

### 판매자

1. 등록

   `POST /seller`

2. 조회

   `GET /seller`

3. 상세조회

4. 예약 자동승인 횟수 변경

   `PATCH /seller/auto-approve`

5. 휴일 설정

   `PATCH /seller/off`

6. 예약 확인

7. 예약 수락/거절
