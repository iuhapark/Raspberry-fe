import { useEffect, useState } from "react";

import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { PG } from "@/app/components/common/enums/PG";

export function Menu() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = parseCookies().accessToken; // 토큰 가져오기

    const processToken = () => {
      if (!token) {
        console.log("Token is missing");
        return null;
      }

      let decoded: any;
      try {
        decoded = jwtDecode(token);
        console.log("User id in Profile:", decoded.id);
        return decoded.id;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    };

    const userIdFromToken = processToken(); // 함수 실행
    if (userIdFromToken) {
      setUserId(userIdFromToken); // userId 상태 업데이트
    }
  }, []); // 빈 종속성 배열로 컴포넌트가 마운트될 때 한 번만 실행됨

  const payment = userId ? `${PG.PAY}/${userId}` : `${PG.PAY}/undefined`;
  const item = userId ? `${PG.ITEM}/${userId}` : `${PG.ITEM}/undefined`;

  return (
    <nav className="menu">
      <ul>
        <li>
          <a href={payment}>결제</a>
        </li>
        <li>
          <a href={item}>상품</a>
        </li>
        {/* <li>
          <a href={`${PG.BOARD}/list`}>게시판</a>
        </li> */}
      </ul>
    </nav>
  );
}
