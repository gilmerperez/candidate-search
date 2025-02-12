// Import useState and useEffect from React
import { useState, useEffect } from 'react';
// Import Candidate interface from Candidate.interface.tsx
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  // State variable for savedCandidates: Array to store the list of candidates
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load in candidates from localStorage
  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  // Remove candidate function
  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h1>Saved Candidates</h1>

      {/* If there are candidates to show, display the following data */}
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            {/* Table Headings */}
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Avatar</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>GitHub Profile</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Content */}
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>{candidate.login || "N/A"}</td>
                <td>{candidate.name || "N/A"}</td>
                <td><img src={candidate.avatar_url || "N/A"} alt="Avatar" width={50} height={50} /></td>
                <td>{candidate.location || "N/A"}</td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.company || "N/A"}</td>
                <td>{candidate.html_url || "N/A"}</td>
                <td><button onClick={() => candidate.login && removeCandidate(candidate.login)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // If there are no saved candidates, display the following message
        <p>No saved candidates</p>
      )}
    </>
  );
};

export default SavedCandidates;
