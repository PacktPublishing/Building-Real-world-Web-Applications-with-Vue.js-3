-- Declare the PROFILE_UUID variable
DO $$ 
DECLARE 
    PROFILE_UUID uuid;
BEGIN
    PROFILE_UUID := (SELECT id FROM public.profiles WHERE email_address = 'example@email.com' LIMIT 1);  -- Replace with an appropriate profile ID
END $$;

-- Insert 25 rows of random expenses
INSERT INTO public.expenses (id, created_at, profile_id, category_id, amount, description)
SELECT 
    gen_random_uuid(), 
    now(), 
    PROFILE_UUID, 
    c.id AS category_id, 
    random() * 100, 
    'Expense ' || generate_series
FROM 
    generate_series(1, 25) 
JOIN 
    public.categories c ON random() < 0.5  -- Adjust probability as needed
ORDER BY 
    random();

-- Output success message
RAISE NOTICE 'Inserted 25 random expenses';
