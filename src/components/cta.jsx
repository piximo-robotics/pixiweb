import React from "react";

export function CTA({ fixed }) {
  return (
    <>
      <div id="CTA" class="border flex flex-col py-10 justify-center items-center text-center mx-20 my-10 h-40 rounded-xl text-xl space-y-5">
        <h1 class="text-3xl font-bold">Ready to sign up?</h1>
        <a
                    className="flex justify-center text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                    href="#sign-up"
                  ><button class="rounded bg-primary px-3 py-1">Sign up</button>
            </a>
      </div>
    </>
  );
}