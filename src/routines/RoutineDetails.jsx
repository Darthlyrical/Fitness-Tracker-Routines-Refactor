import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getActivities } from "../api/activities";
import {
  createSet,
  deleteRoutine,
  deleteSet,
  getRoutine,
} from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function RoutineDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [routine, setRoutine] = useState(null);
  const [activities, setActivities] = useState([]);
  const [deleteRoutineError, setDeleteRoutineError] = useState(null);
  const [createSetError, setCreateSetError] = useState(null);
  const [deleteSetError, setDeleteSetError] = useState(null);

  const syncRoutine = async () => {
    const data = await getRoutine(id);
    setRoutine(data);
  };

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncRoutine();
    syncActivities();
  }, [id]);

  const tryDeleteRoutine = async () => {
    setDeleteRoutineError(null);
    try {
      await deleteRoutine(token, id);
      navigate("/routines");
    } catch (e) {
      setDeleteRoutineError(e.message);
    }
  };

  const tryCreateSet = async (formData) => {
    setCreateSetError(null);
    const activityId = Number(formData.get("activityId"));
    const count = Number(formData.get("count"));

    try {
      await createSet(token, { routineId: Number(id), activityId, count });
      await syncRoutine();
    } catch (e) {
      setCreateSetError(e.message);
    }
  };

  const tryDeleteSet = async (setId) => {
    setDeleteSetError(null);
    try {
      await deleteSet(token, setId);
      await syncRoutine();
    } catch (e) {
      setDeleteSetError(e.message);
    }
  };

  if (!routine) return <p>Loading...</p>;

  const sets = routine.sets ?? [];

  return (
    <article>
      <h1>{routine.name}</h1>
      <p>by {routine.creatorName}</p>
      <p>{routine.goal}</p>

      {token && <button onClick={tryDeleteRoutine}>Delete routine</button>}
      {deleteRoutineError && <p role="alert">{deleteRoutineError}</p>}

      <h2>Sets</h2>
      {sets.length === 0 ? (
        <p>No sets yet. Add a set to this routine.</p>
      ) : (
        <ul>
          {sets.map((set) => (
            <li key={set.id}>
              <p>{set.name}</p>
              <p>Count: {set.count}</p>
              {token && (
                <button onClick={() => tryDeleteSet(set.id)}>Delete set</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {deleteSetError && <p role="alert">{deleteSetError}</p>}

      {token && (
        <>
          <h3>Add a set</h3>
          <form action={tryCreateSet}>
            <label>
              Activity
              <select name="activityId" required defaultValue="">
                <option value="" disabled>
                  Select an activity
                </option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Count
              <input type="number" name="count" min="1" required />
            </label>
            <button>Add set</button>
          </form>
          {createSetError && <p role="alert">{createSetError}</p>}
        </>
      )}
    </article>
  );
}
