import { LoginForm } from "./components/LoginForm";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <LoginForm />
      <Toaster />
    </div>
  );
}

export default App;