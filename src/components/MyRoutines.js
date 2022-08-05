import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css";
import {
  getRoutinesByUser,
  whoAmI,
  editUserRoutine,
  deleteUserRoutine,
} from "../api";
import { CreateRoutine, RoutineEdit } from "./";

const MyRoutines = ({ username }) => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [routineWasEdited, setRoutineWasEdited] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
      async function fetchMyRoutines(username) {
    const returnRoutines = await getRoutinesByUser(username, token);
    setMyRoutines(returnRoutines);
  }
    async function fetchGetMe() {
      const me = await whoAmI(localStorage.getItem("token"));
      const name = me.username;
      fetchMyRoutines(name);
    }

    fetchGetMe();
  }, [routineWasEdited]);

  useEffect(() => {
    if (selectedRoutine) setShowEditModal(true);
  }, [selectedRoutine]);

  useEffect(() => {
    setRoutineWasEdited(!routineWasEdited);
  }, [showEditModal]);

  function handleClickSummary() {
    setShowCreateModal(true);
  }

  useEffect(() => {}, [showEditModal]);

  return (
    <div className="routines">
      <Modal show={showCreateModal} className="modal">
        <CreateRoutine setShowCreateModal={setShowCreateModal} setRoutineWasEdited={setRoutineWasEdited} />
      </Modal>
      <Modal show={showEditModal} className="modal">
        <RoutineEdit
          setShowEditModal={setShowEditModal}
          selectedRoutine={selectedRoutine}
          setSelectedRoutine={setSelectedRoutine}
          username={username}
        />
      </Modal>
      <div>
        <div className="routine" onClick={handleClickSummary}>
          <p>
            Welcome, {username}! You have {myRoutines.length || "no"}{" "}
            routines.Click here to create a new one.
          </p>
        </div>
        {myRoutines.length
          ? myRoutines.map((routine) => {
              return (
                <div
                  className="routine"
                  key={`Routine${routine.id}`}
                  onClick={() => {
                    setSelectedRoutine(routine);
                  }}
                >
                  <p>Name: {routine.name}</p>
                  <p>Goal: {routine.goal}</p>
                  <p>Creator: {routine.creatorName}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MyRoutines;
