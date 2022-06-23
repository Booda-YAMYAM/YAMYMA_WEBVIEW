import React, { useEffect, useState } from "react";
import { markerdata } from "../../components/Data/markerData";
import "./Restaurant.css";

const Restaurant = (props) => {
  const [open, close] = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div className="body">
          <div>
            <img
              className="res_img"
              src={require("../../assets/restaurantImg.png")}
              alt="가게사진"
            />
          </div>
          <div className="detail_container">
            <div className="top_detail_container">
              <div className="top row">
                <div className="title">어쩌구 저쩌구 식당</div>
                <div className="sector">한식</div>
                <div className="bookmark">즐겨찾기</div>
                <img
                  className="star_img"
                  src={require("../../assets/star.png")}
                  alt="즐겨찾기사진"
                />
              </div>
              <div className="middle">
                <div className="phone row">
                  <div className="detail_title">연락처</div>
                  <div className="detail_content">010-0000-0000</div>
                </div>
                <div className="open_time row">
                  <div className="detail_title">영업 시간</div>
                  <div className="detail_content">매일 오전 8시-오후 11시</div>
                </div>
                <div className="open_time row">
                  <div className="detail_title">가게 주소</div>
                  <div className="detail_content">
                    서울특별시 어쩌구 저쩌동 00-00 0층{" "}
                  </div>
                </div>
              </div>
              <div className="bottom row">
                <button className="heart_btn">
                  사장님께 감사의 하트 보내기
                </button>
              </div>
            </div>
            {/* 카테고리 부분 시작*/}
            <div className="bottom_detail_container">
              <div className="menu_container">
                <div className="popular_menu_title row">
                  <div className="category_title">대표 메뉴</div>
                  <img
                    src={require("../../assets/lineLeftImg.png")}
                    alt="동그라미"
                  />
                  <div className="yello_line"></div>
                </div>
                <div className="popular_menu_content ">
                  <img
                    src={require("../../assets/popular_menu.png")}
                    alt="대표메뉴사진"
                  />
                  <div className="content_detail row">
                    <div className="yellowLine"></div>
                    <div className="text col">
                      <div>칠색 비빔밥</div>
                      <div>7,000원</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Restaurant;
