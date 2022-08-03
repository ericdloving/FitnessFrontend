const BASE = `http://fitnesstrac-kr.herokuapp.com/api`;


//Routine functions
export async function getRoutines() {
  try {
    const response = await fetch(`${BASE}/routines`);
    const routines = await response.json();
    return routines;
  } catch (error) {
    throw error;
  }
}

export async function getRoutinesByUser(username, token) {
  try{
    const response = await fetch(`${BASE}/users/${username}/routines`, {    
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ? token : ""}`
      },
    })

    const routines = await response.json();
    return routines;

}catch(error) {throw error}
}



export async function createUserRoutine(name,goal,isPublic,token){
  try {
    const response = await fetch( `${BASE}/routines`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic ? true : null
      })})
    const newRoutine = await response.json();
    return newRoutine
  } catch (error) {
    throw error
  }
}


export async function editUserRoutine(name,goal,isPublic,token,routineId){
  try {
    const response = await fetch( `${BASE}/routines/${routineId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic ? true : null
      })})
    const updatedRoutine = await response.json();
    return updatedRoutine
  } catch (error) {
    throw error
  }
}

export async function deleteUserRoutine(token,routineId){
  try {
    const response = await fetch( `${BASE}/routines/${routineId}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }})
    const deletedRoutine = await response.json();
    return deletedRoutine
  } catch (error) {
    throw error
  }
}

//Activity functions
export async function getActivities () {
    try {
      const response = await fetch(`${BASE}/activities`);
      const activities = await response.json();
      return activities;
    } catch (error) {
        throw error
    }
}

export async function createUserActivity(name,description,token){
  try {
    const response = await fetch( `${BASE}/activities`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      })})
    const newActivity = await response.json();
    return newActivity
  } catch (error) {
    throw error
  }
}




//User functions
export async function login(username, password) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };
  const response = await fetch(`${BASE}/users/login`, request);
  const result = await response.json();
  const token = result.token;
  return token;
}
export async function registerPerson(event) {
  const registerUsername = event.target[0].value;
  const registerPassword = event.target[1].value;

  const response = await fetch(`${BASE}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: registerUsername,
      password: registerPassword,
    }),
  });
  const result = await response.json();
  const token = result.token;

  localStorage.setItem("token", token);
}

export async function whoAmI(token) {
  try {
    const response = await fetch(`${BASE}/users/me`, {    
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    const result = await response.json();
    return result;
  }catch (error){throw error}
}

