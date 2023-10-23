import Navigation from "./src/Wrappers/Navigation";
import { AuthProvider } from "./src/Wrappers/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}