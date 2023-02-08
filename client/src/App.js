import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navigation/NavBar";
import Register from "./forms/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Register />
      </header>
    </div>
  );
}

export default App;
