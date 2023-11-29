import { Board } from "@/components/Board";

function App() {
   return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-700">
         <Board dimensions={8} />
      </div>
   );
}

export default App;
