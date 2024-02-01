import { useState } from "react";
import "./App.css";
import ThemeToggleButton from "./ThemeToggleButton";

function App() {
  const [language, setLanguage] = useState("English");
  const [topic, setTopic] = useState("");
  const [bars, setBars] = useState(12);
  const [style, setStyle] = useState("");
  const [features, setFeatures] = useState("");
  const [rhymeScheme, setRhymeScheme] = useState("ABAB");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateLyrics = async () => {
    if (topic === "" || style === "" || features === "") {
      alert("Please fill in all the fields");
      return;
    }
    setIsLoading(true);
    const url = "https://api.getknit.ai/v1/router/run";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTExMzg3OTI2NjIzNzA4NTA5NDk3In0sImlhdCI6MTcwNjc2MzM1NSwiZXhwIjoxNzA3ODQzMzU1fQ.hngTJmHGU7zV1hnNE1PtKPRVl-sDrP7XoXGGVtRPbHU",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "Imagine you are a rap artist who can write catchy and clever rap lyrics on any topic in any language. You can use rhyme, rhythm, wordplay, metaphors, similes, alliteration, assonance, and other poetic devices to create your verses. You can also use slang, humor, references, and cultural expressions to make your rap lyrics more appealing and relevant. You can write rap lyrics in any style, such as hip hop, trap, drill, grime, etc.",
          },
          {
            role: "user",
            content:
              "I want to write rap lyrics in {{language}} about {{topic}}. It should be {{length}} lines long and {{style}} in tone. It should also have {{features}} that make it stand out and memorable. It should follow the {{rhyme scheme}} pattern for each verse. Please generate rap lyrics in {{language}} about the topic along with the title and the chorus. Provide the output in a code block with the following format: The first line should have the title of the rap song in quotation marks (e.g., “My Rap Song”) The next lines should have the chorus of the rap song, which is the part that repeats after every verse (e.g., This is the chorus of my rap song) The next lines should have the verses of the rap song, which are the main parts that tell the story or convey the message of the rap song (e.g., This is the first verse of my rap song) The last line should have the features, tone, rhyme scheme, and language of the rap song in a comment (e.g., # Rhyming, witty, and humorous, AABA, English)",
          },
        ],
        model: {
          name: "openai/gpt-4",
        },
        variables: [
          {
            name: "language",
            value: language,
          },
          {
            name: "topic",
            value: topic,
          },
          {
            name: "length",
            value: bars,
          },
          {
            name: "style",
            value: style,
          },
          {
            name: "features",
            value: features,
          },
          {
            name: "rhyme scheme",
            value: rhymeScheme,
          },
        ],
      }),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error(`Error! status: ${response.status}`);
        }
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        setResponse(data.responseText);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="fixed top-0 left-0 w-full rounded-b-lg border variant-glass-surface border-[white] flex items-center">
        <h3 className="font-bold text-2xl font-sans m-2 mx-6">Lyra: Rap like a star</h3>
        <div className="absolute right-2">
        <ThemeToggleButton
          onToggle={() => {
            document.querySelector("html")?.classList.toggle("dark");
          }}
        />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 lg:h-screen md:h-screen lg:w-[75vw] md:w-[75vw] w-full">
        <div className="card p-4 m-2 lg:h-[90vh] md:h-[90vh] mt-16 variant-ghost-surface overflow-auto">
          <label className="label">
            <span>Language</span>
            <select
              className="select"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
            </select>
          </label>
          <label className="label mt-4">
            <span>Topic</span>
            <input
              className="input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic"
            />
          </label>
          <label className="label mt-4">
            <span>Bars</span>
            <input
              className="input"
              type="number"
              value={bars}
              min={2}
              max={20}
              onChange={(e) => setBars(parseInt(e.target.value))}
              placeholder="Bars"
            />
          </label>
          <label className="label mt-4">
            <span>Style</span>
            <input
              className="input"
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="Style"
            />
          </label>
          <label className="label mt-4">
            <span>Features</span>
            <input
              className="input"
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Features"
            />
          </label>
          <label className="label mt-4">
            <span>Rhyme Scheme</span>
            <select
              className="select"
              onChange={(e) => setRhymeScheme(e.target.value)}
            >
              <option value="ABAB">ABAB</option>
              <option value="AABB">AABB</option>
              <option value="ABBA">ABBA</option>
              <option value="ABCB">ABCB</option>
              <option value="AABA">AABA</option>
            </select>
          </label>
          {!isLoading && (
            <button
              className="btn variant-filled mt-4"
              onClick={() => generateLyrics()}
            >
              Generate
            </button>
          )}
          {isLoading && (
            <button className="btn variant-filled mt-4" disabled>
              Generating...
            </button>
          )}
          <label className="label mt-4">Predefined Variables (Feel free to modify)</label>
          <button className="btn variant-ghost-surface mt-2 mx-1" onClick={() => {
            setTopic("Making money");
            setStyle("boastful and flashy");
            setFeatures("slang, metaphors, and alliteration");
          }}>Making Money</button>
          <button className="btn variant-ghost-surface mt-2 mx-1" onClick={() => {
            setTopic("love and heartbreak");
            setStyle("emotional and bitter");
            setFeatures("similes, wordplay, and assonance");
          }}>Love & Heartbreak</button>
          <button className="btn variant-ghost-surface mt-2 mx-1" onClick={() => { 
            setTopic("politics");
            setStyle("angry and rebellious");
            setFeatures("references, metaphors, and alliteration");
          }}>Politics</button>
          <button className="btn variant-ghost-surface mt-2 mx-1" onClick={() => {
            setTopic("partying");
            setStyle("fun and upbeat");
            setFeatures("slang, humor, and cultural expressions");
          }}>Partying</button>
          <button className="btn variant-ghost-surface mt-2 mx-1" onClick={() => {
            setTopic("social issues");
            setStyle("serious and thoughtful");
            setFeatures("references, metaphors, and wordplay");
          }}>Social Issues</button>
          <button className="btn variant-ghost-surface mt-2 mx-1" onClick={() => {
            setTopic("Dissing Haters");
            setStyle("aggressive and confident");
            setFeatures("insults, bragging and boasting");
          }}>Dissing Haters</button>
          <button className="btn variant-ghost-surface mt-2 mx-1" onClick={() => {
            setTopic("Celebrating Success");
            setStyle("joyful and proud");
            setFeatures("rhyme, repetition, and references");
          }}>Celebrating Success</button>
          <button className="btn variant-ghost-surface mt-2 mx-1" onClick={() => {
            setTopic("Challenging Rivals");
            setStyle("competitive and fierce");
            setFeatures("rhyme, metaphors and wordplay");
          }}>Challenging Rivals</button>
        </div>
        <div className="card p-4 m-2 lg:h-[90vh] md:h-[90vh] lg:mt-16 md:mt-16 variant-ghost-surface">
          <label className="label">
            <span>Results</span>
            <textarea className="textarea" value={response} rows={30} />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
