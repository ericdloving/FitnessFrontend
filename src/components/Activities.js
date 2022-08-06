import React, { useState, useEffect } from "react";
import { getActivities } from "../api";
import Modal from "react-bootstrap/Modal";
import "./routines.css";
import { CreateActivity } from ".";

const Activities = ({ username }) => {
  const [allActivities, setAllActivities] = useState([]);
  const [paginatedActivities, setPaginatedActivities] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const resultsPerPage = 24;
  const totalPageCount = Math.ceil(allActivities.length / resultsPerPage);

  useEffect(() => {
    async function fetchActivities() {
      const returnActivities = await getActivities();
      setAllActivities(returnActivities);
    }
    fetchActivities();
  }, []);

  useEffect(() => {
    const startIndex = (pageNumber - 1) * resultsPerPage;
    setPaginatedActivities(
      allActivities.slice(startIndex, startIndex + resultsPerPage - 1)
    );
  }, [pageNumber, allActivities]);

  function handleClickSummary(){
    setShowModal(true);
  }


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

  window.addEventListener('keydown', (event)=> {
    if(event.key === 'Escape' ) {
      setShowModal(false);
    }
  })

  return (
    <div className="routines" id="activities">
      <div className="routine" id="createActivity" onClick = {handleClickSummary}>
        {username ? (
          <p>
            Welcome, {username}! If you would like to <span style={{fontWeight: 'bold'}}>CREATE A NEW ACTIVITY </span>
             click here.
          </p>
        ) : (
          <p>
            Welcome, there are {allActivities.length || "no"} activities for you
            to peruse.
          </p>
        )}
      </div>
      <Modal show={showModal} className="modal">
        <div>
        <CreateActivity setShowModal={setShowModal}/>
        </div>
      </Modal>
      {paginatedActivities.length
        ? paginatedActivities.map((activity) => {
            return (
              <div className="routine" key={activity.id}>
                <p>Id: {activity.id}</p>
                <p>Name: {activity.name}</p>
                <p>{activity.description}</p>
              </div>
            );
          })
        : null}
        <div id="bottomSpacer"></div>
      <div id="pageButtonContainer">
      <button
            className={pageNumber <= 1 ? "hidden" : "pageButton"  }
            onClick={handlePageButton}
            value={pageNumber >= 1 ? 1 : null}
          >
            {pageNumber >= 2 ? "First" : null}
        </button>
        <button
          value={pageNumber > 1 ? pageNumber - 1 : 1}
          className={pageNumber > 1 ? "pageButton" : "hidden" } 
          disabled={pageNumber < 2 ? true : false}
          onClick={handlePageButton}
        >
          {pageNumber === 1 ? null : "Prev"}
        </button>
        <div className="currentPage">
          <button
            className={pageNumber > 2 ? "pageNum":"hidden"}
            onClick={handlePageButton}
            value={pageNumber > 2 ? pageNumber - 2 : 1}
          >
            {pageNumber > 2 ? `${pageNumber - 2}` : null}
          </button>
          <button
            className={pageNumber > 1 ? "pageNum" : "hidden"}
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
            pageNumber * resultsPerPage < allActivities.length
              ? pageNumber + 1
              : pageNumber
          }
          className={pageNumber < totalPageCount ? "pageButton": "hidden"}
          disabled={allActivities.length < pageNumber * resultsPerPage}
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
      </div>
    </div>
  );
};
export default Activities;
