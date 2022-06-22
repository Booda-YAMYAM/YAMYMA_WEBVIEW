/* global kakao */
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import KakaoMapScript from "../components/kakaoMapScript";
import { markerdata } from "../components/Data/markerData";

const { kakao } = window;

// const isPc = useMediaQuery({
//     query : "(min-width:1024px)"
//   });

const WebView = () => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    var container = document.getElementById("Mymap"),
      options = {
        center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
        level: 3,
      };

    const map = new kakao.maps.Map(container, options);

    markerdata.map((el, index) => {
      var markerPosition = new kakao.maps.LatLng(el.lat, el.lng);
      // 마커 생성
      const marker = new kakao.maps.Marker({
        map: map,
        // 마커 표시 위치
        position: markerPosition,
        clickable: true,
      });
      // 마커에 표시될 인포윈도우
      var infowindow = new kakao.maps.InfoWindow({
        content: el.title,
      });
      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      //   kakao.maps.event.addListener(
      //     marker,
      //     "mouseover",
      //     makeOverListener(map, marker, infowindow)
      //   );
      //   kakao.maps.event.addListener(
      //     marker,
      //     "mouseout",
      //     makeOutListener(infowindow)
      //   );
      kakao.maps.event.addListener(marker, "click", function (e) {
        infowindow.open(map, marker);
        map.setCenter(markerPosition);
        //infowindow.close();
      });
    });

    // var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

    // var marker = new kakao.maps.Marker({
    //   position: markerPosition,
    //   map: map,
    // });

    // marker.setMap(map);

    // //장소에 대한 설명을 표시
    // var infowindow = new kakao.maps.InfoWindow({
    //   content:
    //     '<div style="width:150px;text-align:center;padding:6px 0;">' +
    //     "안녕" +
    //     "</div>",
    // });
    // infowindow.open(map, marker);

    // // 지도의 중심을 결과값으로 받은 위치로 이동
    // map.setCenter(markerPosition);
  };

  return (
    // <div>
    //   <Desktop id="map" style={{ width: "500px", height: "400px" }}></Desktop>
    // </div>
    // <div>
    //   <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    // </div>
    <div>
      <div id="Mymap" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};
export default WebView;
