import { MainLayout } from "@/layouts/MainLayout";
import { Game } from "@/pages/Game";
import { GameSelect } from "@/pages/GameSelect";
import { MainMenu } from "@/pages/MainMenu";
import { Settings } from "@/pages/Settings";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
   {
      element: <MainLayout />,
      children: [
         {
            path: "/",
            element: <MainMenu />,
         },
         {
            path: "/game-select",
            element: <GameSelect />,
         },
         {
            path: "/game/{height}/{width}",
            element: <Game />,
         },
         {
            path: "/settings",
            element: <Settings />,
         },
      ],
   },
]);
