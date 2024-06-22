import Image from "next/image";

const services =[
  {
    title: "EFFICIENT",
    image: "https://storyvord.com/img/service-icon1.svg",
    desc: "We make video production simple and affordable. Our process is smooth and time-efficient. We can shoot multiple country videos at the same time."
  },
  {
    title: "TRANSPARENCY",
    image: "https://storyvord.com/img/service-icon2.svg",
    desc: "Approval at each stage with real-time monitoring of all your projects in progress with our transparent delivery system."
  },
  {
    title: "GLOBAL COMMUNITY",
    image: "https://storyvord.com/img/service-icon3.svg",
    desc: "Our global community of creators share real-time collaboration, pool resources like share equipment and leverage each other's expertise."
  },
  {
    title: "INSIGHTFUL",
    image: "https://storyvord.com/img/service-icon4.svg",
    desc: "Our data-based insight assists in making strategic business decisions and improving ROI by using facts, metrics, and reports."
  },
         
]

const About = () => {
  return <section className="text-xl  h-auto">
  <div className="w-full h-auto flex flex-col items-center  relative">
  <div className="h-auto max-h-[60%] absolute top-[10vw] sm:top-[5vw]  left-[10vw] sm:left-[45%] md:left-[45%] lg:left-[16.5vw] lg:top-[7vw] -z-10">
    <Image src="https://storyvord.com/img/camera-img1.svg" alt="Camera Image" width={200} height={200} className="w-[20vw] sm:w-[[15vw]vw] md:w-[11vw]" />
  </div>
  <div className="relative w-[100%] sm:w-[80%] md:w-[80%] lg:w-[80%] xsm:top-10 h-auto flex flex-col md:flex-col  xl:flex-row xl:w-[80%] items-center justify-center space-y-4 md:space-y-0   md:top-10 py-8 ">
    <div className="  w-full relative  md:w-[100%]    lg:w-[100%] xl:w-[30%] flex flex-col items-center text-center md:items-start md:text-left xsm:items-start xsm:text-left font-bold text-4xl sm:text-5xl  md:text-6xl font-barlow  ">
      ABOUT <br /> STORYVORD
    </div>
    <div className="  xl:mx-10 w-[80%] xsm:w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] bg-white p-4 sm:p-6 md:p-8  relative xl:top-24">
      <h3 className="text-xl sm:text-2xl md:text-3xl flex flex-row items-center"> 
        <span className="h-[0.3vw] w-[[15vw]vw] sm:w-[10vw] md:w-[8vw] mx-2 bg-gradient-to-r from-[#012284] via-[#1AA36E] to-[#25D865]"></span>
        <b className="font-Josefin-Sans">WE ARE STORYVORD, COMMUNITY OF CREATORS WORLDWIDE</b>
      </h3>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-Josefin-Sans mt-4 sm:mt-6 ">
        We connect global filmmakers like writers, designers, video producers, animators, audio engineers, and photographers to connect with corporations, production agencies and brands in 18 countries.
      </p>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-Josefin-Sans mt-4 sm:mt-6 ">
        Our AI-powered process and global content-creator community reduce the cost of content creation by up to 50% through remote execution.
      </p>
    </div>
  </div>
  <div className="w-[90%] sm:w-[80%] mt-8 xsm:mt-4">
    <Image width={200} height={200} src="https://storyvord.com/img/video-bg.png" alt="Video Background" className="w-full" />
  </div>
</div>


{/* our services */}
  <div className="w-full h-auto mx-2 my-[50px] lg:mt-[100px] lg:mb-[200px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {
          services.map((item, index) => (
            <div key={item.title} className={`py-4 relative w-[250px] mx-auto h-auto flex flex-col ${index%2===0? "lg:bottom-[-80px]" : ""}`}>
                  <div className="grayscale opacity-5  relative">
                    < Image width={200} height={200} src={item.image}  className="w-[130px] mx-auto"alt="" />
                  </div> 
                  
                    <div className=" overflow-hidden group relative left-0 top-[-55px] bg-[rgb(255,_255,_255)] rounded-lg w-[90px] h-[90px] [box-shadow:-12px_11px_18px_rgba(0,_0,_0,_.[15vw])] flex flex-col justify-center items-center before:absolute before:top-full before:left-0 before:h-full before:w-full before:bg-custom-gradient before:transition-transform before:duration-300 hover:before:-translate-y-full ">
                      <Image width={200} height={200} src={item.image} className=" w-[75px] relative z-10 block transition-colors duration-300 group hover:brightness-[100]" alt="" />
                    </div>
                 
                  
                    <h1 className=" relative  text-2xl font-bold font-barlow">
                      {item.title}
                    </h1> 
                    <h3 className=" relative  text-[20px] pr-[3vw] leading-7 font-Josefin-Sans ">
                     {item.desc}
                    </h3>
            </div>
          ))
        }
      </div>
  </div>

    {/* services */}
        {/* <div className="  relative  w-full h-fit xsm:h-[145vw]   flex flex-col  xxs:items-start lg:items-center  xxs:top-40 xsm:top-20 ">
           <div className=" relative  flex w-[90%] justify-center items-start -mt-[1.5vw] flex-col md:flex-row">
                <div className=" xxs:mb-[20vw] xsm:mb-[15vw]   relative  md:w-[18vw] h-[30vw] ml-[3vw] sm:mb-[2vw] md:m-[3vw]  md:-bottom-[5vw] xsm:w-[67vw]">   
                  <div className="grayscale opacity-5  relative left-[3vw] ">
                    < Image width={200} height={200} src="https://storyvord.com/img/service-icon1.svg"  className="w-[9vw]"alt="" />
                  </div> n 
                  <div className=" overflow-hidden group relative left-[0vw] -top-[7vw] bg-[rgb(255,_255,_255)] rounded-[1vw] w-[7vw] h-[7vw] [box-shadow:-12px_11px_18px_rgba(0,_0,_0,_.[15vw])] flex flex-col justify-center items-center before:absolute before:top-full before:left-0 before:h-full before:w-full before:bg-custom-gradient before:transition-transform before:duration-300 hover:before:-translate-y-full ">
                    <Image width={200} height={200} src="https://storyvord.com/img/service-icon1.svg" className=" w-[5vw] relative z-10 block transition-colors duration-300 group hover:brightness-[100]" alt="" /></div>
                    <h1 className=" relative -top-[4vw] text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-barlow">
                      EFFICIENT 
                    </h1> 
                    <h3 className=" relative -top-[3vw] text-base sm:text-lg md:text-xs lg:text-[1.3vw] pr-[3vw] lg:leading-7 font-Josefin-Sans ">
                      We make video production simple and affordable. Our process is smooth and time-efficient. We can shoot multiple country videos at the same time.
                    </h3>
                  </div>
                <div className=" xxs:mb-[20vw] xsm:mb-[15vw]  relative  md:w-[18vw] h-[30vw] ml-[3vw] sm:mb-[2vw] md:m-[3vw] xsm:w-[67vw]">   <div className="grayscale opacity-5 relative left-[3vw]"><Image width={200} height={200}  src="https://storyvord.com/img/service-icon2.svg" className="w-[9vw]" alt="" /></div>  n <div className=" overflow-hidden group relative left-[0vw] -top-[7vw] bg-[rgb(255,_255,_255)] rounded-[1vw] w-[7vw] h-[7vw] [box-shadow:-12px_11px_18px_rgba(0,_0,_0,_.[15vw])] flex flex-col justify-center items-center before:absolute before:top-full before:left-0 before:h-full before:w-full before:bg-custom-gradient before:transition-transform before:duration-300 hover:before:-translate-y-full"><Image width={200} height={200} src="https://storyvord.com/img/service-icon2.svg" className=" w-[5vw] relative z-10 block transition-colors duration-300 group hover:brightness-[100]  " alt="" /></div> <h1 className="relative -top-[4vw] text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-barlow ">TRANSPARENCY</h1><h3 className=" relative -top-[3vw] text-base sm:text-lg md:text-xs lg:text-[1.3vw] pr-[3vw] lg:leading-7 font-Josefin-Sans ">Approval at each stage with real-time monitoring of all your projects in progress with our transparent delivery system.</h3></div>
                <div className=" xxs:mb-[20vw] xsm:mb-[15vw]  relative  md:w-[18vw] h-[30vw] ml-[3vw] sm:mb-[2vw] md:m-[3vw] md:-bottom-[5vw] xsm:w-[67vw]">   <div className=" grayscale opacity-5 relative left-[3vw]"><Image width={200} height={200}  src="https://storyvord.com/img/service-icon3.svg" className="w-[9vw]" alt="" /></div> n <div className="overflow-hidden group relative left-[0vw] -top-[7vw] bg-[rgb(255,_255,_255)] rounded-[1vw] w-[7vw] h-[7vw] [box-shadow:-12px_11px_18px_rgba(0,_0,_0,_.[15vw])] flex flex-col justify-center items-center before:absolute before:top-full before:left-0 before:h-full before:w-full before:bg-custom-gradient before:transition-transform before:duration-300 hover:before:-translate-y-full"><Image width={200} height={200} src="https://storyvord.com/img/service-icon3.svg" className=" w-[5vw] relative z-10 block transition-colors duration-300 group hover:brightness-[100] " alt="" /></div><h1 className=" relative -top-[4vw] text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-barlow">GLOBAL COMMUNITY</h1><h3 className=" relative -top-[3vw] text-base sm:text-lg md:text-xs lg:text-[1.3vw]  pr-[3vw] lg:leading-7 font-Josefin-Sans ">Our global community of creators share real-time collaboration, pool resources like share equipment and leverage each other&apos;s expertise.</h3></div>
                <div className=" xxs:mb-[20vw] xsm:mb-[15vw]  relative  md:w-[18vw] h-[30vw] ml-[3vw] sm:mb-[3vw] md:m-[3vw] xsm:w-[67vw]">   <div className=" grayscale opacity-5 relative left-[3vw]"><Image width={200} height={200}  src="https://storyvord.com/img/service-icon4.svg" className="w-[9vw]" alt="" /></div> n <div className=" overflow-hidden group relative left-[0vw] -top-[7vw] bg-[rgb(255,_255,_255)] rounded-[1vw] w-[7vw] h-[7vw] [box-shadow:-12px_11px_18px_rgba(0,_0,_0,_.[15vw])] flex flex-col justify-center items-center before:absolute before:top-full before:left-0 before:h-full before:w-full before:bg-custom-gradient before:transition-transform before:duration-300 hover:before:-translate-y-full"><Image width={200} height={200} src="https://storyvord.com/img/service-icon4.svg" className=" w-[5vw] relative z-10 block transition-colors duration-300 group hover:brightness-[100] " alt="" /></div><h1 className=" relative -top-[4vw] text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-barlow">INSIGHTFUL</h1> <h3 className=" relative -top-[3vw] text-base sm:text-lg md:text-xs lg:text-[1.3vw] pr-[3vw] lg:leading-7  font-Josefin-Sans">Our data-based insight assists in making strategic business decisions and improving ROI by using facts, metrics, and reports.</h3></div>
             
           </div>          */}
       {/* </div> */}
       </section>;
        
    
       
};


export default About;
