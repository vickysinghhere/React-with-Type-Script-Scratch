import { IUser } from "../component/UserPage/UserPage";
import { IUserData } from "../component/UserList/UserList";

export interface IService {
	/**
	 * Function used to get user detail
	 * @param id unique identifier for user
	 * @returns response promise
	 */
	getUserDetail(id: string): Promise<IUser>;
	
	/**
	 * Function used to get users data
	 * @param pageNumber Page Number
	 * @returns response promise
	 */
	getUsers(pageNumber: number): Promise<IUserData>;

	/**
	 * Function used to get token for authentication
	 * @param userName username of the user
	 * @returns response promise
	 */
	login(userName: string, password: string): Promise<IUserData>
}