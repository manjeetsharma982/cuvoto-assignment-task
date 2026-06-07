import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    templateName: "",
    sector: "",
    content: "",
  });

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("templates");
    if (data) {
      setTemplates(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "templates",
      JSON.stringify(templates)
    );
  }, [templates]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveTemplate = () => {
    if (!form.templateName || !form.content) {
      alert("Please fill required fields");
      return;
    }

    const newTemplate = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toLocaleString(),
    };

    setTemplates([...templates, newTemplate]);

    setForm({
      templateName: "",
      sector: "",
      content: "",
    });
  };

  const filtered = templates.filter((t) =>
    t.templateName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Proposal Template Manager</h1>

      <input
        type="text"
        placeholder="Search Template"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Add Template</h2>

      <input
        name="templateName"
        placeholder="Template Name"
        value={form.templateName}
        onChange={handleChange}
      />

      <input
        name="sector"
        placeholder="Sector"
        value={form.sector}
        onChange={handleChange}
      />

      <textarea
        name="content"
        rows="5"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
      />

      <button onClick={saveTemplate}>
        Save Template
      </button>

      <h2>Template List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Created</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.templateName}</td>
              <td>{item.sector}</td>
              <td>{item.createdAt}</td>
              <td>
                <button
                  onClick={() => setSelected(item)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="modal">
          <h3>{selected.templateName}</h3>
          <p>
            <strong>Sector:</strong>{" "}
            {selected.sector}
          </p>
          <p>{selected.content}</p>
          <button
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;