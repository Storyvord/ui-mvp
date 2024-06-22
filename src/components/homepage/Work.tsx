"use client"

import Image from "next/image";
import { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1100 },
        items: 3,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1100, min: 768 },
        items: 2,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

const Work = () => {
    const carouselRef = useRef<Carousel>(null);

    const sliderImageUrl = [
        {
            url: "https://storyvord.com/img/festive-collection-2022.jpg",
            name: "Festive Collection 2022"
        },
        {
            url: "https://storyvord.com/img/sajay-ali-fashionfilm.jpg",
            name: "Sajay Ali Fashionfilm"
        },
        {
            url: "https://storyvord.com/img/west-collection-2022.jpg",
            name: "West Collection 2022"
        },
        {
            url: "https://storyvord.com/img/portfolio-thmb1.png",
            name: "rippel"
        },
        {
            url: "https://storyvord.com/img/portfolio-thmb5.png",
            name: "rippel"
        },
        {
            url: "https://storyvord.com/img/portfolio-thmb13.png",
            name: "Portfolio Thumbnail 13"
        },
        {
            url: "https://storyvord.com/img/portfolio-thmb2.png",
            name: "Portfolio Thumbnail 2"
        },
        {
            url: "https://storyvord.com/img/portfolio-thmb9.png",
            name: "Portfolio Thumbnail 9"
        },
        {
            url: "https://storyvord.com/img/perfume.jpg",
            name: "Perfume"
        }
    ];

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next(1);
        }
    };

    return (
        <section>
            <div className="container max-w-full p-6 lg:p-20 bg-[#092679] flex justify-center items-start relative">
                <div className="text-white text-left w-full lg:w-4/5 py-4 relative">
                    <h2 className="text-[30px] lg:text-[40px] font-bold font-barlow-2 uppercase">Our Work</h2>
                    <p className="font-Josefin-Sans text-[16px] lg:text-[20px] py-2">Content for any audience, goal, or budget</p>
                    <div className="absolute right-0 bottom-[10px] sm:top-[20px] text-white z-[100]">
                        <Image width={120} height={100}
                            src="https://storyvord.com/img/drag.svg"
                            className="w-[60px] h-[50px] sm:w-[90px] sm:h-[75px] lg:w-[120px] lg:h-[100px] hover:scale-75 transform-none  cursor-pointer"
                            alt="drag"
                            onClick={handleNext}
                        />
                    </div>
                    <div className="py-6 lg:py-10">
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            // stagePadding={0}
                            arrows={false}
                            showDots={false}
                            ref={carouselRef}
                            autoPlay
                            autoPlaySpeed={5000}
                        >
                            {sliderImageUrl.map((imageUrl, index) => (
                                <div className="mx-2 relative overflow-x-hidden overflow-y-hidden" key={index}>
                                    <div className="relative max-w-[300px] w-full mx-auto">
                                        <Image width={200} height={200}
                                            src={imageUrl.url}
                                            alt="movie"
                                            className="w-full h-auto transform hover:scale-110 hover:rotate-[2deg] transition-transform duration-300 ease-in-out z-[60]"
                                        />
                                        <h6 className="absolute bottom-2 left-2 text-white bg-opacity-50 px-2 py-1 font-barlow-2 font-bold uppercase">
                                            {imageUrl.name}
                                        </h6>
                                    </div>   
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className="absolute bottom-0 left-5 h-12 z-50 mb-2">
                    <Image width={200} height={200} src="https://storyvord.com/img/camera-img2.svg" alt="camera" className="lg:h-25 lg:w-25 h-24 w-24 mt-[-12px] lg:mt-0" />
                </div>
            </div>
        </section>
    );
};

export default Work;