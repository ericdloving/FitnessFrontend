const BASE = 'https://enigmatic-springs-68277.herokuapp.com/api'

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
    const response = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username: username,
          password: password,
        })
    });
    const result = await response.json();
    const token = result.data.token;
    return token;
  }
// export async function name () {
//     try {
//         return
//     } catch (error) {
//         throw error
//     }
// }
// export async function name () {
//     try {
//         return
//     } catch (error) {
//         throw error
//     }
// }