import {Request, Response} from "express";
import {Status} from "../../utils/interfaces/Status";

/**
* Handles the logic for signing out a user by destroying the session object and returning a response to the client indicating success
* @param request
* @param response
*/


export function signOutController(request: Request, response: Response): Response<Status> {
    const {session} = request
    session?.destroy(() => {})
    const status: Status = {status:200, message: 'logged out successful', data: null}
    return response.json(status)
}