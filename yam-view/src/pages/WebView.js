/* global kakao */
import React, { createElement, useEffect, useState } from "react";
import { dummyData, markerdata } from "../components/Data/markerData";
import "./WebView.css";
import DetailModal from "../components/DetiaModal";
import $ from "jquery";
import { filterTag } from "../utils/filterTag";
import { findCategoryEtoK, findCategoryKtoE } from "../utils/findCategory";
import heartModal from "../components/Modals/heartModal";

const { kakao } = window;

var clickedOverlay = null;
var selectedMarker = null;

/**
 * webView에서 RN으로 data를 보내는 함수
 * 실행시 RN으로 보낸다
 */
const requestPermission = () => {
  if (window.ReactNativeWebView) {
    // 모바일이라면 모바일의 카메라 권한을 물어보는 액션을 전달합니다.
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "REQ_CAMERA_PERMISSION_HI_HELLO" })
    );
  } else {
    // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
    console.log("모바일이 아님");
  }
};

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
  const [result, setResult] = useState({
    tagList: "",
    openTime: "",
    dist: "",
  });

  const [modalOpen, setModalOpen] = useState(false);

  /** react native 환경에서만 가능 */
  const onMessageHandler = (e) => {
    const event = JSON.parse(e.data);
    window.ReactNativeWebView.postMessage(JSON.stringify({ event: event }));
    if (event) {
      setResult({
        tagList: event.tagList,
        openTime: event.openTime,
        dist: event.dist,
      });
    }
  };

  useEffect(() => {
    mapscript();

    const isUIWebView = () => {
      return navigator.userAgent
        .toLowerCase()
        .match(/\(ip.*applewebkit(?!.*(version|crios))/);
    };

    const receiver = isUIWebView() ? window : document;

    receiver.addEventListener("message", onMessageHandler);
    return () => {
      receiver.removeEventListener("message", onMessageHandler);
    };
  }, [result]);

  // 모달 여는 함수
  const openModalFunc = () => {
    setModalOpen(true);
  };

  // 모달 닫는 함수
  const closeModalFunc = () => {
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
    var marker_blue_src = require("../assets/marker_blue.png");

    // yellow는 크기 25,25
    var marker_yellow_src = require("../assets/marker_yellow.png");

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

    let data;
    // 음식점 data map
    if (result.tagList) {
      let categoryList = result.tagList
        .split(",")
        .map((el) => findCategoryKtoE(el));
      let filterData = filterTag(dummyData, categoryList);

      data = [...filterData];
    } else {
      data = [...dummyData];
    }

    data.map((el, index) => {
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
        ${findCategoryEtoK(el.category)}
        </div>
        <div class='star'>
        <imglocation>
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
                        ${`오전 9시 ~ 오후 6시`}
                        </div>
                      </div>
                      <div class = "menu row">
                        <div class="menu text bold">
                        대표메뉴
                        </div>
                        <div class="main_menu">
                        ${el.menus.map((el) => el.menuName).join(" , ")}
                        </div>
                      </div>
                      <div class="detail" data-index="${el.restaurantId}">
                      <link>
                      </div>
                    </div>
                </div>
            </div>
        </div>;`;

      let starImg = document.createElement("img");
      starImg.className = "starImg";
      if (el.star) {
        starImg.src = require("../assets/fullStar.png");
      } else {
        starImg.src = require("../assets/emptyStar.png");
      }

      let link = document.createElement("a");
      link.className = "link";
      link.textContent = "상세보기";
      link.setAttribute("data-index", el.restaurantId);

      // link.setAttribute("onclick", `${alert("상세보기")}`);

      content = content.replace("<link>", `${link.outerHTML}`);

      content = content.replace("<imglocation>", `${starImg.outerHTML}`);

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

      // const makeModal = () => {
      //   let modal = document.createElement("div");
      //   modal.className = "modal";
      //   modal.setAttribute("data-index", el.restaurantId);
      //   modal.innerHTML = content;
      //   modal.style.display = "none";
      //   modal.style.position = "absolute";
      //   modal.style.top = "0";
      //   modal.style.left = "0";
      //   modal.style.width = "100%";
      //   modal.style.height = "100%";
      //   modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      //   modal.style.zIndex = "1";
      //   modal.style.textAlign = "center";
      //   modal.style.paddingTop = "50px";
      //   modal.style.fontSize = "20px";
      //   modal.style.color = "white";
      //   modal.style.fontWeight = "bold";

      //   document.body.appendChild(modal);
      // };

      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });

      overlay.setMap(null);
      // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다

      function closeOverlay() {
        overlay.setMap(null);
      }

      // 맵을 눌렀을때 마커 삭제
      // kakao.maps.event.addListener(map, "click", () => {
      //   overlay.setMap(null);
      //   marker.setImage(yellow_img);
      // });

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
        console.log(document.querySelector(".detail"));
        document.querySelector(".detail").addEventListener("click", (e) => {
          console.log(e.target);

          const markUp = `
          <div class="background">
          <div class="window">
            <div class="popup">
              <button id="close">팝업닫기</button>
            </div>
          <div>
          <div>
          `;

          const temp = `
          <div class="modal">
            <div class="body">
              <div>
                <img
                  class="res_img"
                  src={require("../../assets/restaurantImg.png")}
                  alt="가게사진"
                />
              </div>
              <div class="detail_container">
                <div class="top_detail_container">
                  <div class="top row">
                    <div class="title">어쩌구 저쩌구 식당</div>
                    <div class="sector">한식</div>
                    <div class="bookmark">즐겨찾기</div>
                    <img
                      class="star_img"
                      src={require("../../assets/star.png")}
                      alt="즐겨찾기사진"
                    />
                  </div>
                  <div class="middle">
                    <div class="phone row">
                      <div class="detail_title">연락처</div>
                      <div class="detail_content">010-0000-0000</div>
                    </div>
                    <div class="open_time row">
                      <div class="detail_title">영업 시간</div>
                      <div class="detail_content">매일 오전 8시-오후 11시</div>
                    </div>
                    <div class="open_time row">
                      <div class="detail_title">가게 주소</div>
                      <div class="detail_content">
                        서울특별시 어쩌구 저쩌동 00-00 0층{" "}
                      </div>
                    </div>
                  </div>
                  <div class="bottom row">
                    <button class="heart_btn">
                      사장님께 감사의 하트 보내기
                    </button>
                  </div>
                </div>
                {/* 카테고리 부분 시작*/}
                <div class="bottom_detail_container">
                  <div class="menu_container">
                    <div class="popular_menu_title row">
                      <div class="category_title">대표 메뉴</div>
                      <img
                        src={require("../../assets/lineLeftImg.png")}
                        alt="동그라미"
                      />
                      <div class="yello_line"></div>
                    </div>
                    <div class="popular_menu_content ">
                      <img
                        src={require("../../assets/popular_menu.png")}
                        alt="대표메뉴사진"
                      />
                      <div class="content_detail row">
                        <div class="yellowLine"></div>
                        <div class="text col">
                          <div>칠색 비빔밥</div>
                          <div>7,000원</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
          `;

          // console;
          console.log(document.body);
          document.body.insertAdjacentHTML("beforebegin", markUp);

          document.querySelector(".background").classList.add("show");

          document.querySelector("#close").addEventListener("click", () => {
            document.querySelector(".background").classList.remove("show");
          });
        });

        clickedOverlay = overlay;
        selectedMarker = marker;

        // 클릭한 marker의 위치를 map의 센터로
        //map.setCenter(markerPosition);
      });
    });
  };

  return (
    <div>
      <div id="Mymap" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

requestPermission();

export default WebView;
