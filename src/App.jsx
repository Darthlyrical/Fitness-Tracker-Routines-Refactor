import ActivitiesPage from "./activities/ActivitiesPage"

import { Routes, Route} from "react-router"
import Layout from "./layout/Layout"
import Login from "./auth/Login"
import Register from "./auth/Register"
import ActivityDetails from "./activities/ActivityDetails"

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<ActivitiesPage/>}/>
        <Route path='/activities' element={<ActivitiesPage/>}/>
        <Route path='/activities/:id' element={<ActivityDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Route>
    </Routes>

  )
}
