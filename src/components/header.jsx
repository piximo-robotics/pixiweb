import React from "react";

export function Header({ fixed }) {
  return (
    <>
      <div id="header" class="flex flex-col lg:flex-row items-center justify-between h-50 pb-5">
        <div class="lg:col-span-6 mx-20 space-y-3">
          <div class="flex flex-row flex-start space-x-2">
            <h1 class="text-7xl font-bold">Hi, I'm</h1>
            <h1 class="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary">
              Pixi.
            </h1>
          </div>
          <h2 class="text-wrap text-xl"> We need drivers like <b>you</b> to drive Pixi around CMU in exchange for rewards. All it takes is your keyboard and a few minutes.</h2>
          <div class="flex flex-row items-center space-x-5">
            <a
                    className="flex text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                    href="#sign-up"
                  ><button class="rounded bg-primary px-3 py-1 m-auto">Sign up</button>
            </a>
            <a
                    className="flex text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                    href="#demo"
                  >See a demo
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>



            </a>
          </div>

        </div>
        <div class="lg:col-span-6 mx-20 justify-start">
       
          <img src={require("../img/blink.gif")} class="rounded-2xl my-5" alt="Blinking Piximo."></img>
        </div>
      </div>
    </>
  );
}