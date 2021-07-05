import {connectDatabase, insertDocument, getAllDocuments, errorHandling} from '../../../helpers/db-util'

async function handler(req,res){
    const eventId = req.query.eventId
    let client,result;

    try{
        client = await connectDatabase()
    } catch(err){
        errorHandling(res,500, err)
        return
    }
    
    if(req.method === 'POST'){
        // add server-side validation
        // const email = req.body.email
        // const name = req.body.name
        // const text = req.body.text
        const {email, name, text} = req.body

        if(!email.includes('@') || !name || name.trim() === "" || !text || !text.trim() === ""){
            res.status(422).json({message: 'Invalid input.'})
            client.close()
            return ;
        }

        const data = {
            email,
            name,
            text,
            eventId
        }

        try{
            result = await insertDocument(client, 'comments', data)
            data.id = result._id
    
            res.status(201).json({
                message:"comment added!",
                data
            })
        }catch(err){
            errorHandling(res,500, err)
            return
        }
    }

    if(req.method === 'GET'){
        try{
            const documents = await getAllDocuments(client, 'comments', {_id: -1}, {eventId: eventId})
            res.status(200).json({comments: documents})
        }catch(err){
            errorHandling(res,500, err)
            return
        }
    }

    client.close()
}

export default handler