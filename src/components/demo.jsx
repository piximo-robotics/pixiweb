import React from "react";

export function Demo({ fixed }) {
  return (
    <>
      <div id="demo" class="relative flex flex-col items-end text-right justify-end h-auto mb-10 mx-10 lg:mx-20 rounded-xl bg-black ">
        <video autoPlay loop muted class="relative top-0 w-auto max-w-full mb--5 rounded-xl brightness-75">
          <source src={require("../videos/demo.mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div class="hidden lg:block absolute px-50 z-30 lg:col-span-5 w-2/5 space-y-2 mr-10 mb-10">
          <h1 class="text-5xl font-bold text-white">A demo of Pixi.</h1>
          <h1 class="text-md text-white">The only thing you need to guide Pixi are the W, A, S, D keys. In this video you can see Pixi at Saxby's a local Pittsburgh coffee shop. Pixi is delivering some samples to Saxby's customers.</h1>
        </div>
      </div>
      <div class="lg:hidden flex flex-col px-50 z-30 lg:col-span-5 space-y-2 mx-10 mb-10 items-center text-center">
          <h1 class="text-5xl font-bold text-black">A demo of Pixi.</h1>
          <h1 class="text-md text-black">The only thing you need to guide Pixi are the W, A, S, D keys. In this video you can see Pixi at Saxby's a local Pittsburgh coffee shop. Pixi is delivering some samples to Saxby's customers.</h1>
        </div>
    </>
  );
}