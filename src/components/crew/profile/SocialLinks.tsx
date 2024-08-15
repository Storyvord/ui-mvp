import React from "react";

type EndorsementsProps = {
  socialLinks: {
    link: string;
    crew: number;
  }[];
};

const SocialLinks = ({ socialLinks }: EndorsementsProps) => {
  if (socialLinks?.length === 0) return null;

  return (
    <div className="bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Social Links</h2>
      {socialLinks?.map((link, index) => (
        <a key={index} href={link?.link} target="_blank" className="text-blue-500 block mb-2">
          {link?.link}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
