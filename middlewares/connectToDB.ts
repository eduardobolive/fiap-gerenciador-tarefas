import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';

export const connectToDB = (handler: NextApiHandler) => 
    async (req: NextApiRequest, res: NextApiResponse) => {
        console.log('Mongo está conectado: ', mongoose.connections[0].readyState === 1 ? 'Conectado':'Não conectado');

        if(mongoose.connections[0].readyState){
            return handler(req, res);
        }

        const {DB_CONNECTION_STRING} = process.env;

        if(!DB_CONNECTION_STRING){
            return res.status(500).json({error: 'Env DB_CONNECTION_STRING não informada'});
        }

        mongoose.connection.on('connected', () => console.log('Conectado ao banco de dados'));
        mongoose.connection.on('error', error => console.log('Erro ao conectar no banco de dados', error));
        await mongoose.connect(DB_CONNECTION_STRING);

        return handler(req,res);

}