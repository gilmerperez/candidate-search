// Import useState and useEffect from React
import { useState, useEffect } from 'react';

// Interface for Candidate Object
interface Candidate {
  name?: string;
  username?: string;
  location?: string;
  avatar_url?: string;
  email?: string | null;
  html_url?: string;
  company?: string | null;
}

const SavedCandidates = () => {
  // State variable for savedCandidates
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // useEffect to load in candidates from localStorage
  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  // Remove candidate function
  const removeCandidate = (username: unknown) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.username !== username);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h1>Potential Candidates</h1>

      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>username</th>
              <th>Location</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.username}>
                <td>{candidate.name || "N/A"}</td>
                <td>{candidate.username}</td>
                <td>{candidate.location || "N/A"}</td>
                <td>
                  <img src={candidate.avatar_url} alt="Avatar" width={50} height={50} />
                </td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.company || "N/A"}</td>
                <td>
                  <button onClick={() => removeCandidate(candidate.username)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates.</p>
      )}
    </>
  );
};

export default SavedCandidates;
