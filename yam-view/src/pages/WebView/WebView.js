/* global kakao */
import React, { createElement, useEffect, useState } from "react";
import { markerdata } from "../../components/Data/markerData";
import "./WebView.css";
import RestaurantModal from "../../components/Modal/RestaurantModal";
import $ from "jquery";

const { kakao } = window;

var clickedOverlay = null;
var selectedMarker = null;

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
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    mapscript();
  }, []);

  // 모달 여는 함수
  const openModal = () => {
    setModalOpen(true);
    console.log("하이");
  };

  // 모달 닫는 함수
  const closeModal = () => {
    setModalOpen(false);
  };

  const mapscript = () => {
    var container = document.getElementById("Mymap"),
      options = {
        center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
        level: 3,
      };

    // 이유는 모르겠으나 ㅠㅠ map이 너무 많이 생겨 있어서 삭제합니다!
    while (document.getElementById("Mymap").childNodes.length > 1) {
      document
        .getElementById("Mymap")
        .removeChild(document.getElementById("Mymap").childNodes[0]);
    }

    const map = new kakao.maps.Map(container, options);

    // blue는 크기 40,40
    var marker_blue_src = require("../../assets/marker_blue.png");

    // yellow는 크기 25,25
    var marker_yellow_src = require("../../assets/marker_yellow.png");

    // 지정된 이미지로 marker 생성하는 함수
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

    // marker의 image 속성에 넣을 지정된 이미지
    var createImage = (src, size) => {
      var imageSize = new kakao.maps.Size(size[0], size[1]);
      var markerImage = new kakao.maps.MarkerImage(src, imageSize);
      return markerImage;
    };

    var blue_img = createImage(marker_blue_src, [40, 40]);
    var yellow_img = createImage(marker_yellow_src, [25, 25]);

    /* zoom  */
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMLEFT);

    // 음식점 data map
    markerdata.map((el, index) => {
      var markerPosition = new kakao.maps.LatLng(
        el.y_coordinate,
        el.x_coordinate
      );

      var marker = createImageMarker(
        marker_yellow_src,
        [25, 25],
        markerPosition
      );

      //overlay content
      var content = `<div class="wrap">
            <div class="info">
                <div class="title" >
                    <div class="yellowLine"></div>
                     <div class="name">
        ${el.restaurantName} 
        </div>
        <div class="sector">
        ${el.SECTOR}
        </div>
        </div>
                <div class="body">
                    <div class="content">
                      <div class ="phone row">
                        <div class="phone text bold">
                        연락처
                        </div>
                        <div class="phone_number">
                          ${el.restaurantNumber}
                          </div>
                        </div>
                      <div class = "open row">
                        <div class="open text bold">
                        영업시간
                        </div>
                        <div class="open_time">
                        ${el.OPEN_TIME}
                        </div>
                      </div>
                      <div class = "menu row">
                        <div class="menu text bold">
                        대표메뉴
                        </div>
                        <div class="main_menu">
                        ${el.MAIN_MENU}
                        </div>
                      </div>
                      <div class="detail">
                      <a href="#" onclick="${openModal()}">가게 자세히 보러가기</a>
                      </div>
                    </div>
                </div>
            </div>
        </div>;`;
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

      // 이유는 모르겠으나 ㅠㅠ map이 너무 많이 생겨 있어서 삭제합니다!
      while (document.getElementById("link").childNodes.length > 1) {
        document
          .getElementById("link")
          .removeChild(document.getElementById("link").childNodes[0]);
      }

      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
        clickable: true,
      });

      overlay.setMap(null);
      // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다

      // 맵을 눌렀을때 오버레이 삭제, 마커 색상 노란색으로
      kakao.maps.event.addListener(map, "click", () => {
        overlay.setMap(null);
        marker.setImage(yellow_img);
      });

      kakao.maps.event.addListener(marker, "click", function () {
        if (clickedOverlay) {
          clickedOverlay.setMap(null);
        }
        if (!selectedMarker || selectedMarker !== marker) {
          // 클릭된 마커 객체가 null이 아니면
          // 클릭된 마커의 이미지를 기본 이미지로 변경하고
          !!selectedMarker && selectedMarker.setImage(yellow_img);

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          marker.setImage(blue_img);
        }

        overlay.setMap(map);
        clickedOverlay = overlay;
        selectedMarker = marker;

        // 클릭한 marker의 위치를 map의 센터로
        //map.setCenter(markerPosition);
      });
    });
  };

  return (
    <div>
      <div id="link" style={{ position: "relation", zIndex: 2 }}>
        <RestaurantModal
          open={modalOpen}
          close={closeModal}
          header="Modal heading"
        >
          모달입니당
        </RestaurantModal>
      </div>

      <div
        id="Mymap"
        style={{ width: "100%", height: "100vh", zIndex: 1 }}
      ></div>
    </div>
  );
};

export default WebView;
