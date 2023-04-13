import { useAuthValue } from '../firebase/AuthContext'
import { useState, useEffect } from 'react'
import { auth, db, storage } from "../firebase/firebase"
import { update, ref, get } from "firebase/database"
import { useDropzone } from 'react-dropzone'
import { getDownloadURL, ref as sref, uploadBytes } from "firebase/storage";
import { support } from 'jquery'

export function Profile() {

  const { currentUser, setUserData } = useAuthValue()
  const [drag, setDrag] = useState('')
  const [pfp, setPFP] = useState([])
  const [name, setName] = useState('')
  const [major, setMajor] = useState('')
  const [birth, setBirth] = useState('')
  const [phone, setPhone] = useState('')
  const [editMode, isEditMode] = useState(true)
  const [mount, setMount] = useState(false);

  const [training, isTraining] = useState(false)
  const [achieve, setAchieve] = useState("Registered")
  const [next, setNext] = useState()
  const [upcoming, setUpcoming] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!mount) {
      setMount(true)
      get(ref(db, `users/${currentUser?.uid}/`)).then((snapshot) => {
        if (snapshot.val().major || snapshot.val().phone || snapshot.val().pfpName || snapshot.val().name || snapshot.val().year) {
          isEditMode(false)
        }
        setMajor(snapshot.val().major)
        setPhone(snapshot.val().phone)
        if (snapshot.val().pfp && snapshot.val().pfpName) {
          setPFP([{ preview: snapshot.val().pfp, name: snapshot.val().pfpName }])
        }
        setName(snapshot.val().name)
        setBirth(snapshot.val().year)
        isTraining(snapshot.val().training)

        var nextTimeslots = []
        var prevTimeslots = []
        get(ref(db, `users/${currentUser?.uid}/timeslots`)).then((snapshot) => {
          // get(ref(db, `timeslots`).then((snapshot) => {
          //   snapshot.forEach((childSnapshot) => {
          // })
          snapshot.forEach((childSnapshot) => {
            get(ref(db, `timeslots/${childSnapshot.val()}`)).then((snapshot2) => {
              const newDate = new Date(snapshot2.val().date)
              if (newDate.getTime() > (new Date()).getTime()) {
                nextTimeslots.push({
                  date: newDate,
                  id: childSnapshot.key,
                  tId: childSnapshot.val(),
                  url: snapshot2.val().url,
                  // url: snapshot.val().url
                })
                // console.log(snapshot2.child..val().url)
              } else {
                prevTimeslots.push({
                  date: newDate,
                  id: childSnapshot.key,
                  tId: childSnapshot.val(),
                  // url: snapshot.val().url
                })
              }

              nextTimeslots.sort((a, b) => a.date.getTime() - b.date.getTime())
              prevTimeslots.sort((a, b) => b.date.getTime() - a.date.getTime())
              setUpcoming(nextTimeslots.slice(1))
              setNext(nextTimeslots[0])
              setHistory(prevTimeslots)
            })
          })

        })


      })
    }
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setPFP(acceptedFiles.map(pic => Object.assign(pic, {
        preview: URL.createObjectURL(pic),
        changed: true
      })));
    },
    multiple: false
  });

  const submitProfile = e => {
    e.preventDefault()
    if (pfp[0].changed) {
      uploadBytes(sref(storage, "/images/" + currentUser?.uid + "/pfp.jpg"), pfp[0], {
        contentType: 'image/jpg',
      }).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          update(ref(db, "users/" + currentUser?.uid + "/"), {
            pfp: downloadURL,
            pfpName: pfp[0].name,
            name: name,
            phone: phone,
            major: major,
            year: birth,
            profile: true,
          }).then(() => {
            get(ref(db, `users/${currentUser?.uid}`)).then((snapshot) =>{
              setUserData(snapshot.val())
            })
          })
          setPFP([{ preview: downloadURL, name: pfp[0].name }])
          isEditMode(false)
        })
      });
    } else {
      update(ref(db, "users/" + currentUser?.uid + "/"), {
        name: name,
        phone: phone,
        major: major,
        year: birth,
      }).then(() => {
        get(ref(db, `users/${currentUser?.uid}`)).then((snapshot) => {
          setUserData(snapshot.val())
        })
      })
      isEditMode(false)
    }
  };

  const thumbs = pfp.map(pic => (
    <div key={pic.name}>
      <div class="flex flex-col items-center bg-white h-20 w-full border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-fit h-full rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={pic.preview}
          alt={pic.name}
          // style={img}
          onLoad={() => { URL.revokeObjectURL(pic.preview) }}></img>
        <div class="flex flex-col justify-between p-4 leading-normal">
          <p class="text-lg tracking-tight text-gray-900 dark:text-white">{pic.name}</p>
        </div>
        <div class="flex flex-col w-full justify-end items-end p-4 leading-normal">
          <button class="hover:cursor-pointer" onClick={() => setPFP([])}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>


        </div>
      </div>
    </div>
  ));

  const upcomingComponents = upcoming.map(slot => (
    <div class="flex flex-row w-full space-x-5 text-sm items-end border-t border-white py-2">
      <p class="basis-1/5 justify-start text-white">
        Piximo Session
      </p>
      <p class="basis-2/5 justify-start text-white">
        {slot.date.toLocaleDateString()}
      </p>
      <p class="basis-2/5 justify-start text-white">
        {slot.date.toLocaleTimeString()}
      </p>
    </div>
  ))

  const previousComponents = history.map(slot => (
    <div class="flex flex-row w-full space-x-5 text-sm items-end border-t border-black py-2">
      <p class="basis-1/5 justify-start text-black">
        Piximo Session
      </p>
      <p class="basis-2/5 justify-start text-black">
        {slot.date.toLocaleDateString()}
      </p>
      <p class="basis-2/5 justify-start text-black">
        {slot.date.toLocaleTimeString()}
      </p>
    </div>
  ))

  const goDriving = () => {
    currentUser?.getIdToken(true).then(function (idToken) {
      fetch(`http://localhost:3500/api/token/${idToken}/timeslot/${next.tId}`, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3500',
          'Access-Control-Allow-Credentials': 'true'
        }
      })
      .then(res => res.text().then((text) => console.log(text)))
      // .then(
      //   (result) => {
      //     return (
      //       <p>{result}</p>
      //     )
      //   },
      //   // Note: it's important to handle errors here
      //   // instead of a catch() block so that we don't swallow
      //   // exceptions from actual bugs in components.
      //   (error) => {
      //     // setIsLoaded(true);
      //     // setError(error);
      //   }
      // )
    }).catch(error => {
    })
  }

  return (
    <>
      {editMode ? (
        <div class="flex flex-row justify-center">
          <div class="w-full md:mx-12 bg-white rounded-lg border shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
                Complete your Profile
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={submitProfile}>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <label for="pfp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload your profile picture</label>
                  <div class="flex items-center justify-center w-full">
                    <div onDragOver={e => setDrag('border-gray-300')} onDragLeave={e => setDrag('')} class={"flex flex-col rounded-lg border-4 border-dashed hover:border-gray-300 hover:cursor-pointer drag w-full h-30 p-10 group text-center " + drag}>
                      <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                        <p class="pointer-none text-gray-500 ">Drag and drop file here <br /> or <a id="" class="text-primary hover:underline">select a file</a> from your device.</p>
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
                  <input type="phone" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(000) 000-0000" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label for="major" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Major</label>
                  <input type="major" name="major" id="major" value={major} onChange={e => setMajor(e.target.value)} placeholder="Piximistry" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label for="year" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year of birth</label>
                  <input type="year" name="year" id="year" value={birth} onChange={e => setBirth(e.target.value)} placeholder="2023" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>

                {/* <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div> */}
                <button type="submit" class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  {/* Don't have an account? <Link to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</Link> */}
                </p>
              </form>
            </div>
          </div>
        </div>) : (
        <div class="flex flex-col lg:flex-row lg:space-x-4">
          <div class="basis-1/3 space-y-4">
            <div class="py-4 px-6 border rounded-xl">
              <div class="text-center flex flex-row justify-center">

                <img src={pfp[0].preview} alt={pfp[0].name} class="rounded-lg w-20 h-20 object-cover text-center"></img>
              </div>
              <div class="flex flex-row  text-center">
                <p class="text-2xl text-center w-full font-bold my-3">
                  {name}
                </p>
              </div>
              <div class="flex flex-row">
                <p class="basis-1/2">
                  <b>
                    Phone:
                  </b>
                </p>
                <p class="basis-1/2">
                  {phone}
                </p>
              </div>
              <div class="flex flex-row">
                <p class="basis-1/2">
                  <b>
                    Major:
                  </b>
                </p>
                <p class="basis-1/2">
                  {major}
                </p>
              </div>
              <div class="flex flex-row">
                <p class="basis-1/2">
                  <b>
                    Birthday:
                  </b>
                </p>
                <p class="basis-1/2">
                  {birth}
                </p>
              </div>
              <div onClick={() => isEditMode(true)} class="flex flex-row items-center justify-end mt-4 space-x-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

                <p class="font-xs">Edit profile</p>
              </div>
            </div>
          </div>
          <div class="basis-2/3 mt-2 lg:mt-0">
            <div class="flex flex-col lg:flex-row space-y-2 lg:space-x-2 lg:space-y-0 ">
              <div class="rounded-xl border p-3 pl-5 basis-1/2 text-gray-500 text-xs">


                <div class="flex flex-row items-center justify-between">
                  <div>

                    ACHIEVEMENTS
                    <p class="text-black font-bold text-xl  mt-2 mb-2">
                      {achieve}
                    </p>
                  </div>
                  <div class="rounded-2xl items-center justify-center bg-primary flex w-12 h-12">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>

                  </div>
                </div>

              </div>
              <div class="rounded-xl border p-3 pl-5 basis-1/2 text-gray-500 text-xs">


                <div class="flex flex-row items-center justify-between">
                  <div>

                    STATS
                    <p class={`font-bold text-xl  mt-2 mb-2 ${training ? `text-primary` : `text-orange-500`}`}>
                      {training ? "Trained" : "Pending training"}
                    </p>
                  </div>
                  <div class="rounded-2xl items-center justify-center bg-primary flex w-12 h-12">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>


                  </div>

                </div>

              </div>
            </div>
            <div class="mt-2 p-3 pl-5 bg-primary rounded-lg">
              <div class="flex flex-row w-full items-center space-x-5">
                <p class="basis-1/3 lg:basis-1/5 text-white text-lg">
                  Next session
                </p>
                <p class="basis-1/3 lg:basis-2/5 justify-start text-white text-xs">
                  DATE
                </p>
                <p class="basis-1/3 lg:basis-2/5 justify-start text-white text-xs">
                  TIME
                </p>
              </div>
              <div class="flex flex-row justify-start items-center space-x-5 mb-5">
                <p class="basis-1/3 lg:basis-1/5">
                  {next?.url ? (
                    <div class="flex flex-col space-y-2 w-full">
                  <a href={`${next.url}`} target="_blank" class="bg-white flex flex-row items-center space-x-2 rounded-xl text-sm w-20 p-1 pl-2 bg-white text-black hover:bg-gray-100 hover:cursor-pointer">
                    <p>
                      Zoom
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                  <div onClick={goDriving}class="w-full flex flex-row items-center space-x-2 rounded-xl text-sm w-23 p-1 pl-2 bg-white text-black hover:bg-gray-100 hover:cursor-pointer">
                  <p>
                    Driving Portal
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
                    </div>
                  ): <p class="text-white text-sm">Link will show up closer to session time.</p>}
                </p>
                <p class="basis-1/3 lg:basis-2/5 font-bold text-white text-xl lg:text-3xl">
                  {next?.date.toLocaleDateString() ? next.date.toLocaleDateString() : "Nothing scheduled yet."}
                </p>
                <p class="basis-1/3 lg:basis-2/5 text-white text-3xl font-bold">
                  {next?.date.toLocaleTimeString() ? next.date.toLocaleTimeString() : ""}
                </p>
              </div>
              <div class="flex flex-row w-full space-x-5 items-end mb-2">
                <p class="basis-1/3 lg:basis-1/5 text-white text-lg">
                  Upcoming sessions
                </p>
                <p class="basis-1/3 lg:basis-2/5 justify-start text-white text-xs">
                  DATE
                </p>
                <p class="basis-1/3 lg:basis-2/5 justify-start text-white text-xs">
                  TIME
                </p>
              </div>
              {upcomingComponents}
            </div>
            <div class="mt-2 p-3 pl-5 rounded-lg border">
              <div class="flex flex-row w-full items-center justify-end space-x-5">
                <p class="basis-1/3 lg:basis-1/5 text-black text-lg font-bold">
                  Past sessions
                </p>
                <p class="basis-1/3 lg:basis-2/5 justify-start text-black text-xs">
                  DATE
                </p>
                <p class="basis-1/3 lg:basis-2/5 justify-start text-black text-xs">
                  TIME
                </p>
              </div>
              {previousComponents}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
