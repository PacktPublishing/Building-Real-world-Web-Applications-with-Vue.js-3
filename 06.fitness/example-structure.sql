--
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    name text,
    color text
);

ALTER TABLE public.exercises OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    email_address text,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: sets; Type: TABLE; Schema: public; Owner: postgres
--


CREATE TABLE public.sets (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    profile_id uuid,
    exercise_id uuid,
    weight double precision,
    repetitions integer,
    workout_id uuid
);


ALTER TABLE public.sets OWNER TO postgres;

--
-- Name: workouts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workouts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    profile_id uuid
);


ALTER TABLE public.workouts OWNER TO postgres;

--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: sets sets_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON DELETE CASCADE;


--
-- Name: sets sets_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: sets sets_workout_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES public.workouts(id) ON DELETE CASCADE;


--
-- Name: workouts workouts_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);

--
-- Name: exercises Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.exercises FOR SELECT USING (true);


--
-- Name: profiles Public profiles are viewable by everyone.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);


--
-- Name: workouts Users can delete own exercises.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own exercises." ON public.workouts FOR DELETE USING ((auth.uid() = profile_id));


--
-- Name: sets Users can delete their own sets; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own sets" ON public.sets FOR DELETE USING ((auth.uid() = profile_id));


--
-- Name: workouts Users can insert their own exercises.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own exercises." ON public.workouts FOR INSERT WITH CHECK (true);


--
-- Name: profiles Users can insert their own profile.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: sets Users can insert their own sets.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own sets." ON public.sets FOR INSERT WITH CHECK ((auth.uid() = profile_id));


--
-- Name: workouts Users can read their own exercises; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can read their own exercises" ON public.workouts FOR SELECT USING ((auth.uid() = profile_id));


--
-- Name: workouts Users can update own exercises.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own exercises." ON public.workouts FOR UPDATE USING ((auth.uid() = profile_id));


--
-- Name: profiles Users can update own profile.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: sets Users can update own sets.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own sets." ON public.sets FOR UPDATE USING ((auth.uid() = profile_id));


--
-- Name: sets Users can view their own sets.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view their own sets." ON public.sets FOR SELECT USING ((auth.uid() = profile_id));


--
-- Name: exercises; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: sets; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.sets ENABLE ROW LEVEL SECURITY;

--
-- Name: workouts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;


--
-- Name: TABLE exercises; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.exercises TO anon;
GRANT ALL ON TABLE public.exercises TO authenticated;
GRANT ALL ON TABLE public.exercises TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE sets; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.sets TO anon;
GRANT ALL ON TABLE public.sets TO authenticated;
GRANT ALL ON TABLE public.sets TO service_role;


--
-- Name: TABLE workouts; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.workouts TO anon;
GRANT ALL ON TABLE public.workouts TO authenticated;
GRANT ALL ON TABLE public.workouts TO service_role;

---
--- Create View for Workout Dashboard
---

CREATE VIEW workout_dashboard_view AS
SELECT
  workouts.profile_id,
  MAX(workouts.created_at) AS last_workout_date,
  COUNT(workouts.id) AS total_workouts,
  MAX(weight_sum) AS most_weight_single_workout,
  MAX(cumulative_weight_sum) AS cumulative_weight
FROM
  workouts
LEFT JOIN (
  SELECT workout_id, SUM(sets.weight * sets.repetitions) AS weight_sum,
    exercise_id as most_weight_exercise
  FROM sets
  GROUP BY workout_id, exercise_id
) AS set_summary ON set_summary.workout_id = workouts.id
LEFT JOIN (
  SELECT workout_id, SUM(sets.weight * sets.repetitions) AS cumulative_weight_sum
  FROM sets
  GROUP BY workout_id
) AS cumulative_summary ON cumulative_summary.workout_id = workouts.id
GROUP BY
  workouts.profile_id;

---
--- Create View for Workout History
---

CREATE VIEW workout_history_view AS
SELECT
  workouts.profile_id,
  workouts.id AS workout_id, workouts.created_at AS workout_created_at,
  exercises.name AS exercise_name,
  sets.weight AS sets_weight, sets.repetitions AS sets_repetitions
FROM
  workouts
LEFT JOIN 
  sets
ON sets.workout_id = workouts.id
LEFT JOIN
  exercises
ON sets.exercise_id = exercises.id;