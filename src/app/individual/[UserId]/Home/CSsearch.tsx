'use client';

import React, { useState } from 'react';

function UH({params,}:{params:{userID: number }}) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const getusers = async() => {
    setIsLoading(true);
    try {
        const response = await fetch('/api/SearchUsers');
        const data = await response.json();
        setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(params.userID)

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={getusers} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
      <br />

      <br />
      Welcome User {params.userID}
      <div>
        <h1>User List</h1>
        {/* <ul>
          {results.map((result, index) => (
            <li key={index}>
              {JSON.stringify(result)}
            </li>
          ))}
        </ul> */}
        <br />
        <ul>
         {results.map((result, index) => (
          <li key={index}> {result} </li>
         ))}
         </ul>  
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default UH;