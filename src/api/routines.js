const API = import.meta.env.VITE_API;

/** Fetches all routines from the API. */
export async function getRoutines() {
  try {
    const response = await fetch(API + "/routines");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** Fetches one routine by ID from the API. */
export async function getRoutine(id) {
  try {
    const response = await fetch(API + "/routines/" + id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/** Creates a routine. A valid token is required. */
export async function createRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create a routine.");
  }

  const response = await fetch(API + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/** Deletes a routine by ID. A valid token is required. */
export async function deleteRoutine(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete a routine.");
  }

  const response = await fetch(API + "/routines/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/** Adds a set to a routine. A valid token is required. */
export async function createSet(token, set) {
  if (!token) {
    throw Error("You must be signed in to add a set.");
  }

  const response = await fetch(API + "/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(set),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/** Deletes a set by ID. A valid token is required. */
export async function deleteSet(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete a set.");
  }

  const response = await fetch(API + "/sets/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
