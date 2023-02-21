import { getLocalStorage, setLocalStorage } from "@/services/common";
import { getUsers } from "@/services/getUsers"
import { RocketType, UserRocketType } from "@/services/types";
import { Autocomplete, Box, Button, Dialog, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

type CreateRocketModalProps = {
	open: boolean,
	setOpen: (value: boolean) => void,
	currentItem: RocketType | null,
	setCurrentItem: (value: RocketType | null ) => void,
	currentIndex: number | null,
}

export const CreateRocketModal = ({
	open, 
	setOpen,
	currentItem,
	setCurrentItem,
	currentIndex, 
}: CreateRocketModalProps) => {
	const [users, setUsers] = useState<UserRocketType[]>([]);

	const initialValues: RocketType = {
		id: null,
		title: '',
		name: '',
		description: '',
		user: {
			avatar: '',
			label: '',
			value: 0
		}
	}

	const clearHandler = (): void => {
		setCurrentItem(null);
		setOpen(false);
	}

	const handleSubmit = (values: RocketType ) => {
		const list = getLocalStorage('list');
		
		if (currentItem) {
				const updatedList = list.reduce((acc: RocketType[], item: RocketType, index: number) => {
						if (index === currentIndex) {
								acc.push(values);
						} else {
								acc.push(item);
						}

						return acc;
				}, []);
				setLocalStorage('list', [...updatedList]);
				clearHandler()
				
				return
		}

		const newRocket = {
			...values,
			id: Math.random().toString(36).substring(2,9),
		}

		setLocalStorage('list', [...list, newRocket]);
		clearHandler()
};

const formik = useFormik(
	{
		initialValues: currentItem ?? initialValues,
		onSubmit: handleSubmit,
	}
)

	const handleChangeAutocomplete = (value: UserRocketType | null) => {
		formik.setFieldValue("user", value)
	}

	const handleUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		const result = await getUsers(value)
		setUsers(result)
	}

	const handleClose = () => {
		setOpen(false)
		setCurrentItem(null);
	}
	
    return(
			<Box>
				<Dialog
					open={open}
					onClose={handleClose}
				>
						<DialogTitle>
							{currentItem ? "Edit rocket" : "Create rocket"}
							{open ? (
								<IconButton
									aria-label="close"
									onClick={handleClose}
									sx={{
										position: 'absolute',
										right: 8,
										top: 8,
										color: (theme) => theme.palette.grey[500],
									}}
								>
									<CloseIcon />
								</IconButton>
							) : null}
						</DialogTitle>
					<Box px={3} pt={1} pb={3}>
						<form onSubmit={formik.handleSubmit}> 
							<Grid container spacing={3}>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth 
										label="Title"
										name="title" 
										onChange={formik.handleChange}
										value={ formik.values.title}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth 
										label="Name"
										name="name"
										onChange={formik.handleChange}
										value={formik.values.name}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										fullWidth 
										label="Description" 
										name="description"
										onChange={formik.handleChange}
										value={formik.values.description}
										multiline
										maxRows={10}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Autocomplete
										fullWidth
										value={formik.values.user?.label as any ?? ""}
										onChange={(e, value) => handleChangeAutocomplete(value)}
										options={users}
										renderInput={(params) => {
											return(
												<TextField 
													{...params} 
													label="User" 
													onChange={handleUser} 
													name="user" 
												/>
											)}}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										fullWidth 
										variant="contained" 
										color="primary"
										type="submit"
									>
										{currentItem ? "Edit" : "Create"}
									</Button>
								</Grid>
							</Grid>
						</form>
					</Box>
				</Dialog>
			</Box>
    ) 
}