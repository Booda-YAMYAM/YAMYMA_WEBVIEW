/* global kakao */
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import KakaoMapScript from "../components/kakaoMapScript";
import { markerdata } from "../components/Data/markerData";

const { kakao } = window;

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const WebView = () => {
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
      new kakao.maps.Marker({
        map: map,
        // 마커 표시 위치
        position: markerPosition,
        // 마커에 hover 시 title 나타남
        title: el.title,
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

    // 클릭 이벤트
    //kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    //   var latlng = mouseEvent.latlng; // 클릭한 위도, 경도 정보
    //   marker.setPosition(latlng);
    //   console.log(
    //     `'클릭한 위치의 위도는 ${latlng.getLat()}이고, 경도는 ${latlng.getLng()}입니다`
    //   );
    //});
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
