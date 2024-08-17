import React from "react";

const Message = () => {
  return (
    <div className=" border flex h-screen">
      <aside className=" w-1/3 border"></aside>
      <section className="w-2/3 border h-full flex flex-col justify-between">
        <div></div>
        <div className=" flex items-center w-full"></div>
      </section>
    </div>
  );
};

export default Message;
