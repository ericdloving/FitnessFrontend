import React, { useState,useEffect } from "react";
import { getActivities } from "../api";
import "./activities.css"

const Activities = () =>{
    const [allActivities, setAllActivities] = useState([]);
    const [paginatedActivities, setPaginatedActivities] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
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

      const handlePageButton = (event) => {
        setPageNumber(parseInt(event.target.value));
      };

    return(
        <div className="activities">
            {paginatedActivities.length ? paginatedActivities.map((activity)=>{
                return(
                    <div className="activity" key={activity.id}>
                        <p>Id: {activity.id}</p>
                        <p>Name: {activity.name}</p>
                        <p>{activity.description}</p>
                    </div>
                )
            }):null}
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
          className="pageButton"
          disabled={pageNumber < 2 ? true : false}
          onClick={handlePageButton}
        >
          {pageNumber === 1 ? null : "Prev"}
        </button>



        <div className="currentPage">
          <button
            className="pageNum"
            onClick={handlePageButton}
            value={pageNumber > 2 ? pageNumber - 2 : 1}
          >
            {pageNumber > 2 ? `${pageNumber - 2},` : null}
          </button>
          <button
            className="pageNum"
            onClick={handlePageButton}
            value={pageNumber > 1 ? pageNumber - 1 : 1}
          >
            {pageNumber > 1 ? `${pageNumber - 1},` : null}
          </button>
          <button
            className="pageNum"
            id="currentPage"
            onClick={() => setPageNumber(pageNumber)}
          >{` ${pageNumber}`}</button>
          <button
            className="pageNum"
            onClick={handlePageButton}
            value={pageNumber >= 1 ? pageNumber + 1 : null}
          >
            {pageNumber + 1 <= totalPageCount ? `,${pageNumber + 1}` : null}
          </button>
          <button
            className="pageNum"
            onClick={handlePageButton}
            value={pageNumber >= 1 ? pageNumber + 2 : null}
          >
            {pageNumber + 2 <= totalPageCount ? `,${pageNumber + 2}` : null}
          </button>
        </div>
        <button
          value={
            pageNumber * resultsPerPage < allActivities.length
              ? pageNumber + 1
              : pageNumber
          }
          className="pageButton"
          disabled={allActivities.length < pageNumber * resultsPerPage}
          onClick={handlePageButton}
        >
          Next
        </button>
        <button
            className="pageNum"
            onClick={handlePageButton}
            value={pageNumber >= 1 ?  totalPageCount  : null}
          >
            {pageNumber <= totalPageCount ? "Last" : null}
        </button>
      </div>
        </div>
    )
}
export default Activities