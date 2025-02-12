// Import useState and useEffect from React
import { useState, useEffect } from 'react';
// Import searchGithub and searchGithubUser from API
import { searchGithub, searchGithubUser } from '../api/API';

// Interface for Candidate Object
interface Candidate {
  login?: string;
  name?: string;
  avatar_url?: string;
  location?: string;
  email?: string | null;
  company?: string | null;
  html_url?: string;
}

const CandidateSearch = () => {
  // Define state variables for candidates: Array to store the list of candidates 
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // Define state variables for currentCandidate: Object to store details of the currently displayed candidate
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  // Define state variables for error: String to store any error messages
  const [error, setError] = useState<string>("");

  // Use `useEffect` to call the `searchGithub` function when the component mounts
  useEffect(() => {
    // Inside the `useEffect`, handle the following:
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
      } catch (err) {
        // If it cannot find candidate, throw error message
        setError("failed to fetch candidates");
      }
    };

    fetchCandidates();
  }, []);

  {/* Display the current candidate's information */}
  return (
    <>
    <h1>Candidate Search</h1>

    {/* Error message if failed to fetch */}
    {error && <p style={{ color: "red" }}>{error}</p>}

    {/* Current Candidate Info */}
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

      {/* Next Button: Move to the next candidate in the `candidates` array. Update `currentCandidate` with the next candidate's data */}
      <div>
        <button
          onClick={() => {
            const currentIndex = candidates.findIndex((c) => c.login === currentCandidate?.login);
            const nextIndex = currentIndex + 1;

            if (nextIndex < candidates.length) {
              setCurrentCandidate(candidates[nextIndex]);
            } else {
              setError("No more candidates available");
            }
          }}>
          Next
        </button>

        {/* Save Button: Save the current candidate to localStorage. Optionally, add the candidate to a list of "saved" candidates for later viewing */}
        <button
          onClick={() => {
            if (currentCandidate) {
              const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
              savedCandidates.push(currentCandidate);
              localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
            }

            const currentIndex = candidates.findIndex((c) => c.login === currentCandidate?.login);
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
