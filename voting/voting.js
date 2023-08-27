import { db } from "../config.js";
import { getDocs, getDoc, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const baseUrl = "http://16.16.88.130:5600"

async function fetchCandidatesFromServer() {
  const candidatesCollection = collection(db, 'candidates');
  const querySnapshot = await getDocs(candidatesCollection);

  const candidates = [];

  querySnapshot.forEach((doc) => {
    candidates.push({
      id: doc.id,
      data: doc.data()
    });
  });

  return candidates;
}

function fetchCandidates() {
  fetchCandidatesFromServer()
      .then(data => {
        // Loop through each candidate and update the DOM
        data.forEach(candidate => {
          const candidateDiv = document.createElement('div');
          candidateDiv.className = 'candidate';
          console.log(candidate)
          const candidateDetailsDiv = document.createElement('div');
          candidateDetailsDiv.className = 'candidate-details';
  
          const candidateNameDiv = document.createElement('div');
          candidateNameDiv.className = 'candidate-name';
          candidateNameDiv.textContent = candidate.data.title;
  
          const voteCountDiv = document.createElement('div');
          voteCountDiv.className = 'vote-count';
          voteCountDiv.innerHTML = `Votes: <span id="votes${candidate.data.id}">${candidate.data.votes}</span>`;
  
          candidateDetailsDiv.appendChild(candidateNameDiv);
          candidateDetailsDiv.appendChild(voteCountDiv);
  
          const voteButton = document.createElement('button');
          voteButton.className = 'vote-button';
          voteButton.textContent = 'Vote';
          voteButton.onclick = () => incrementVotes(candidate.id);
  
          candidateDiv.appendChild(candidateDetailsDiv);
          candidateDiv.appendChild(voteButton);
  
          document.querySelector('.container').appendChild(candidateDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
      });
  }
  
  async function incrementVotes(candidateId) {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, data: doc.data() });
    });

    const user = users.find((user) => {
      return user.id == localStorage.getItem('userId')
    });

    if (user) {
      if (user.data.voted) {
        alert("you already voted");
        return;
      }
    } else {
      alert("user not found, please logout and login again");
      return;
    }

    console.log(candidateId)
    const candidateRef = doc(db, 'candidates', candidateId);
    const userRef = doc(db, 'users', user.id);
  
    try {
      // Get the current candidate data
      const candidateDoc = await getDoc(candidateRef);
  
      if (candidateDoc.exists()) {
        var currentVotes = candidateDoc.data().votes || 0;
        // console
        currentVotes += 1;
  
        // Update the votes property
        await updateDoc(candidateRef, { votes: currentVotes });
        await updateDoc(userRef, { voted: true });
  
        console.log('Votes updated successfully.');
      } else {
        console.log('Candidate not found.');
      }
    } catch (error) {
      console.error('Error updating votes:', error);
    }
  }

  function addLogoutEventListener() {
    const logoutButton = document.querySelector(".logout");
    console.log(logoutButton)

    logoutButton.onclick = () => {
        localStorage.removeItem("token");
        window.location.replace('../index.html')
    }
  }

  document.addEventListener("DOMContentLoaded", function () {  
    fetchCandidates();
    addLogoutEventListener();
  })