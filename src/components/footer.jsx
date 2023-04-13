import React from "react";
import { Privacy } from "../pages/privacy";
import { Terms } from "../pages/terms";
import { Link } from 'react-router-dom'

export function Footer({ fixed }) {
  return (
    <>
      <footer class="p-4 lg:mt-10 bg-white rounded-lg shadow md:flex md:items-center md:justify-between lg:p-6">
        <hr class="hidden lg:inline"></hr>
        <p class="text-sm mt-2 lg:mt-0 text-gray-500 text-center ml-auto mr-auto">© 2023 <a href="https://piximo.com/" class="hover:underline">Piximo™</a>. All Rights Reserved. <Link class="font-medium text-primary-500 hover:underline dark:text-primary-500" rel="noopener noreferrer" target="_blank" to="/terms">Terms and Conditions</Link> and <Link class="font-medium text-primary-500 hover:underline dark:text-primary-500" rel="noopener noreferrer" target="_blank" to="/privacy">Privacy Policy</Link>
        </p>
      </footer>
    </>
  );

}
