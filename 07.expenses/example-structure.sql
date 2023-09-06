--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text,
    color text,
    profile_id uuid
);

ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text,
    email_address text,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--


CREATE TABLE public.expenses (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    profile_id uuid,
    category_id uuid,
    amount double precision,
    description text
);


ALTER TABLE public.expenses OWNER TO postgres;

--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: expenses expenses_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: expenses expenses_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: expenses categories_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: categories Users can delete own categories.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own categories." ON public.categories FOR DELETE USING ((auth.uid() = profile_id));


--
-- Name: Expense Tracker Users can delete their own expenses; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own expenses" ON public.expenses FOR DELETE USING ((auth.uid() = profile_id));


--
-- Name: categories Users can insert their own categories.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own categories." ON public.categories FOR INSERT WITH CHECK (true);


--
-- Name: Expense Tracker Users can insert their own expenses.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own expenses." ON public.expenses FOR INSERT WITH CHECK ((auth.uid() = profile_id));


--
-- Name: categories Users can read their own categories; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.categories FOR SELECT USING (true);

--
-- Name: categories Users can update own categories.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own categories." ON public.categories FOR UPDATE USING ((auth.uid() = profile_id));


--
-- Name: Expense Tracker Users can update own expenses.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own expenses." ON public.expenses FOR UPDATE USING ((auth.uid() = profile_id));


--
-- Name: Expense Tracker Users can view their own expenses.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view their own expenses." ON public.expenses FOR SELECT USING ((auth.uid() = profile_id));

--
-- Name: Expense Tracker Users can CRUD their own profile.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can read from profile" ON "public"."profiles"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert new profiles" ON "public"."profiles"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can ALL on their own profile" ON "public"."profiles"
AS PERMISSIVE FOR ALL
TO authenticated

WITH CHECK ((auth.uid() = id))

--
-- Name: categories; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: expenses; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

--
-- Name: TABLE categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.categories TO anon;
GRANT ALL ON TABLE public.categories TO authenticated;
GRANT ALL ON TABLE public.categories TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE expenses; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.expenses TO anon;
GRANT ALL ON TABLE public.expenses TO authenticated;
GRANT ALL ON TABLE public.expenses TO service_role;
