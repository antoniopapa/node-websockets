import {io} from '../socket'
import {Message} from "../entities/message.entity";

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
        content: req.body.content
    })

    io.emit("message", message.content)

    res.send('success');
}
