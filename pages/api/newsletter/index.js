import {MongoClient} from 'mongodb'

import {connectDatabase, insertDocument, errorHandling} from '../../../helpers/db-util'

async function postNewsletterApi(req,res){
    if(req.method === 'POST'){
        const email = req.body.email

        if(!email || !email.includes('@')){
            res.status(422).json({
                message: 'Invalid email address.'
            })
           return
        }

        let client;

        try {
            client = await connectDatabase()
        } catch(err){
            errorHandling(res, 500,"Connecting to the database failed!")
            return;
        }

        try{
            await insertDocument(client, 'newsletter', {email})
            client.close()
        } catch(err){
            errorHandling(res, 500,"Inserting data failed!")
            return;
        }

        res.status(201).json({
            message: 'Sign up!',
            Newsletter: email
        })
    }
}

export default postNewsletterApi