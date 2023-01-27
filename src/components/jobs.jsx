import React from "react";

export function Jobs({ fixed }) {
  return (
    <>
      <div id="jobs" class="flex flex-col lg:flex-row items-center justify-between text-right mb-10 mx-20 mb-10">
        <div class="col-span-6 w-1/2">
        <iframe src="https://snazzymaps.com/embed/457662" class="w-full h-96 rounded-xl"></iframe>
        </div>
        <div class="px-50 lg:col-span-5 w-2/5 space-y-2 mr-10">
        <p class="uppercase font-bold text-xs">Available Jobs</p>
          <h1 class="text-5xl font-bold">Carnegie Mellon</h1>
          <h1 class="text-5xl font-bold text-primary">University</h1>
          <h1 class="text-md">As a CMU start-up made by students, we are offering Pixi at limited times to CMU students as part of our initial robot tests. Join us to earn prizes like: </h1>
        </div>
      </div>
    </>
  );
}