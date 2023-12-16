import { FC } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
   return (
      <div className={"flex h-full w-full items-center justify-center"}>
         <Outlet />
      </div>
   );
};
