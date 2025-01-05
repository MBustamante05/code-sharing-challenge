import "./App.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useEffect, useState } from "react";
import { defaultCode } from "./lib/codeSnippet";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "./lib/axiosInstance";
import { useParams } from "react-router-dom";

function App() {
  const { sharedId } = useParams();

  const monaco = useMonaco();
  const [languages, setLanguages] = useState<
    monaco.languages.ILanguageExtensionPoint[]
  >([]);
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [isEdited, setIsEdited] = useState(true);
  const [valueCode, setValueCode] = useState(defaultCode);
  const [codeId, setCodeId] = useState("");

  useEffect(() => {
    if (monaco) {
      const allLanguages = monaco.languages.getLanguages();
      setLanguages(allLanguages);
    }
  }, [monaco]);

  useEffect(() => {
    if (sharedId) {
      (async () => {
        try {
          const res = await axiosInstance.get(`/${sharedId}`);
          setValueCode(res.data.code);
          setSelectedLanguage(res.data.language);
          setSelectedTheme(res.data.theme);
          setIsEdited(false);
          console.log(res.data);  
        } catch (err) {
          console.error(err);
          toast.error("Failed to load the shared code!");
        }
      })();
    }
  }, [sharedId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
  };

  //logic
  const shareCode = async () => {
    try {
      if (isEdited) {
        const res = await axiosInstance.post("/", {
          code: valueCode,
          language: selectedLanguage,
          theme: selectedTheme,
        });
        if(sharedId){
          setCodeId(sharedId);
        }else{
          setCodeId(res.data.id);
        }
        toast.success("Link generated successfully, you can share it!");
        setIsEdited(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while sharing the code!");
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setValueCode(value);
      setIsEdited(value !== defaultCode);
    }
  };

  const handleCopyLink = () => {
    const fullLink = `${window.location.origin}/${codeId}`;
    navigator.clipboard
      .writeText(fullLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy the link!");
      });
  };
  return <div className="background">
    <div className="container">
      <img src="/NoteCodeLogo.svg" alt="NoteCode logo" />
      <h2>Create & Share</h2>
      <h1>Your code easily</h1>

      <div className="editor">
      <Toaster position="top-right" />
      <Editor
        options={{
          padding: { top: 20, bottom: 20 },
        }}
        height="57vh"
        defaultLanguage={selectedLanguage}
        value={valueCode}
        theme={selectedTheme}
        onChange={handleCodeChange}
      />
      <div className={`options ${selectedTheme}`}>
        <div className="select">
          <select value={selectedLanguage} onChange={handleChange}>
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.id === "html" ? "HTML" : language.id}
              </option>
            ))}
          </select>
          <select name="theme" onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="vs-dark">Dark</option>
          </select>
        </div>
        <div className="share">
          {!isEdited && (
            <div className="link" onClick={handleCopyLink}>
            <img src="/link.svg" alt="link" />
            {sharedId ? (
              <p>{`.../${sharedId}`}</p>
            ) : (
              <p>{`.../${codeId}`}</p>
            )}
          </div>
          )}

          <button
            onClick={shareCode}
            disabled={!isEdited}
            className={`${isEdited ? "unsaved" : "saved"}`}
          >
            <img src="/Share.svg" alt="share" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>;
}

export default App;
