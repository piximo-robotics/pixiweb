import React from "react";
import { Outlet, Link } from "react-router-dom";

export function CTA({ fixed }) {
  return (
    <>
      <div id="CTA" class="border flex flex-col py-10 justify-center items-center text-center mx-10 lg:mx-20 lg:my-10 h-40 rounded-xl text-xl space-y-5">
        <h1 class="text-3xl font-bold">Ready to sign up?</h1>
        <Link className="flex justify-center text-md leading-snug text-white hover:opacity-75 font-light" to="/signup"><button class="rounded-xl bg-primary px-7 py-2">Sign up</button>
            </Link>
      </div>
    </>
  );
}