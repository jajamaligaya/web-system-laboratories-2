const addWorkoutForm = document.getElementById('addWorkoutForm');
const workoutList = document.getElementById('workoutList');

// Fetch all workouts and display them
const fetchWorkouts = async () => {
    const response = await fetch('http://localhost:4000/api/workouts');
    const workouts = await response.json();
    workoutList.innerHTML = workouts.map(workout => `
        <li class="list-group-item">
            <span>${workout.title} - ${workout.reps} reps - ${workout.load}kg</span>
            <button class="btn btn-warning btn-sm float-end ms-2" onclick="openEditModal('${workout._id}')">Edit</button>
            <button class="btn btn-danger btn-sm float-end" onclick="deleteWorkout('${workout._id}')">Delete</button>
        </li>
    `).join('');
};

// Add a new workout
addWorkoutForm.onsubmit = async (e) => {
    e.preventDefault();
    const title = document.getElementById('workoutTitle').value;
    const reps = document.getElementById('workoutReps').value;
    const load = document.getElementById('workoutLoad').value;

    const response = await fetch('http://localhost:4000/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, reps, load })
    });

    if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Workout Added!',
            text: 'The workout was added successfully.',
        }).then(() => fetchWorkouts());
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add workout.',
        });
    }
};

// Delete a workout
const deleteWorkout = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this workout?");
    if (confirmDelete) {
        const response = await fetch(`http://localhost:4000/api/workouts/${id}`, { method: 'DELETE' });
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Workout Deleted!',
                text: 'The workout was deleted successfully.',
            }).then(() => fetchWorkouts());
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete workout.',
            });
        }
    }
};

// Open the edit modal and populate the form
const openEditModal = async (id) => {
    const response = await fetch(`http://localhost:4000/api/workouts/${id}`);
    const workout = await response.json();

    document.getElementById('editWorkoutId').value = workout._id;
    document.getElementById('editWorkoutTitle').value = workout.title;
    document.getElementById('editWorkoutReps').value = workout.reps;
    document.getElementById('editWorkoutLoad').value = workout.load;

    new bootstrap.Modal(document.getElementById('editWorkoutModal')).show();
};

// Update a workout
document.getElementById('editWorkoutForm').onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('editWorkoutId').value;
    const title = document.getElementById('editWorkoutTitle').value;
    const reps = document.getElementById('editWorkoutReps').value;
    const load = document.getElementById('editWorkoutLoad').value;

    const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, reps, load })
    });

    if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Workout Updated!',
            text: 'The workout was updated successfully.',
        }).then(() => {
            fetchWorkouts();
            new bootstrap.Modal(document.getElementById('editWorkoutModal')).hide();
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update workout.',
        });
    }
};

// Initial fetch of workouts
fetchWorkouts();
