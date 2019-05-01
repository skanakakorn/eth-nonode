pragma solidity ^0.4.25;

import "./Ownable.sol";

contract Vote is Ownable {

    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] candidates;

    // Add Candidate to an Array with specific name
    // Only Owner of a Contract can do that
    function addCandidate(string _name)
        public
        onlyOwner
    {
        candidates.push(Candidate(_name, 0));
    }

    // Increase voteCount for Candidate found by index
    function voteFor(uint _index) 
        public
    {
        // Check if variable voteCount doesn't overflow
        assert((candidates[_index].voteCount + 1) >= candidates[_index].voteCount);

        // Increate voteCount for a Candidate
        candidates[_index].voteCount++;
    }

    // Update Candidate's name
    // Modifier to check if index is valid
    function updateCandidate(uint _index, string _updatedName)
        public
        onlyOwner
        candidateExists(_index)
    {
        candidates[_index].name = _updatedName;
    }

    // Remove Candidate from Array found by index
    function removeCandidate(uint _index) 
        public
        onlyOwner
        candidateExists(_index) 
    {
        // Move selected Candidate to last position so there is no gap
        for (uint i = _index; i < candidates.length - 1; i++){
            candidates[i] = candidates[i+1];
        }
        // Delete Candidate
        delete candidates[candidates.length-1];
        candidates.length--;
    }

    // Returns count of Candidates in an Array
    function getCandidatesCount()
        public
        view
        returns(uint)
    {
        return candidates.length;
    }

    // Returns Candidate found by index
    function getCandidate(uint _index)
        public
        view
        candidateExists(_index)
        returns(string, uint)
    {
        // Return Candidate's name and voteCount
        return (candidates[_index].name, candidates[_index].voteCount);
    }

    // Returns true if target is owner of Contract


    // Checks if Candidate exists in Array
    modifier candidateExists(uint _index) {
        // Check if there are any Candidates in an Array
        require(candidates.length > 0);
        // Check if Candidate exists in an Array
        require(candidates.length >= _index);
        // Continue with called function
        _;
    }
}
