"use client";
import React, { useState } from "react";

import CreateScenes from "./_components/CreateScenes";
import ButtonGroup from "./_components/ButtonGroup";
import Navbar from "./_components/Navbar";

const Scenes = () => {
  const [createScenesDialog, setCreateScenesDialog] = useState(false);
  const [uploadScenesDialog, setUploadScenesDialog] = useState(false);

  //data will come from api
  const data = [];

  return (
    <div className=" w-full p-4">
      <h2 className="hidden md:block text-xl font-semibold">Scenes</h2>
      {data.length !== 0 ? (
        <Navbar
          setCreateScenesDialog={setCreateScenesDialog}
          setUploadScenesDialog={setUploadScenesDialog}
        />
      ) : (
        <section>
          <p className=" text-center md:mt-8">
            Import a screenplay in seconds to create a dynamic breakdown. All elements are
            automatically shared with relevant departments.
          </p>
          <ButtonGroup
            setCreateScenesDialog={setCreateScenesDialog}
            setUploadScenesDialog={setUploadScenesDialog}
            className="mt-36"
          />
        </section>
      )}
      <section>{/* scenes will come here */}</section>

      <CreateScenes openDialog={createScenesDialog} setOpenDialog={setCreateScenesDialog} />
    </div>
  );
};

export default Scenes;
