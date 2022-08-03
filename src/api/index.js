const BASE = `http://fitnesstrac-kr.herokuapp.com/api`;
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
    console.log(username,"USERNAME INSIDE API GETTER")
    // if (token) {
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
export async function getActivities () {
    try {
      const response = await fetch(`${BASE}/activities`);
      const activities = await response.json();
      return activities;
    } catch (error) {
        throw error
    }
}
