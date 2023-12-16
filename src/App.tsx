import { cls } from "@/utils/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

function App() {
   return (
      <div
         className={cls(
            {
               "theme-standard": true,
            },
            "bg-background text-foreground h-screen"
         )}
      >
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
