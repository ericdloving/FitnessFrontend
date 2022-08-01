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
console.log(request,"banana")
    const response = await fetch(`${BASE}/users/login`, request)
console.log(response,"tangelo")
    const result = await response.json();
console.log(result,"pluot")
    const token = result.token;
console.log(token,"durian")
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