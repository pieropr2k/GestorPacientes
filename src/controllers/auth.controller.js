import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import { findUserByEmail, createUser, findUserById } from "../models/user.model.js";
import ClientModel from "../models/client.model.js";

export const register = async (req, res) => {
    const {
        document_num,
        document_type,
        first_name,
        last_name,
        email,
        phone,
        address,
        role,
        gender,
        birth_date,
        password,
    } = req.body;

    console.log(req.body, "body");

    try {
        // Verificar si el email ya está en uso
        const userFound = await findUserByEmail(email);
        if (userFound) return res.status(400).json({ message: "The email is already in use" });

        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        console.log(document_num, document_type)
        // Crear el usuario
        const userId = await createUser({
            id: document_num,
            document_type,
            role,
            first_name,
            last_name,
            email,
            phone,
            address,
            gender,
            birth_date,
            password: passwordHash,
            registration_date: new Date(),
        });

        if (role === 'client') {
            const {
                document_num,
                height,
                weight,
                emergency_contact_name,
                emergency_contact_phone,
                emergency_contact_relationship,
            } = req.body;
            ClientModel.createClient({
                document_num,
                height,
                weight,
                emergency_contact_name,
                emergency_contact_phone,
                emergency_contact_relationship
            })
        }

        // Generar un token de acceso
        const token = await createAccessToken({ id: userId });

        // Configurar la cookie del token
        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
        });

        res.json({ id: userId, first_name, last_name, email });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const userFound = await findUserByEmail(email);
        if (!userFound) return res.status(400).json({ message: "The email does not exist" });

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "The password is incorrect" });

        // Generar un token de acceso
        const token = await createAccessToken({ id: userFound.id });

        // Configurar la cookie del token
        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
        });

        res.json({
            id: userFound.id,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            email: userFound.email,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    try {
        // Verificar el token
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const userFound = await findUserById(decoded.id);
        if (!userFound) return res.sendStatus(401);

        res.json({
            id: userFound.id,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            email: userFound.email,
        });
    } catch (err) {
        return res.sendStatus(401);
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    return res.sendStatus(200);
};
