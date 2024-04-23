import {io} from '../socket'
import {Message} from "../entities/message.entity";
import multer from "multer";
import {extname} from 'path';

export const Messages = async (req, res) => {
    const room = req["room"]
    const take = 10
    const page = parseInt(req.query.page || '1')
    const [messages, total] = await Message.findAndCount({
        where: {room},
        relations: ["sender", "receiver"],
        skip: (page - 1) * take,
        take,
        order: {created_at: 'DESC'}
    })

    res.send({
        messages: messages.sort((a, b) => Date.parse(a.created_at) > Date.parse(b.created_at) ? 1 : -1),
        total
    })
}

export const SendMessage = async (req, res) => {
    const user = req["user"]
    const room = req["room"]

    const message = await Message.save({
        sender: user,
        room,
        content: req.body.content,
    })

    io.emit("message", message)

    res.send('success');
}

export const SendImage = async (req, res) => {
    const user = req["user"]
    const room = req["room"]

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
            room,
            content: `http://localhost:8000/api/images/${req.file.filename}`,
            type: 'image'
        })

        io.emit("message", message)

        res.send(message)
    })
}
