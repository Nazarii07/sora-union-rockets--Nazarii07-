export type UserRocketType = {
	avatar: string,
	label: string,
	value: number
}

export type RocketType = {
	id: number | null,
	title: string,
	name: string,
	description: string,
	user: UserRocketType
}
