// import React from 'react'
import { FaPhone } from "react-icons/fa6";
import { TiLocation } from "react-icons/ti";
import { HiMail } from "react-icons/hi";
import { HiArrowLongRight } from "react-icons/hi2";
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import Image from "next/image";

function Footer() {
  return (
    <>
      <section className=' bg-black text-white overflow-hidden'>
        {/* Contact Us & Questions */}
        <div className='flex flex-col sm:flex-row sm:gap-16 md:gap-20 md:ml-1 sm:mr-3 md:mr-10 lg:ml-8 xl:ml-[5vw]'>
          {/* Contact Us */}
          <div className=' relative w-[85vw] sm:w-[40vw] xl:w-[35vw] 2xl:w-[30vw] h-full sm:pb-20 bg-gradient-to-b from-[#25D765] to-[#092579]'>
            <Image width={200} height={200} src="https://storyvord.com/img/camera-stand-img.png" alt="image" className="w-full h-full absolute mix-blend-overlay object-cover" />
            <Image width={200} height={200} src="https://storyvord.com/img/line2.png" alt="image" className="w-full h-full absolute mix-blend-overlay object-cover" />
            <div className="text-white p-5 pl-3 pr-10 lg:pl-10  mt-14 z-10">
              <h1 className=" font-barlow-2 text-2xl md:text-4xl font-bold md:font-extrabold">CONTACT US</h1>
              <br />
              <h6 className=" font-josefin text-base md:text-lg font-semibold">London</h6>
              <div className=" font-josefin xsm:text-lg md:text-xl xsm:font-medium md:font-semibold mt-4 ml-4">
                <p className=" flex gap-2"> <TiLocation className=" size-[27px] mt-[-5px]" /> 5 Brayford Square London E1 0SG</p>
                <a href="tel:+44 7432220904" className="mt-3 flex gap-2 cursor-pointer"><FaPhone /> +44 7432220904</a>
              </div>
              <h6 className=" font-josefin text-base md:text-lg font-semibold mt-5">Hong Kong</h6>
              <div className="font-josefin xsm:text-lg md:text-xl xsm:font-medium md:font-semibold mt-4 ml-4">
                <p className="flex gap-2"> <TiLocation className=" size-[60px] mt-[-25px]" /> Unit 1603, 16th Floor, The L. Plaza, 367-375, Queen&apos;s Road Central Sheung Wan, Hong Kong</p>
                <a href="tel:+44 7432220904" className="mt-3 flex gap-2 cursor-pointer"><FaPhone /> +852 8197 9043</a>
                <a href="mailto:Info@storyvord.com" className="mt-3 flex gap-2"><HiMail className="size-[25px]" /> Info@storyvord.com</a>
              </div>
            </div>
            <Image width={200} height={200} src="https://storyvord.com/img/footr-reel-img.svg" alt="image"
              className=" scale-50 xsm:scale-75 md:scale-90 absolute bottom-[-45px] xsm:bottom-[-27px] md:bottom-[-10px] right-[-82px] xsm:right-[-78px]" />
          </div>
          {/* Have a Question */}
          <div className='mt-8 ml-4 mr-4 sm:mt-16 sm:w-[45vw] lg:w-[45vw] xl:w-[40vw]'>
            <h1 className=" font-barlow-2 text-2xl sm:text-3xl md:text-4xl font-bold text-white">HAVE A QUESTION?</h1>
            <br />
            <br />
            <form className=" text-white w-[99%] flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input type="text" name="fname" className=" bg-[#393943] focus:bg-black focus:outline-[#25D765] focus:outline-none sm:w-1/2 h-10 lg:h-12 p-4 font-semibold font-josefin " placeholder="First Name" />
                <input type="text" name="sname" className=" bg-[#393943] focus:bg-black focus:outline-[#25D765] focus:outline-none sm:w-1/2 h-10 lg:h-12 p-4 font-semibold font-josefin" placeholder="Last Name" />
              </div>
              <input type="email" name="email" className=" bg-[#393943] focus:bg-black focus:outline-[#25D765] focus:outline-none h-10 lg:h-12 p-4 font-semibold font-josefin" placeholder="Email" />
              <input type="phone" name="phone" className=" bg-[#393943] focus:bg-black focus:outline-[#25D765] focus:outline-none h-10 lg:h-12 p-4 font-semibold font-josefin" placeholder="Phone" />
              <textarea className=" bg-[#393943] focus:bg-black focus:outline-[#25D765] focus:outline-none p-4 font-semibold font-josefin" name="message" id="" cols={20} rows={4} placeholder="Message"></textarea>
              <div className=" cursor-pointer bg-gradient-to-l from-[#25D765] to-[#092579]  hover:bg-gradient-to-r h-12 w-[200px] font-bold font-barlow flex justify-between p-2 pl-4">
                <input type="submit" value="SUBMIT" />
                <HiArrowLongRight className=" size-8" />
              </div>
            </form>
          </div>
        </div>
        {/* break point */}
        <hr className="mt-5 sm:mt-0 xl:ml-[63px] xl:mr-[70px] " />
        {/* Footer */}
        <div className='mt-20 ml-4 mr-4 lg:ml-8 lg:mr-8 xl:ml-16 xl:mr-16'>
          <div className=' flex justify-between flex-wrap'>
            <div className=" w-full md:w-3/4 xl:w-[20vw] flex flex-col mx-auto xl:mx-0 justify-center mb-10">
              <div className=' flex justify-center'>
                <Image width={200} height={200} src="https://storyvord.com/img/logo.svg" alt="logo" className=' cursor-pointer w-[200px] h-[100px] md:w-[250px] md:h-[150px] lg:w-[150px] lg:h-[75px]' />
              </div>
              <p className=" font-josefin text-center xl:text-left">Storyvord makes it easy to get creative content for your business, produced quickly and at scale, and supported by a strong creator team and with exclusive performance statistics.</p>
              <div className="flex gap-4 mt-4 ml-2 justify-center">
                <TiSocialFacebook className=" cursor-pointer size-8 md:size-10 p-1 rounded-full hover:bg-gradient-to-l from-[#25D765] to-[#092579] transition-all duration-500 " />
                <TiSocialLinkedin className=" cursor-pointer size-8 md:size-10 p-1 rounded-full hover:bg-gradient-to-l from-[#25D765] to-[#092579] transition-all duration-500 " />
                <TiSocialTwitter className=" cursor-pointer size-8  md:size-10 p-1 rounded-full hover:bg-gradient-to-l from-[#25D765] to-[#092579] transition-all duration-500" />
              </div>
            </div>
            <div className=' mt-3 xsm:w-[30vw] xl:w-[14vw]'>
              <h1 className=" font-barlow-2 sm:text-xl font-bold">LEGAL</h1>
              <ul className=" mt-2 md:mt-4 font-josefin flex flex-col gap-2 text-sm sm:text-base">
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Privacy Policy</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Brands Terms and Conditions</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>General Terms and Conditions</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Creator Terms and Conditions</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Data Protection Policy</li>
              </ul>
            </div>
            <div className='mt-3 w-[31vw] xsm:w-[25vw] md:w-[18vw] xl:w-[13vw]'>
              <h1 className=" font-barlow-2 text-lg sm:text-xl font-bold">OUR LINKS</h1>
              <ul className=" mt-2 md:mt-4 font-josefin flex flex-col gap-2 text-sm sm:text-base">
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Video content types</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Services</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Industry</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Location</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>For Creators</li>
              </ul>
            </div>
            <div className=' mt-3 w-[30vw] xsm:w-[20vw] md:w-[15vw] xl:w-[10vw]'>
              <h1 className=" font-barlow-2 text-lg sm:text-xl font-bold">LOCATIONS</h1>
              <ul className=" mt-2 md:mt-4 font-josefin flex flex-col gap-2 text-sm sm:text-base">
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>New York</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Shanghai</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Toronto</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>London</li>
                <li className=' cursor-pointer hover:text-green-600 hover:ml-2 transition-all duration-500'>Paris</li>
              </ul>
            </div>
            <div className=" mt-3 mb-8 w-[90vw] xxs:w-48 xsm:w-full md:w-[30vw] xl:w-[25vw] flex flex-col">
              <h1 className=" font-barlow-2 text-lg sm:text-xl font-bold">JOIN OUR NEWSLETTER</h1>
              <p className=" mt-2 md:mt-4 sm:text-base font-josefin">In a professional context it often happens that private or corporate.</p>
              <input type="email" name="email" className=" bg-[#393943]  focus:bg-black focus:outline-[#25D765] focus:outline-none h-12 p-4 w-[90%] mt-2 font-semibold font-josefin" placeholder="Enter Your Email" />
              <div className=" cursor-pointer bg-gradient-to-l from-[#25D765] to-[#092579] hover:bg-gradient-to-r h-12 w-[90%] font-bold font-barlow flex justify-between p-2 pl-4 mt-3">
                <input type="submit" value="SUBMIT" />
                <HiArrowLongRight className=" size-8" />
              </div>
            </div>
          </div>
        </div>
        {/* break point */}
        <hr className="mt-15 sm:mt-0 xl:ml-[63px] xl:mr-[70px] " />

        <div className="text-white lg:ml-[75px] lg:mr-[75px] p-4 flex flex-col-reverse sm:flex-row gap-2 justify-between mx-auto">
          <p className=" font-josefin flex mx-auto sm:mx-0 text-center">© 2024 Storyvord Limited, All rights reserved</p>
          <Image width={200} height={200} src="https://storyvord.com/img/footer-pay-img.svg" alt="" className='w-[80vw] xsm:w-[70vw] sm:w-fit flex mx-auto sm:mx-0' />
        </div>
      </section>
    </>
  )
}

export default Footer