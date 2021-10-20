import { IService } from "./IService";
import { IUser } from "../component/UserPage/UserPage";
import { IUserData } from "../component/UserList/UserList";

enum COMMON {
	"NO_CACHE" = "no-cache",
	"HTTP" = "http",
	"HTTPS" = "https"
}

export class Service implements IService {
    public async getUserDetail(id: string): Promise<IUser> {
        return await fetch(
			`${COMMON.HTTPS}://reqres.in/api/users/${id}`,
			{
				cache: COMMON.NO_CACHE,
				headers: {
					Pragma: COMMON.NO_CACHE
				}
			}
		)
			.then(response => response.json())
			.then(response => {
				return response.data;
			});
    }
    
    public async getUsers(pageNumber: number): Promise<IUserData> {
        return await fetch(
			`${COMMON.HTTPS}://reqres.in/api/users?page=${pageNumber}`,
			{
				cache: COMMON.NO_CACHE,
				headers: {
					Pragma: COMMON.NO_CACHE
				}
			}
		)
			.then(response => response.json())
			.then(response => {
				return response;
			});
	}

	public async login(userName: string, password: string): Promise<IUserData> {
        return await fetch(
			`${COMMON.HTTPS}://reqres.in/api/login`,
			{
				cache: COMMON.NO_CACHE,
				// method: "Post",
				headers: {
					Pragma: COMMON.NO_CACHE
				},
				// body: JSON.stringify({email:userName, password:password})
			}
		)
			.then(response => response.json())
			.then(response => {
				if (response) {
					return response;
				} else {
					return Promise.reject(`${response.status} : ${response.statusText}`);
				}
			});
	}
}