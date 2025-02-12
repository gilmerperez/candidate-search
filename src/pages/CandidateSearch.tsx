// Import useState and useEffect from React
import { useState, useEffect } from 'react';
// Import searchGithub and searchGithubUser from API.tsx
import { searchGithub, searchGithubUser } from '../api/API';
// Import Candidate interface from Candidate.interface.tsx
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // State variable for candidates: Array to store the list of candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // State variable for currentCandidate: Object to store details of the currently displayed candidate
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  // State variable for error: String to store any error messages
  const [error, setError] = useState<string>("");

  // Call the searchGithub function when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Call searchGithub to get the list of users
        const users = await searchGithub();

        // For each user, call searchGithubUser to get the rest of the information
        const detailedUsers = await Promise.all(
          users.map(async (user: { login: string }) => {
            const userDetails = await searchGithubUser(user.login);
            return {
              login: userDetails.login,
              name: userDetails.name,
              avatar_url: userDetails.avatar_url,
              location: userDetails.location,
              email: userDetails.email,
              company: userDetails.company,
              html_url: userDetails.html_url,
            };
          })
        );

        // Update candidates with the list of users and their detailed information
        setCandidates(detailedUsers);
        // Set the first candidate in pipeline to currentCandidate
        if (detailedUsers.length > 0) {
          setCurrentCandidate(detailedUsers[0]);
        }
      } catch (error) {
        // If it cannot find candidate, throw error message
        setError("Failed to fetch candidates");
      }
    };
    
    fetchCandidates();
  }, []);

  return (
    <>
      <h1>Candidate Search</h1>

      {/* Error message if failed to fetch candidate */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Displays current candidate's information */}
      {currentCandidate && (
        <div>
          <h2>{currentCandidate.login || "N/A"}</h2>
          <h3>{currentCandidate.name || "N/A"}</h3>
          <img src={currentCandidate.avatar_url || "N/A"} alt="Avatar" width={100} height={100} />
          <p>Location: {currentCandidate.location || "N/A"}</p>
          <p>Email: {currentCandidate.email || "N/A"}</p>
          <p>Company: {currentCandidate.company || "N/A"}</p>
          <a href={currentCandidate.html_url || "N/A"} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        </div>
      )}

      {/* Move to the next candidate in the candidates array and update currentCandidate with the next candidate's information */}
      <div>
        <button
          onClick={() => {
            const currentIndex = candidates.findIndex(
              (c) => c.login === currentCandidate?.login
            );
            const nextIndex = currentIndex + 1;

            if (nextIndex < candidates.length) {
              setCurrentCandidate(candidates[nextIndex]);
            } else {
              setError("No more candidates available");
            }
          }}>
          Next
        </button>

        {/* Save the current candidate to localStorage. This adds the candidate to a list of saved candidates in SavedCandidates.tsx */}
        <button
          onClick={() => {
            if (currentCandidate) {
              const savedCandidates = JSON.parse(
                localStorage.getItem("savedCandidates") || "[]"
              );
              savedCandidates.push(currentCandidate);
              localStorage.setItem(
                "savedCandidates",
                JSON.stringify(savedCandidates)
              );
            }

            const currentIndex = candidates.findIndex(
              (c) => c.login === currentCandidate?.login
            );
            const nextIndex = currentIndex + 1;

            if (nextIndex < candidates.length) {
              setCurrentCandidate(candidates[nextIndex]);
            } else {
              setError("No more candidates available");
            }
          }}>
          Save
        </button>
      </div>
    </>
  );
};

export default CandidateSearch;
