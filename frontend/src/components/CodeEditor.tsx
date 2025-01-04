import Editor, { useMonaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useEffect, useState } from "react";
import { defaultCode } from "../lib/codeSnippet";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

function CodeEditor() {
  const monaco = useMonaco();
  const [languages, setLanguages] = useState<
    monaco.languages.ILanguageExtensionPoint[]
  >([]);
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [isEdited, setIsEdited] = useState(false);
  const [valueCode, setValueCode] = useState(defaultCode);

  useEffect(() => {
    if (monaco) {
      const allLanguages = monaco.languages.getLanguages();
      setLanguages(allLanguages);
    }
  }, [monaco]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
  };

  //logic
  const shareCode = () => {
    try {
      if (isEdited) {
        // await axiosInstance.post("/", {
        //   code: valueCode,
        //   language: selectedLanguage,
        //   theme: selectedTheme,
        // });
        toast.success("Link code copied successfully!");
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

  return (
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
        <button onClick={shareCode} disabled={!isEdited} className={`${isEdited ? "unsaved" : "saved"}`}>
          <img src="/Share.svg" alt="share" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default CodeEditor;
