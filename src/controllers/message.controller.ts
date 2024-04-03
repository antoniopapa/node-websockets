import {io} from '../socket'

export const Message = (req, res) => {
    io.emit("message", req.body.message);
    console.log(req.body.message)
    res.send('success');
}
