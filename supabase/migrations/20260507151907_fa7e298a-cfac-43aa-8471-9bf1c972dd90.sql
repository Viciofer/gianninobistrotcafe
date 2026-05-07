UPDATE auth.users 
SET encrypted_password = crypt('Gi@nnino1974', gen_salt('bf')),
    email_confirmed_at = COALESCE(email_confirmed_at, now()),
    updated_at = now()
WHERE email = 'vinfer83@gmail.com';