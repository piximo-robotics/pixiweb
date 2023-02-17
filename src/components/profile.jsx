import { useAuthValue } from '../firebase/AuthContext'
import { useState, useEffect } from 'react'
import { auth } from '../firebase/firebase'
import {db} from "../firebase/firebase"
import {update, ref} from "firebase/database"
import {useDropzone} from 'react-dropzone'

export function Profile() {

  const { currentUser } = useAuthValue()
  const [drag, setDrag] = useState('')
  const [pfp, setPFP] = useState([])
  const [name, setName] = useState('')
  const [major, setMajor] = useState('') 
  const [grad, setGrad] = useState('') 
  const [phone, setPhone] = useState('')

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setPFP(acceptedFiles.map(pic => Object.assign(pic, {
        preview: URL.createObjectURL(pic)
      })));
      console.log(acceptedFiles)
    },
    multiple: false
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    pfp.forEach(pic => URL.revokeObjectURL(pic.preview));
  }, [pfp]);

  const submitProfile = e => {
    e.preventDefault()
    update(ref("users/" + currentUser?.uid + "/"), {

    })
  };

  const thumbs = pfp.map(pfp => (
    <div key={pfp.name}>
      <div>
        <img
          src={pfp.preview}
          alt={pfp.name}
          // style={img}
        />
      </div>
    </div>
  ));

  return (
    <>
      <div class="flex flex-row justify-center">
        <div class="w-full md:mx-12 bg-white rounded-lg border shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
              Complete your Profile
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={submitProfile}>
            <div {...getRootProps({className: 'dropzone'})}>
              <label for="pfp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload your profile picture</label>
                <div class="flex items-center justify-center w-full">
                <div onDragOver={e => setDrag('border-gray-300')} onDragLeave={e => setDrag('')} class={"flex flex-col rounded-lg border-4 border-dashed hover:border-gray-300 hover:cursor-pointer drag w-full h-30 p-10 group text-center " + drag}>
                    <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                      <p class="pointer-none text-gray-500 ">Drag and drop file here <br /> or <a id="" class="text-primary hover:underline">select a file</a> from your computer.</p>
                    </div>
                    <input {...getInputProps()} class="hidden"></input>
                    </div>
                </div>
              </div>
              <aside>
        {thumbs}
      </aside>
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="name" name="name" id="name" value={name} onChange={e => setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Andrew Carnegie" required="" />
              </div>
              <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <input type="phone" name="phone" id="phone"value={phone} onChange={e => setPhone(e.target.value)} placeholder="(000) 000-0000" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label for="major" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Major</label>
                <input type="major" name="major" id="major" value={major} onChange={e => setMajor(e.target.value)}placeholder="Piximistry" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label for="year" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estimated graduation year</label>
                <input type="year" name="year" id="year" value={grad} onChange={e => setGrad(e.target.value)} placeholder="2026" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>

              {/* <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div> */}
              <button type="submit" class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit for verification</button>
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
