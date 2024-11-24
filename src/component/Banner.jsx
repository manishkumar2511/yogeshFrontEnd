import React from "react";
import { banners } from "../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Banner = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <IoIosArrowRoundBack />,
        nextArrow: <IoIosArrowRoundForward />,
    };
    return (
        <div className="banner">
            <div className="w-11/12 sm:w-10/12 m-auto">
                <div className="mb-10">
                </div>
                <div className="w-full">
                    <Slider {...settings}>
                        {banners.map((data, key) => (
                            <div className="banner-slider rounded-3xl" key={key}>
                                <img
                                    src={data.banner}
                                    alt="databannerinmg"
                                    className="rounded-3xl"
                                    width={"100%"}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banner;
