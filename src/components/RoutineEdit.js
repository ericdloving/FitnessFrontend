import React, { useEffect, useState } from "react";
import "./app.css";
import "./routineActivities.css";
import { TbEdit } from "react-icons/tb";
import {
  attachActivity,
  editRoutineActivity,
  editUserRoutine,
  getActivities,
  deleteUserRoutine,
  deleteRoutineActivity,
  getRoutinesByUser,
} from "../api";

const RoutineActivities = ({
  setSelectedRoutine,
  selectedRoutine,
  setShowEditModal,
  username,
}) => {
  const [selectedRa, setSelectedRa] = useState(null);
  const [allActivities, setAllActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [removeActivityId, setRemoveActivityId] = useState(null);
  const [newActivity, setNewActivity] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editGoal, setEditGoal] = useState(false);
  const [editCount, setEditCount] = useState(false);
  const [editDuration, setEditDuration] = useState(false);
  const [title, setTitle] = useState(selectedRoutine.name);
  const [goal, setGoal] = useState(selectedRoutine.goal);
  const [count, setCount] = useState(selectedRa ? selectedRa.count : 0);
  const [duration, setDuration] = useState("");

  //UseEffects
  useEffect(() => {
    const getAllActivities = async () => {
      try {
        const activities = await getActivities();
        setAllActivities(activities);
      } catch (error) {
        throw error;
      }
    };

    getAllActivities();
  }, []);
  useEffect(() => {
  }, [selectedRa]);

  useEffect(() => {}, [removeActivityId]);

  //Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const updatedStuff = await attachActivity(
      selectedRoutine.id,
      selectedActivityId,
      count || 0,
      duration || 0,
      token
    );
    if('error' in updatedStuff){
      alert("You cannot add an activity that already exists on this routine.")
    } else{updateSelectedRoutine(); alert("Activity added") }
    
  };

  const handleTitleChange = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updateTitle = await editUserRoutine(
      title,
      selectedRoutine.goal,
      selectedRoutine.isPublic,
      token,
      selectedRoutine.id
    );
    const newRoutine = {
      activities: [...selectedRoutine.activities],
      ...updateTitle,
    };
    setSelectedRoutine(newRoutine);
    setEditTitle(false);
  };
  const handleGoalChange = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updateGoal = await editUserRoutine(
      selectedRoutine.name,
      goal,
      selectedRoutine.isPublic,
      token,
      selectedRoutine.id
    );
    const newRoutine = {
      activities: [...selectedRoutine.activities],
      ...updateGoal,
    };
    setEditGoal(false);
    setSelectedRoutine(newRoutine);
  };
  const handleCountChange = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updateCount = await editRoutineActivity(
      token,
      selectedRa.routineActivityId,
      count,
      selectedRa.duration
    );
    setEditCount(false);
    updateSelectedRoutine();
  };
  const handleDurationChange = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updateDuration = await editRoutineActivity(
      token,
      selectedRa.routineActivityId,
      selectedRa.count,
      duration
    );
    setEditCount(false);
    updateSelectedRoutine();
  };

  const handleSelectChange = (event) => {
    setSelectedActivityId(parseInt(event.target.value));
  };

  //Functions

  function addActivity() {
    return (
      <div className="addActivity">
    
        <select onChange={handleSelectChange}>
          
          {allActivities.map((activity) => {
            return (
              <option value={activity.id} key={activity.id}>
                {activity.name}
              </option>
            );
          })}
        </select>
        <input
          id="countInput"
          className="input"
          type="number"
          name="count"
          onChange={(event) => {
            setCount(event.target.value);
          }}
          placeholder="Count"
        />
        <input
          id="durInput"
          className="input"
          type="number"
          name="duration"
          onChange={(event) => {
            setDuration(event.target.value);
          }}
          placeholder="duration"
        />
        <button
          id="addActivityButton"
          type="submit"
          onClick={(e) => {
            setNewActivity(false);
            handleSubmit(e);
          }}>Add</button>
          <button
          id="closeButton"
          onClick={()=>setNewActivity(false)
          }
          >Cancel</button>
          
        
      </div>
    );
  }

  const deleteRoutine = async () => {
    const token = localStorage.getItem("token");
    const routineId = selectedRoutine.id;
    if (username === selectedRoutine.creatorName) {
      const eraseRoutine = await deleteUserRoutine(token, routineId);
      alert("Routine has been Deleted!");
      updateSelectedRoutine();
      return eraseRoutine;
    }
  };
  const deleteActivity = async () => {
    const token = localStorage.getItem("token");
    const activityId = removeActivityId;
    if (activityId) {
      const eraseActivity = await deleteRoutineActivity(token, activityId);
      alert("Activity has been Deleted!");
      updateSelectedRoutine();
      return eraseActivity;
    }
  };
  async function updateSelectedRoutine() {
    try {
      const token = localStorage.getItem("token");
      const myRoutines = await getRoutinesByUser(
        selectedRoutine.creatorName,
        token
      );
      myRoutines
        ? setSelectedRoutine(
            myRoutines.find((routine) => routine.id === selectedRoutine.id)
          )
        : null;
    } catch (error) {
      throw error;
    }
  }

  //Return

  return (
    <div className="modal">
      {selectedRoutine ? (
        <div className="routineDetails">
          {/*TITLE        **********/}

          <div className={!editTitle ? "routineDetailsTitle" : "hidden"}>
            <p className="title">{selectedRoutine.name}</p>{" "}
            <TbEdit className="editButton" onClick={() => setEditTitle(true)} />
            <p
              className="deleteRoutineButton"
              onClick={() => {
                setShowEditModal(false);
                deleteRoutine();
              }}
            >
              ????
            </p>
          </div>

          <div className={editTitle ? "routineDetailsTitle edit" : "hidden"}>
            <form onSubmit={handleTitleChange}>
              <textarea
                type="text"
                defaultValue={selectedRoutine.name}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button type="submit">??????</button>
              <button onClick={() => setEditTitle(false)}>???</button>
            </form>
          </div>
          <div className="routineBody">
            <div className={!editGoal ? "routineGoal" : "hidden"}>
              {selectedRoutine.goal}{" "}
              <TbEdit onClick={() => setEditGoal(true)} />
            </div>

            <div className={editGoal ? "routineGoal" : "hidden"}>
              <form onSubmit={handleGoalChange}>
                <textarea
                  type="text"
                  defaultValue={selectedRoutine.goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={() => {
                    setEditGoal(false);
                  }}
                >
                  ??????
                </button>
                {editGoal ? <p onClick={() => setEditGoal(false)}>???</p> : null}
              </form>
            </div>
          </div>
          <div className="activities">
            {selectedRoutine.activities.map((activity) => {
              return selectedRoutine.activities.length ? (
                <div
                  className="routineActivity"
                  key={activity.id}
                  onMouseOver={() => {
                    setSelectedRa(activity);
                  }}
                >
                  <div>
                    <p
                      className="routineActivityDetails title"
                      onClick={() => {
                        setShowEditModal(false);
                      }}
                    >
                      Activity: {activity.name}
                    </p>
                    <p
                      className="delActivityButton"
                      onMouseOver={() => {
                        setRemoveActivityId(activity.routineActivityId);
                      }}
                      onClick={() => {
                        deleteActivity();
                      }}
                    >
                      ????
                    </p>
                  </div>
                  <p className="routineActivitiyDetails description">
                    {activity.description}
                  </p>

                  <div className={!editCount ? "raCount" : "hidden"}>
                    Count: {activity.count}{" "}
                    <TbEdit onClick={() => setEditCount(true)} />
                  </div>

                  <div className={editCount ? "raCount" : "hidden"}>
                    <form onSubmit={handleCountChange}>
                      <input
                        type="text"
                        defaultValue={activity.count}
                        onChange={(e) => setCount(e.target.value)}
                      />
                      <button type="submit">??????</button>
                      {editCount ? (
                        <p onClick={() => setEditCount(false)}>???</p>
                      ) : null}
                    </form>
                  </div>

                  <div className={!editDuration ? "raDuration" : "hidden"}>
                    Duration: {activity.duration}{" "}
                    <TbEdit onClick={() => setEditDuration(true)} />
                  </div>

                  <div className={editDuration ? "raDuration" : "hidden"}>
                    <form onSubmit={handleDurationChange}>
                      <input
                        type="text"
                        defaultValue={activity.duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      <button
                        type="submit"
                        onClick={() => setEditDuration(false)}
                      >
                        ??????
                      </button>
                      {editDuration ? (
                        <p onClick={() => setEditDuration(false)}>???</p>
                      ) : null}
                    </form>
                  </div>
                </div>
              ) : null;
            })}
          </div>
          <div>{newActivity ? addActivity() : null}</div>
          <footer>
            <button className={newActivity?"hidden":""} id="addActivityButton" onClick={() => setNewActivity(true)}>
              Add Activity
            </button>
            <button
              id="closeButton"
              onClick={() => {
                setShowEditModal(false);
              }}
            >
              Close
            </button>
          </footer>
        </div>
      ) : null}
    </div>
  );
};

export default RoutineActivities;
