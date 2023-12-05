import { Board } from "@/components/Board";
import { cls } from "@/utils/styles";

function App() {
   return (
      <div
         className={cls(
            {
               "theme-standard": true,
            },
            "bg-background flex h-screen w-screen items-center justify-center"
         )}
      >
         <Board dimensions={8} />
      </div>
   );
}

export default App;
