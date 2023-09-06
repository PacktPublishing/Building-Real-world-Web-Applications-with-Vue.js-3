export interface Exercise {
    id: string;
    name: string;
}

export interface Routine {
    id?: string;
    exercise: string | null;
    routines: {
        weight: number;
        repetitions: number;
    }[];
}

export interface Workout {
    date: Date | any;
    routines: Routine[];
}

export interface Set {
    exercise_id: string;
    workout_id: string;
    profile_id: string;
    weight: number;
    repetitions: number;
}

export interface ExercisesWithWorkouts {
    exercises: Exercise[];
    workouts: Workout[];
}

export interface WorkoutFromDatasource {
    id: string;
    created_at: string;
    sets: {
        workout_id: string;
        weight: number;
        repetitions: number;
        exercises: {
            name: string;
            color: string;
        };
    }[];
}[]

export interface WorkoutViewFromDatasource {
    profile_id: string;
    workout_id: string;
    workout_created_at: string;
    exercise_name: string;
    sets_weight: number;
    sets_repetitions: number;
}

export interface Dashboard {
    profile_id: string;
    last_workout_date: string;
    total_workouts: number;
    most_weight_single_workout: number;
    cumulative_weight: number;
}
