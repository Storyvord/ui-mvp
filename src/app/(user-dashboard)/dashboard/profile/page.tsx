import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectComponent from "@/components/profile/ProjectComponent";




const Page: React.FC = () => {
  const defaultProfileData = {
    name: "Scott P.",
    role: "As an animator",
    location: ", United States",
    rate: "$400/Day",
    rating: "4.5",
    reviewScore: "⭐⭐⭐⭐⭐",
    imageUrl:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    bio: "As an animator, designer, and illustrator, Scott has helped create a variety of work, including Vice TV’s Most Expensivest, advertising campaigns like Brooklyn Brewery’s Pulp Art IPA, music videos for artists such as TVOD, documentaries like BuzzFeed Studio’s Unclickable, educational content for institutions like Harvard University, and much more. As a filmmaker, Scott’s independent films — including Someplace in Time, Goldfish, and others — have been recognized in over 70 festivals, museums, and exhibitions worldwide, including the 29th Raindance Film Festival, Animist Tallinn, NYC Indie Shorts Awards, Motionographer, the Museum of Fine Arts Boston, and the Kurt Vonnegut Museum and Library.",
    topReview:
      "Janes work on our feature film was nothing short of spectacular. Highly recommend.",
    website: "https://www.scottpalazzo.com/",
    profileLink: "/dashboard/profile",
    socialMedia: [
      { name: "LinkedIn", link: "/dashboard/profile" },
      { name: "Twitter", link: "/dashboard/profile" },
      { name: "Instagram", link: "/dashboard/profile" },
    ],
  };

  const projectDataFallback = [
    {
      imageUrl:
        "https://res.cloudinary.com/ddsqycvoq/image/upload/t_embed_thumbnail,f_auto,q_auto/v1/images/84a3eec81a8396ebf0e2405c2e012b9b8f778201",
      projectTitle: "Perdue Beer Can Chicken",
      projectDescription:
        "Animation and Motion Graphics to launch Perdue and Torch and Crowns new beer.",
      projectLink: "https://vimeo.com/827018857",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/ddsqycvoq/image/upload/t_embed_thumbnail,f_auto,q_auto/v1/images/cc4a8e906c3eea34f3c2b1c6147fb3cf8fa214b2",
      projectTitle: "Someplace in Time",
      projectDescription:
        "Late at night, Billy Pilgrim finds himself marooned within his own memories...",
      projectLink: "https://vimeo.com/507017093",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/ddsqycvoq/image/upload/t_embed_thumbnail,f_auto,q_auto/v1/images/ab6bd0bff91eddc13d93d3c3baeefea27a868f24",
      projectTitle: "Goldfish",
      projectDescription:
        "Goldfish, a fully animated music video for the New York based band, TVOD...",
      projectLink: "https://vimeo.com/770600384?share=copy",
    },
  ];

  const profile = defaultProfileData;
  const projects = projectDataFallback;

  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mb-6 lg:mx-4 border border-blue-gray-100">
      <div className="p-4">
        <div className="px-4 pb-4">
          <div className="mb-2 flex justify-between items-center">
            <h1 className="font-semibold text-lg">Profile</h1>
            <Link href="/dashboard/update-profile">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
                type="button"
              >
                Update Profile
              </button>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <div className="flex flex-col lg:flex-row items-center bg-white shadow-sm rounded-lg">
                <div className="w-full lg:w-1/4 p-4 border-b lg:border-b-0 lg:border-r">
                  <div className="flex justify-center">
                    <div className="w-full flex justify-center">
                      <Image
                        src={profile.imageUrl}
                        alt="Profile"
                        className="rounded-full w-24 h-24 lg:w-36 lg:h-36 mx-auto"
                        width={144}
                        height={144}
                      />
                    </div>
                  </div>
                  <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-bold text-center mt-4">
                    {profile.name}
                  </h6>
                  <p className="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-500 text-center mt-2">
                    {profile.role}
                  </p>
                </div>
                <div className="w-full lg:w-3/4 p-4">
                  <div className="flex flex-col lg:flex-row justify-between items-center">
                    <p className="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-500 text-center lg:text-left">
                      {profile.location}
                    </p>
                    <p className="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-500 mt-2 lg:mt-0">
                      {profile.rate}
                    </p>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-between mt-4">
                    <div className="flex items-center">
                      <p className="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-500 mr-2">
                        {profile.rating}
                      </p>
                      <p className="block antialiased font-sans text-base font-light leading-relaxed text-yellow-400">
                        {profile.reviewScore}
                      </p>
                    </div>
                    <div className="flex mt-4 lg:mt-0">
                      <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-blue-500 text-blue-500 hover:opacity-75 focus:ring focus:ring-blue-200 active:opacity-[0.85] mr-2"
                        type="button"
                      >
                        Connect
                      </button>
                      <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-green-500 text-green-500 hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85]"
                        type="button"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-semibold">
                  Bio
                </h6>
                <p className="block antialiased font-sans text-sm font-light leading-normal text-blue-gray-500 mt-2">
                  {profile.bio}
                </p>
                <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-semibold mt-4">
                  Reviews
                </h6>
                <p className="block antialiased font-sans text-sm font-light leading-normal text-blue-gray-500 mt-2">
                  {profile.topReview}
                </p>
              </div>
            </div>
            <div className="md:w-1/3 p-4">
              <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-semibold">
                Top Review
              </h6>
              <p className="block antialiased font-sans text-sm font-light leading-normal text-blue-gray-500 mt-2">
                {profile.topReview}
              </p>
              <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-semibold mt-4">
                Website
              </h6>
              <Link href={profile.website}>
                <p className="block antialiased font-sans text-sm font-light leading-normal text-blue-500">
                  {profile.website}
                </p>
              </Link>
              <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-semibold mt-4">
                Profile Link
              </h6>
              <Link href={profile.profileLink}>
                <p className="block antialiased font-sans text-sm font-light leading-normal text-blue-500">
                  View Profile
                </p>
              </Link>
              <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 font-semibold mt-4">
                Social Media
              </h6>
              <div className="flex mt-2 flex-wrap gap-2">
                {profile.socialMedia.map((social, index) => (
                  <Link key={index} href={social.link}>
                    <p className="block antialiased font-sans text-sm font-light leading-normal text-blue-500">
                      {social.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-2">
            Projects
          </h6>
          <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
            Architects design houses
          </p>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectComponent key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
