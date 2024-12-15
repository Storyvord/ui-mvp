import Image from "next/image";
import Link from "next/link";
import React from "react";

const Posting = () => {
  return (
    <div className=" mt-4">
      <span className=" flex items-center gap-3 mb-4">
        <Image height={27} width={27} src="/send.svg" alt="posting" />
        <h1 className=" text-lg md:text-xl">Posting</h1>
      </span>
      <Link
        href="#"
        className=" max-w-80 border rounded-2xl p-4 bg-white flex flex-col gap-4 cursor-pointer"
      >
        <Image height={27} width={27} src="/icons/plus.svg" alt="plus-icon" />
        <span>
          <h2 className=" font-semibold text-lg mb-1">Create A Posting</h2>
          <p>Put up a posting or request pitches to find and hire talent from the marketplace</p>
        </span>
      </Link>
    </div>
  );
};

export default Posting;
