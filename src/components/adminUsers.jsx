import { useAuthValue } from '../firebase/AuthContext'
import { useState, useEffect } from 'react'
import { auth, db } from "../firebase/firebase"
import { get, ref } from "firebase/database"
import Datepicker from "tailwind-datepicker-react"
import { connectStorageEmulator } from 'firebase/storage'
export function ViewUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    get(ref(db, 'users/')).then((snapshot) => {
      var userTemp = []
      snapshot.forEach((childSnapshot) => {
        // get(ref(db, `users/${childSnapshot.val().uid}`)).then((snapshot2) => {
        //   var timeslotTemp = []
        //   snapshot2.forEach((childSnapshot2) => {
        //     get(ref(db, `timeslots/${childSnapshot2.val()}`)).then((snapshot3) => {
        //       timeslotTemp.push(snapshot3.val())
        //     })
        //   })
        //   childSnapshot.val().timeslots = timeslotTemp
        // })
        userTemp.push(childSnapshot.val())
        if (userTemp !== users) {
          setUsers(userTemp)
        }
      })
    })
  })

  const usersComponent = users?.map((user) => (
    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {user.name}
    </th>
    <td class="px-6 py-4">
      {user.uid}
    </td>
    <td class="px-6 py-4">
      {user.email}
    </td>
    <td class="px-6 py-4">
      {user.major}
    </td>
    <td class="px-6 py-4">
      {user.phone}
    </td>
    <td class="px-6 py-4">
     <a href={`${user.pfp}`} target="_blank" class="font-medium text-primary dark:text-blue-500 hover:underline">Link</a>
    </td>
    <td class="px-6 py-4">
     {user.year}
    </td>
    <td class="px-6 py-4">
     {user.training? "Trained" : "Not trained"} 
    </td>
    <td class="px-6 py-4">
     {user.verified? "Verified" : "Not verified"}
    </td>
  </tr>
  ))

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-black dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                User ID
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Major
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                PFP
              </th>
              <th scope="col" class="px-6 py-3">
                Year
              </th>
              <th scope="col" class="px-6 py-3">
                Trained
              </th>
              <th scope="col" class="px-6 py-3">
                Verified
              </th>
            </tr>
          </thead>
          <tbody>
           {usersComponent}
          </tbody>
        </table>
      </div>
    </>
  );


}