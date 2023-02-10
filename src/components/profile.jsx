import { useAuthValue } from '../firebase/AuthContext'
import { useState, useEffect } from 'react'
import { auth } from '../firebase/firebase'

export function Profile() {

  const { currentUser } = useAuthValue()

  return (
    <>
      <div class="flex flex-row justify-center">
        <div class="w-full md:mx-12 bg-white rounded-lg border shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
              Edit your Profile
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="pfp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload your profile picture</label>
                <div class="flex items-center justify-center w-full">
                <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-30 p-10 group text-center">
                    <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                      <p class="pointer-none text-gray-500 ">Drag and drop file here <br /> or <a id="" class="text-primary hover:underline">select a file</a> from your computer.</p>
                    </div>
                    <input type="file" name="pfp" id="pfp" class="hidden"></input>
                    </label>
                </div>
              </div>
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Andrew Carnegie" required="" />
              </div>
              <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <input type="phone" name="phone" id="phone" placeholder="(000) 000-0000" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label for="major" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your major</label>
                <input type="major" name="major" id="major" placeholder="Piximistry" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label for="year" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your estimated graduation year</label>
                <input type="year" name="year" id="year" placeholder="2026" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>

              {/* <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div> */}
              <button type="submit" class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                {/* Don't have an account? <Link to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</Link> */}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
