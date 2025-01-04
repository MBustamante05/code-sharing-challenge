import "./App.css";
import CodeEditor from "./components/CodeEditor";

function App() {
  return <div className="background">
    <div className="container">
      <img src="/NoteCodeLogo.svg" alt="NoteCode logo" />
      <h2>Create & Share</h2>
      <h1>Your code easily</h1>

      <CodeEditor />
    </div>
  </div>;
}

export default App;
