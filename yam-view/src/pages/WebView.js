/* global kakao */
import React, { useEffect, useState } from "react";
import { markerdata } from "../components/Data/markerData";
import "./WebView.css";
const { kakao } = window;

/*  Data 변수명

    RESTARANT_ID: 1,
    USER_ID: 1,
    NAME: "콜드스퀘어", // 이름
    PHONE_NUMBER: "010-1111-1111", // 전화번호
    Y_COORDINATE: 37.62197524055062, // 위도
    X_COORDINATE: 127.16017523675508, // 경도
    ADDRESS: "대전광역시 00구 00동",
    HEART_COUNT: 3,
    SECTOR: "분식",
    LAST_UPDATED: Date(),
    DATE_CREATED: Date(), */

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

    var createImageMarker = (src, size, markerPosition) => {
      var imageSize = new kakao.maps.Size(size[0], size[1]);
      var markerImage = new kakao.maps.MarkerImage(src, imageSize);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        map: map,
        // 마커 표시 위치
        position: markerPosition,
        clickable: true,
        image: markerImage,
      });
      return marker;
    };

    // blue는 크기 40,40
    var marker_blue_src =
      "https://user-images.githubusercontent.com/52441923/175064993-4101106f-1d37-4158-8307-3a30e81b4020.png";

    // yellow는 크기 25,25
    var marker_yellow_src =
      "https://user-images.githubusercontent.com/52441923/175069715-16e33d75-6761-4907-9c8c-eb99292a07a7.png";

    markerdata.map((el, index) => {
      var markerPosition = new kakao.maps.LatLng(
        el.Y_COORDINATE,
        el.X_COORDINATE
      );

      var marker = createImageMarker(
        marker_yellow_src,
        [25, 25],
        markerPosition
      );

      var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        '            <div class="yellowLine"></div>' +
        '             "<div class="name">' +
        el.NAME +
        "</div>" +
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="https://user-images.githubusercontent.com/52441923/175064993-4101106f-1d37-4158-8307-3a30e81b4020.png" width="73" height="70">' +
        "           </div>" +
        '            <div class="desc">' +
        '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
        '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";
      /*  위 div 방식을 아래처럼 바꿔야할 것 같아요
        var content = document.createElement('div');
        content.setAttribute('class','wrap');

        var info = document.createElement('div');
        info.setAttribute('class','info');
        info.appendChild(document.createTextNode(pos.title));
        content.appendChild(info);
    
        var closeBtn = document.createElement('button');
        closeBtn.appendChild(document.createTextNode('닫기'));
         */

      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });

      // 지도에 확대 축소 컨트롤을 생성한다
      var zoomControl = new kakao.maps.ZoomControl();

      // 지도의 우측에 확대 축소 컨트롤을 추가한다
      map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

      function closeOverlay() {
        overlay.setMap(null);
      }

      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
        map.setCenter(markerPosition);
        marker = createImageMarker(marker_blue_src, [40, 40], markerPosition);
      });
    });
  };

  return (
    <div>
      <div id="Mymap" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default WebView;
