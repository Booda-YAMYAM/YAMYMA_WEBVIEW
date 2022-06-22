//import React from "react";
// import { useSelector, shallowEqual } from "react-redux";

const { kakao } = window;

export default function KakaoMapScript({ place }) {
  //   const { lat, lon } = useSelector(
  //     (state) => state.locationReducer,
  //     shallowEqual
  //   );
  //   const container = document.getElementById("map");
  //   const options = {
  //     center: new kakao.maps.LatLng(lat, lon),
  //     level: 3,
  //   };
  //   const map = new kakao.maps.Map(container, options);
  //   var geocoder = new kakao.maps.services.Geocoder();

  //   geocoder.addressSearch(place, function (result, status) {
  //     // 정상적으로 검색이 완료됐으면
  //     if (status === kakao.maps.services.Status.OK) {
  //       var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

  //       // 결과값으로 받은 위치를 마커로 표시합니다
  //       var marker = new kakao.maps.Marker({
  //         map: map,
  //         position: coords,
  //       });

  //       // 인포윈도우로 장소에 대한 설명을 표시합니다
  //       var infowindow = new kakao.maps.InfoWindow({
  //         content:
  //           '<div style="width:150px;text-align:center;padding:6px 0;">' +
  //           place +
  //           "</div>",
  //       });
  //       infowindow.open(map, marker);

  //       // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
  //       map.setCenter(coords);
  //     }
  //   });
  //   //위도, 경도로 변환 및 마커표시
  //   // let markerPosition  = new kakao.maps.LatLng(lat, lon);
  //   // let marker = new kakao.maps.Marker({
  //   //     position: markerPosition
  //   // });
  //   // marker.setMap(map);

  //   return <div className="kakao-map"></div>;

  var container = document.getElementById("Mymap"),
    options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
  const map = new kakao.maps.Map(container, options);
  var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map);
}
