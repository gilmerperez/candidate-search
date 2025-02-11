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
  // Inside the `useEffect`, handle the following:
  // Call `searchGithub` to get a list of users
  // For each user in the list, call `searchGithubUser` to get detailed info
  // Update `candidates` with the list of users and their detailed information
  // Set the first candidate as the `currentCandidate`

  // Display the current candidate's information. Show a "Next" button to go to the next candidate. Show a "Save" button to save the current candidate

  // Handle "Next" button click: Move to the next candidate in the `candidates` array. Update `currentCandidate` with the next candidate's data

  // Handle "Save" button click: Save the current candidate to localStorage. Optionally, add the candidate to a list of "saved" candidates for later viewing

  // Handle errors (if any): If `searchGithub` or `searchGithubUser` fails, set an appropriate error message in the `error` state. Display the error message to the user if there is an error

  // Render the UI: Display the candidate's details, buttons, and loading/error states
  return (
    <>
    <h1>Candidate Search</h1>
    </>
  );
};

export default CandidateSearch;
