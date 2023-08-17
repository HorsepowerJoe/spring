import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import testImage from "../swiper/img/testimage600x400.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../swiper/css/intro.css";

import { Pagination, Navigation } from "swiper/modules";

function Intro(props) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        style={{ height: "500px" }}
      >
        <SwiperSlide>
          <img
            src={testImage}
            style={{
              width: "600px",
              height: "400px",
            }}
            alt="testimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={testImage}
            style={{ width: "600px", height: "400px" }}
            alt="testimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={testImage}
            style={{ width: "600px", height: "400px" }}
            alt="testimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={testImage}
            style={{ width: "600px", height: "400px" }}
            alt="testimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={testImage}
            style={{ width: "600px", height: "400px" }}
            alt="testimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={testImage}
            style={{ width: "600px", height: "400px" }}
            alt="testimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={testImage}
            style={{ width: "600px", height: "400px" }}
            alt="testimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={testImage}
            style={{ width: "600px", height: "400px" }}
            alt="testimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={testImage}
            style={{ width: "600px", height: "400px" }}
            alt="testimage"
          />
        </SwiperSlide>
      </Swiper>
      <hr />
    </>
  );
}

export default Intro;
