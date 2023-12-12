import {Request, Response} from "express";
import {Status} from "../../utils/interfaces/Status";


export function signOutController(request: Request, response: Response): Response<Status> {
    const {session} = request
    session?.destroy(() => {})
    const status: Status = {status:200, message: 'logged out successful', data: null}
    return response.json(status)
}