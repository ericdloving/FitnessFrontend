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
export async function name () {
    try {
        return
    } catch (error) {
        throw error
    }
}
export async function name () {
    try {
        return
    } catch (error) {
        throw error
    }
}
export async function name () {
    try {
        return
    } catch (error) {
        throw error
    }
}