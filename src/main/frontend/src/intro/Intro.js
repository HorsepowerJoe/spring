import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import testImage from "../swiper/img/testimage600x400.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../swiper/css/intro.css";

import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";

function Intro(props) {
  const [introImages, setIntroImages] = useState([]);

  useEffect(() => {
    axios.get("/api/intro/intro", {}).then((data) => {
      if (data.status == 200) {
        setIntroImages(data.data);
      }
    });
  }, []);

  const swiperImage = introImages.map((image) => (
    <SwiperSlide>
      <img
        src={image}
        style={{
          width: "600px",
          height: "400px",
        }}
        alt={image.imageName}
      />
    </SwiperSlide>
  ));

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
        {swiperImage}
      </Swiper>
      <hr />
    </>
  );
}

export default Intro;
