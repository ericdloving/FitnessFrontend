const BASE = `http://fitnesstrac-kr.herokuapp.com/api/`
export async function getRotuines() {
    try {
        const response = await fetch(`${BASE}/routines`);
  const result = await response.json();
  const routines = result.data.posts;
  return routines;
    } catch (error) {
        throw error
    }
}
export async function login(username, password) {
    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password     
        })
    }
    const response = await fetch(`${BASE}users/login`, request)
    const result = await response.json();
    const token = result.token;
    return token;
  }
export async function registerPerson(event) {
    const registerUsername = event.target[0].value;
    const registerPassword = event.target[1].value;
  
    const response = await fetch(`${BASE}users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
      })
    });
    const result = await response.json();
    const token = result.token;

    localStorage.setItem("token", token);
  }
// export async function name () {
//     try {
//         return
//     } catch (error) {
//         throw error
//     }
// }