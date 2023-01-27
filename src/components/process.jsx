import React from "react";

export function Process({ fixed }) {
  return (
    <>
      <div id="process" class="flex flex-col lg:flex-row text-right mx-10">
        <div class="col-span-6 w-1/2 rounded-xl m-3 flex flex-col">
          <div class="container mx-auto  flex max-w-3xl flex-wrap justify-center rounded-xl">
            <h1 class="font-bold text-2xl justify-left mb-6">Registration process</h1>
            <div class="mt-8 max-w-sm md:mt-0 md:ml-10 md:w-2/3">
              <div class="relative flex pb-12">
                <div class="absolute inset-0 flex h-full w-10 items-center justify-center">
                  <div class="pointer-events-none h-full w-1 bg-gray-200"></div>
                </div>
                <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-black">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 1</h2>
                  <p class="leading-relaxed">
                  Fill out our registration form (CMU ID photo required).
                  </p>
                </div>
              </div>
              <div class="relative flex pb-12">
                <div class="absolute inset-0 flex h-full w-10 items-center justify-center">
                  <div class="pointer-events-none h-full w-1 bg-gray-200"></div>
                </div>
                <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-black">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 2</h2>
                  <p class=" leading-relaxed">Verify your email.</p>
                </div>
              </div>
              <div class="relative flex pb-12">
                <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-black">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 3</h2>
                  <p class=" leading-relaxed">
                    Get approved within 24 hours to start driving Pixi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-6 w-1/2 rounded m-3 flex flex-col">
          <div class="container mx-auto  flex max-w-3xl flex-wrap justify-center rounded-xl ">
            <h1 class="font-bold text-2xl justify-left mb-6">Driving process</h1>
            <div class="mt-8 max-w-sm md:mt-0 md:ml-10 md:w-2/3">
              <div class="relative flex pb-12">
                <div class="absolute inset-0 flex h-full w-10 items-center justify-center">
                  <div class="pointer-events-none h-full w-1 bg-gray-200"></div>
                </div>
                <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-black">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 1</h2>
                  <p class="leading-relaxed">
                    View/Register for timeslots.
                  </p>
                </div>
              </div>
              <div class="relative flex pb-12">
                <div class="absolute inset-0 flex h-full w-10 items-center justify-center">
                  <div class="pointer-events-none h-full w-1 bg-gray-200"></div>
                </div>
                <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-black">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 2</h2>
                  <p class=" leading-relaxed">Recieve a notification during timeslot if a Pixi is available.</p>
                </div>
              </div>
              <div class="relative flex pb-12">
                <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-black">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 3</h2>
                  <p class=" leading-relaxed">
                    Click on the link in the notification to start driving!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}