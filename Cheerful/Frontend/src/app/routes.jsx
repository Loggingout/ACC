import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomepagePage from "../pages/HomepagePage";
import MenuPage from "../pages/MenuPage";
import CaterPage from "../pages/CaterPage";
import ReviewsPage from "../pages/ReviewsPage";
import Universal404Page from "../components/feedback/universal404Page";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomepagePage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "catering-page", element: <CaterPage /> },
      { path: "review-page", element: <ReviewsPage /> },
      { path: "*", element: <Universal404Page /> },
    ],
  },
]);

export default routes;