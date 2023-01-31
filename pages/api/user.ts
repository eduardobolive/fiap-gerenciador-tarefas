import type {NextApiRequest, NextApiResponse} from 'next';
import { connectToDB } from '../../middlewares/connectToDB';
import { UserModel } from '../../models/User';
import { DefaultMessageResponse } from '../../types/DefaultMessageResponse';
import { User } from '../../types/User';
import CryptoJS from "crypto-js";


const endpoint = async function(
    req: NextApiRequest,
    res: NextApiResponse<DefaultMessageResponse>
){
    try{

        if(req.method !== 'POST'){
            return res.status(405).json({error: 'Método informado não existe'});
        }

        const {MY_SECRET_KEY} = process.env;
        if(!MY_SECRET_KEY){
            return res.status(500).json({error : 'Env MY_SECRET_KEY não informada'});
        }

        if(!req.body){
            return res.status(400).json({error: 'Informar os dados de cadastro'});
        }

        const user = req.body as User;

        if(!user.name || user.name.length < 2){
            return res.status(400).json({error: 'Nome não é válido'});
        }

        if(!user.email || user.email.length < 6){
            return res.status(400).json({error: 'E-mail não é válido'});
        }

        if(!user.password || user.password.length < 6){
            return res.status(400).json({error: 'Senha menor que 6 caracteres'});
        }

        const existsWithSameEmail = await UserModel.find({email: user.email});
        if(existsWithSameEmail && existsWithSameEmail.length > 0){
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        user.password = CryptoJS.AES.encrypt(user.password, MY_SECRET_KEY).toString();

        await UserModel.create(user);

        return res.status(200).json({msg: 'Usuário cadastrado com sucesso'});

    }catch(e: any){
        console.log('Erro: ', e);
        res.status(500).json({error: 'Ocorreu um erro ao cadastrar um usuário'});
    }
}

export default connectToDB(endpoint);