import { createBrowserRouter, type RouteObject } from "react-router";
import { GroupPage } from "./pages/GroupPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";

export const routes: RouteObject[]= [
  {
    element: <Layout />, children: [
      {
        index: true, element: <HomePage />
      },
      {
        path: 'groupes/:groupId', element: <GroupPage />
      },
      {
        path: '*', element: <NotFoundPage />
      }  
    ]
  },
]

export const router = createBrowserRouter(routes);