import db from '../../../db/db.js'
export async function POST(request) {
   const { accountName, email } =await request.json();
   console.log('Creating account with name:', accountName, 'and email:', email);
   try{
         if (!accountName || !email) {
              return new Response(JSON.stringify({ error: 'Account name and email are required' }), {
             status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
         }
         // Here you would typically save the account to your database
         await db.execute('INSERT INTO accounts (acc_name, user_email) VALUES (?, ?)', [accountName, email]);
         // For demonstration, we'll just return a success message
         console.log(`Account created for ${email} with name ${accountName}`);
         return new Response(JSON.stringify({ message: 'Account created successfully' }), {
             status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
        });
   }catch (error) {
       console.error('Error creating account:', error);
       return new Response(JSON.stringify({ error: 'Failed to create account' }), {
           status: 500,
           headers: {
               'Content-Type': 'application/json',
           },
       });
       return;
   }

}