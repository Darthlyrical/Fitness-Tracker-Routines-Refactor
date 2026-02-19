import { useEffect, useState } from "react";
import { Link } from "react-router";
import { createRoutine, getRoutines } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function RoutinesPage() {
  const { token } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState(null);

  const syncRoutines = async () => {
    const data = await getRoutines();
    setRoutines(data);
  };

  useEffect(() => {
    syncRoutines();
  }, []);

  const tryCreateRoutine = async (formData) => {
    setError(null);
    const name = formData.get("name");
    const goal = formData.get("goal");

    try {
      await createRoutine(token, { name, goal });
      await syncRoutines();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Routines</h1>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
          </li>
        ))}
      </ul>

      {token && (
        <>
          <h2>Create a routine</h2>
          <form action={tryCreateRoutine}>
            <label>
              Name
              <input type="text" name="name" required />
            </label>
            <label>
              Goal
              <input type="text" name="goal" required />
            </label>
            <button>Create routine</button>
          </form>
          {error && <p role="alert">{error}</p>}
        </>
      )}
    </>
  );
}
