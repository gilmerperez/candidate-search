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
  const [error, setError] = useState<string>('');

  // Use `useEffect` to call the `searchGithub` function when the component mounts
  useEffect(() => {
    // Inside the `useEffect`, handle the following:
    const fetchCandidate = async () => {
      try {
        // Call searchGithub to get the list of users
        const users = await searchGithub();

        // For each user, call searchGithubUser to get the rest of the information
        const detailedUsers = await Promise.all(
          users.map(async (user: any) => {
            const userDetails = await searchGithubUser(user.login);
            return {
              login: user.login,
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
        setCandidates(detailedUsers[0]);
      } catch (err) {
        // If it cannot find candidate, throw error message
        setError("failed to fetch candidates");
      }
    };
    fetchCandidate();
  }, []);

  return (
  // Display the current candidate's information. Show a "Next" button to go to the next candidate. Show a "Save" button to save the current candidate

  // Handle "Next" button click: Move to the next candidate in the `candidates` array. Update `currentCandidate` with the next candidate's data

  // Handle "Save" button click: Save the current candidate to localStorage. Optionally, add the candidate to a list of "saved" candidates for later viewing

  // Handle errors (if any): If `searchGithub` or `searchGithubUser` fails, set an appropriate error message in the `error` state. Display the error message to the user if there is an error

  // Render the UI: Display the candidate's details, buttons, and loading/error states
    <>
    <h1>Candidate Search</h1>
    </>
  );
};

export default CandidateSearch;
