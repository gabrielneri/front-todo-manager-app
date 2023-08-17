import "./App.css";
import RoutesApp from "./routes/index";
import { AuthProvider } from "./contexts/auth";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </div>
  );
}

export default App;
