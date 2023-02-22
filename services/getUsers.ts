import { Octokit } from "octokit"


export const getUsers = async (searchValue: string): Promise<any> => {
	const octokit = new Octokit({
		auth: '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'
	})
	try{
		const { data } = await octokit.request('GET /search/users', {q: searchValue})
		return data.items.reduce((acc: any, item: any) =>{
			acc.push({
				label: item.login,
				value: item.id,
				avatar: item.avatar_url
			})
			return acc;
		},[])
	}
	catch(error){
		console.log(error)
	}
}