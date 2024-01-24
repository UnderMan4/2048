import { cls } from "@/utils/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { LazyMotion, domAnimation } from "framer-motion";

function App() {
   return (
      <LazyMotion features={domAnimation} strict>
         <div
            className={cls(
               {
                  "theme-standard": true,
               },
               "h-screen bg-background text-foreground"
            )}
         >
            <RouterProvider router={router} />
         </div>
      </LazyMotion>
   );
}

export default App;
