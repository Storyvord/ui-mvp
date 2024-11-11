import { destn } from "@/constant/constant";
import Image from "next/image";
const Location = () => {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className=" sm:absolute hidden sm:flex justify-evenly sm:bg-gradient-to-b from-[#092579] to-[#25D765] h-full w-[40%] md:w-[37%] lg:w-[33%]
         lg:ml-[150px] top-0 bottom-0 -z-10"
        >
          <div className=" bg-gray-100 bg-opacity-10 w-0.5 min-h-[100%]"></div>
          <div className=" bg-gray-100 bg-opacity-10 w-0.5 min-h-[100%]"></div>
        </div>
        <div className="h-max">
          <div className=" ml-[2vw] lg:ml-[19vw] flex-col mt-[7vh] ">
            <div className="grid grid-cols-1 sm:grid-cols-2 ">
              <h1 className="text-black sm:text-white h-[150px] w-[280px] p-4 md:w-[25vw] 2xl:w-[19vw] text-2xl md:text-4xl font-barlow font-black z-1">
                MOST POPULAR LOCATION WE WORK ON
              </h1>
              <p className=" des text-[#454242] text-[20px] md:text-[25px] 2xl:text-[28px] font-normal  lg:mr-[100px] lg:ml-[50px] 2xl:ml-[-15vw] md:w-[35vw] font-sans_serif">
                With our network of creators, you can choose any location for your videos, from
                major cities to the most remote areas on the planet
              </p>
            </div>
            {/* location images */}
            <div className=" mt-[40px] lg:mr-[80px] p-[15px] grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pt-4">
              {destn.map((item) => (
                <div
                  className=" relative flex font-bold overflow-x-hidden overflow-y-hidden"
                  key={item.name}
                >
                  <div className=" bg-gradient-to-b from-transparent via-transparent to-black absolute left-0 bottom-0 h-[35%] w-[100%] lg:w-[25vw] z-1 "></div>
                  <Image
                    width={200}
                    height={200}
                    className=" h-auto w-[100%] hover:rotate-[2deg] transition-all duration-500 hover:scale-110"
                    src={item.image}
                    alt={item.name}
                  />
                  <h6 className="h6 text-sm md:text:md lg:text-lg absolute left-[16px] bottom-[4px] font-['Barlow'] text-white">
                    {item.name}
                  </h6>
                </div>
              ))}
            </div>
            {/* trusted brands */}
            <div className="loc_3 flex flex-col items-center sm:flex-row mt-[40px] mb-[20px]">
              <h1 className=" text-lg sm:text-xl md:text-2xl lg:text-3xl lg:w-[20vw] font-black text-black sm:text-white font-['Barlow'] pr-4 pl-2">
                TRUSTED BY MANY BRANDS
              </h1>
              <div className=" flex flex-wrap justify-center gap-3 sm:ml-[11vw] lg:p-[25px] p-[20px]">
                <Image
                  width={200}
                  height={200}
                  className="w-[90px] lg:w-[80px] xl:w-[105px] grayscale hover:grayscale-0"
                  src="https://storyvord.com/img/brand-logo11.svg"
                  alt="Logo"
                />
                <Image
                  width={200}
                  height={200}
                  className="w-[90px] lg:w-[80px] xl:w-[105px] grayscale hover:grayscale-0"
                  src="https://storyvord.com/img/brand-logo12.svg"
                  alt="Logo"
                />
                <Image
                  width={200}
                  height={200}
                  className="w-[90px] lg:w-[80px] xl:w-[105px] grayscale hover:grayscale-0 "
                  src="https://storyvord.com/img/brand-logo13.svg"
                  alt="Logo"
                />
                <Image
                  width={200}
                  height={200}
                  className="w-[90px] lg:w-[80px] xl:w-[105px] grayscale hover:grayscale-0"
                  src="https://storyvord.com/img/brand-logo14.svg"
                  alt="Logo"
                />
                <Image
                  width={200}
                  height={200}
                  className="w-[90px] lg:w-[80px] xl:w-[105px] grayscale hover:grayscale-0"
                  src="https://storyvord.com/img/brand-logo15.svg"
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
