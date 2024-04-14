import {io} from '../socket'
import {Message} from "../entities/message.entity";
import multer from "multer";
import {extname} from 'path';

export const Messages = async (req, res) => {
    const user = req["user"]
    const take = 10
    const page = parseInt(req.query.page || '1')
    const [messages, total] = await Message.findAndCount({
        where: [
            {sender: {id: user.id}},
            {receiver: {id: user.id}}
        ],
        relations: ["sender", "receiver"],
        skip: (page - 1) * take,
        take,
    })

    res.send({
        messages,
        total
    })
}

export const SendMessage = async (req, res) => {
    const user = req["user"]

    const message = await Message.save({
        sender: user,
        receiver: {id: req.body.receiver_id},
        content: req.body.content,
    })

    io.emit("message", message)

    res.send('success');
}

export const SendImage = async (req, res) => {
    const user = req["user"]

    const storage = multer.diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
            const randomName = Math.random().toString(20).substring(2, 12);
            return callback(null, `${randomName}${extname(file.originalname)}`)
        }
    })

    const upload = multer({storage}).single('image')

    upload(req, res, async (err) => {
        if (err) {
            return res.send(400).send(err)
        }

        const message = await Message.save({
            sender: user,
            receiver: {id: req.body.receiver_id},
            content: `http://localhost:8000/api/images/${req.file.filename}`,
            type: 'image'
        })

        io.emit("message", message)

        res.send(message)
    })
}
