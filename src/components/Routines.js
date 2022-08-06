import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getRoutines } from "../api";
import "./app.css"
import "./TabBar.css";
import "./routines.css";
import {RoutineActivities,Home} from "./";

const Routines = ({setLength}) => {
  const [allRoutines, setAllRoutines] = useState([]);
  const [paginatedRoutines, setPaginatedRoutines] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal,setShowModal] = useState(false)
  const [selectedRoutine,setSelectedRoutine] = useState(null)
  const resultsPerPage = 24;
  const totalPageCount = Math.ceil(allRoutines.length / resultsPerPage);
  let pageButtons = [];

  window.addEventListener('keydown', (event)=> {
    if(event.key === 'Escape' ) {
      setShowModal(false)
    }
  })
  async function fetchRoutines() {
    const returnRoutines = await getRoutines();
    setAllRoutines(returnRoutines);
    setLength(returnRoutines.length);
  }
  useEffect(() => {
    fetchRoutines();
  }, []);


  useEffect(() => {
    if(selectedRoutine){
      setShowModal(true)
    }

  }, [selectedRoutine]);


  /* The following hook slices a page worth of routines 
     & gets a new slice every time the page number changes
     & calls to recalculate page navigation buttons */
  useEffect(() => {
    const startIndex = (pageNumber - 1) * resultsPerPage;
    setPaginatedRoutines(
      allRoutines.slice(startIndex, startIndex + resultsPerPage - 1)
    );
    buildPageButtons(pageNumber);
  }, [pageNumber, allRoutines]);

  function buildPageButtons(pageNum) {
    pageButtons = [];
    const totalPageCount = Math.ceil(allRoutines.length / resultsPerPage);
    if (totalPageCount < 5) {
      for (let i = 1; i <= totalPageCount; i++) {
        pageButtons.push(i);
      }
    } else {
      pageButtons = [1, pageNum];
      for (let i = pageNum; i < 4; i++) {
        pageButtons.push(pageNum + i);
      }
      pageButtons.push(totalPageCount);
    }
  }
  const handlePageButton = (event) => {
    setPageNumber(parseInt(event.target.value));
  };



  return (
  
    <div className="routines">
      <p className="routine">Welcome there are {allRoutines.length || "no"} routines! Click on one to view it's activities.</p>
       <Modal show={showModal} className="modal"><div>
        <RoutineActivities selectedRoutine={selectedRoutine} setSelectedRoutine={setSelectedRoutine} setShowModal={setShowModal}/>
    </div></Modal>
      {paginatedRoutines.length ? (
        paginatedRoutines.map((routine) => {
          return (
            <div className="routine" key={`Routine${routine.id}`}onClick={()=>{
              setSelectedRoutine(routine)
            }}>
              <p>Name: {routine.name}</p>
              <p>Goal: {routine.goal}</p>
              <p>Creator: {routine.creatorName}</p>
              
            </div>
          );
        })
      ) : (
        <h3>There are no routines to display</h3>
      )}
     
      <div id="pageButtonContainer">
      <button
            className="pageNum"
            onClick={handlePageButton}
            value={pageNumber >= 1 ? 1 : null}
          >
            {pageNumber >= 1 ? "First" : null}
        </button>
        <button
          value={pageNumber > 1 ? pageNumber - 1 : 1}
          className={pageNumber > 1 ? "pageButton" : "hidden" } 
          disabled={pageNumber < 2 ? true : false}
          onClick={handlePageButton}
        >
          {pageNumber === 1 ? null : "Prev"}
        </button>
        {pageButtons.map((pNum) => {
          return (
            <button
              key={`page${pNum}`}
              value={pNum}
              className="pageButton"
              disabled={pageNumber === pNum ? true : false}
              onClick={handlePageButton}
            >
              "{pNum}"
            </button>
          );
        })}
        <div className="currentPage">
          <button
            className={pageNumber > 2 ? "pageNum":"hidden"}
            onClick={handlePageButton}
            value={pageNumber > 2 ? pageNumber - 2 : 1}
          >
            {pageNumber > 2 ? `${pageNumber - 2}` : null}
          </button>
          <button
            className={pageNumber>1 ? "pageNum" : "hidden"}
            onClick={handlePageButton}
            value={pageNumber > 1 ? pageNumber - 1 : 1}
          >
            {pageNumber > 1 ? `${pageNumber - 1}` : null}
          </button>
          <button
            className="pageButton"
            id="currentPage"
            onClick={() => setPageNumber(pageNumber)}
          >{` ${pageNumber}`}</button>
          <button
            className={pageNumber < totalPageCount-1 ? "pageButton" : "hidden"}
            onClick={handlePageButton}
            value={pageNumber >= 1 ? pageNumber + 1 : null}
          >
            {pageNumber + 1 < totalPageCount ? `${pageNumber + 1}` : null}
          </button>
          <button
            className={pageNumber < totalPageCount -2  ? "pageButton": "hidden"}
            onClick={handlePageButton}
            value={pageNumber < totalPageCount ? pageNumber + 2 : null}
          >
            {pageNumber + 2 < totalPageCount ? `${pageNumber + 2}` : null}
          </button>
        
        <button
          value={
            pageNumber * resultsPerPage < allRoutines.length
              ? pageNumber + 1
              : pageNumber
          }
          className={pageNumber < totalPageCount ? "pageButton": "hidden"}
          disabled={allRoutines.length < pageNumber * resultsPerPage}
          onClick={handlePageButton}
        >
          Next
        </button>
        <button
            className={pageNumber < totalPageCount ? "pageButton": "hidden"}
            onClick={handlePageButton}
            value={pageNumber >= 1 ?  totalPageCount  : null}
          >
            {pageNumber < totalPageCount ? "Last" : null}
        </button>
      </div>
    </div></div>
  );
};

export default Routines;
