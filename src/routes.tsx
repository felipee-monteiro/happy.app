import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import React from 'react'
import Landing from './pages/landing'
import OrfanateMap from './pages/orfanates'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/app',
    element: <OrfanateMap />
  },
  {
    path: '/orphanages/create',
    element: <CreateOrphanage />
  },
  {
    path: '/orphanages/:id',
    element: <Orphanage />
  }
]);

function Routes (props: any) {
  return (
    <RouterProvider router={router} />
  )
}

export default Routes