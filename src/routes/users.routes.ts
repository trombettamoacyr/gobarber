import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return response.json(users);
});

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name: name,
            email: email,
            password: password,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.status(201).json(userWithoutPassword);
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

export default usersRouter;