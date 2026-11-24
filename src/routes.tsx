import { createBrowserRouter, type RouteObject } from "react-router";
import { GroupPage } from "./pages/GroupPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";

export const routes: RouteObject[]= [
  {
    path: '/', element: <HomePage />
  },
  {
    path: 'groupes/:groupId', element: <GroupPage />
  },
  {
    path: '*', element: <NotFoundPage />
  }  
]

export const router = createBrowserRouter(routes);