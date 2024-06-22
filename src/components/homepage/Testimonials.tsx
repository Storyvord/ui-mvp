"use client"

import { useRef } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1100 },
        items: 2,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1100, min: 768 },
        items: 1,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};



const Testimonials = () => {
    const carouselRef = useRef<Carousel>(null);

    const handlePrevSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.previous(1);
        }
    };

    const handleNextSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.next(1);
        }
    };


    const data = [
        {
            name: 'Matthew Turner',
            description: "Thanks to Storyvord I've been able to connect with new clients and create work that reaches audiences around the world. The platform has opened up new opportunities for me as a filmmaker and I'm grateful for the exposure it has given me.",
        },
        {
            name: 'Alexander Roberts',
            description: "With Storyvord, I've gained the freedom to reach new clients independently, without having to rely solely on production companies. This has provided me with a new source of income and opened up new possibilities for my career as a filmmaker.",
        },
        {
            name: 'Jack Robinson',
            description: "I've always found it difficult to connect with bigger players in the industry. But thanks to the Storyvord platform, I've been able to network and find new opportunities that would have been difficult to access otherwise. The platform is truly empowering for smaller players in the video production industry.",
        },
    ];

    return (
        <section>
            <div className='text-white h-auto bg-[#092679] flex flex-col items-center relative pb-[50px]'>
                <h2 className="md:text-[37px] text-[23px] lg:text-[48px] font-barlow-2 font-bold uppercase text-center tracking-wide lg:py-20 py-10 p-8 mt-[20px] mb-15">
                    Why Creators love <span className="uppercase text-green-400 tracking-wide">Storyvord?</span>
                </h2>

                <div className='lg:w-[60%] md:w-[35%] w-[90%] overflow-hidden lg:mx-auto my-[-2px] relative'>
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        // stagePadding={0}
                        arrows={false}
                        showDots={false}
                        ref={carouselRef}
                    >
                        {data.map((d, index) => (
                            <div key={index} className='testimonial-item max-w-[500px] mx-auto'>
                                <div className='text-center rounded-3xl pl-3 lg:p-8 p-4 mx-3 bg-[#000821] lg:h-110% h-90%'>
                                    <p className='lg:text-[16px] text-[15px] font-Josefin-Sans font-semibold text-white py-2'>{d.description}</p>
                                    <h3 className='lg:text-[30px] text-[24px] font-extrabold font-barlow text-white uppercase py-1'>{d.name}</h3>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                    {/* <OwlCarousel
                        className='owl-theme'
                        ref={carouselRef}
                        loop
                        margin={15}
                        slideBy={1}
                        dots={false}
                        stageElement='div'
                        center={true}
                        responsive={{
                            0: {
                                items: 1,
                                nav: false
                            },
                            768: {
                                items: 1,
                                nav: false
                            },
                            1100: {
                                items: 1.5,
                                nav: false
                            }
                        }}
                    >
                        {data.map((d, index) => (
                            <div key={index} className='testimonial-item max-w-[500px] mx-auto'>
                                <div className='text-center rounded-3xl pl-3 lg:p-8 p-4 mx-3 bg-[#000821] lg:h-110% h-90%'>
                                    <p className='lg:text-[16px] text-[15px] font-Josefin-Sans font-semibold text-white py-2'>{d.description}</p>
                                    <h3 className='lg:text-[30px] text-[24px] font-extrabold font-barlow text-white uppercase py-1'>{d.name}</h3>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel> */}
                </div>
                <div className='flex lg:flex-col flex-row mt-10 space-x-4'>
                    <div className="lg:absolute left-[15%] top-[60%] transform -translate-y-1/2 cursor-pointer lg:z-20" onClick={handlePrevSlide}>
                        <Image width={200} height={200} src="https://storyvord.com/img/circle-left.svg" alt="Left navigation" className='opacity-75 w-12 h-12' />
                    </div>
                    <div className="lg:absolute right-[15%] top-[60%] transform -translate-y-1/2 cursor-pointer lg:z-20" onClick={handleNextSlide}>
                        <Image width={200} height={200} src="https://storyvord.com/img/circle-right.svg" alt="Right navigation" className='opacity-75 w-12 h-12' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
