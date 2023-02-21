import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, IconButton, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';


const useStyles = makeStyles(() => ({
  rocketCard:{
		minHeight: '200px',
		marginBottom: '50px',
		border: '1px solid black',
		borderRadius: '25px',
		padding: '25px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	rocketIconBox: {

	},
	rocketInfoBox:{

	},
	buttonsBox:{
		display: 'flex'
	},
	rocketMainInfoBox:{

	}
 
}));

type RocketCardProps = {
	title: string,
	name: string,
	description: string, 
	userLabel: string, 
	handleDeleteRocket: () => void,
	handleEditRocket: () => void
}


export const RocketCard = ({
		title, 
		name, 
		description, 
		userLabel, 
		handleDeleteRocket,
		handleEditRocket
	}: RocketCardProps) => {
		
	const classes = useStyles();

    return(
        <Card className={classes.rocketCard}>
					<Box className={classes.rocketIconBox}>
						icon
					</Box>
					<Box className={classes.rocketInfoBox} >
						<Box className={classes.buttonsBox} >
							<Box>
								<IconButton onClick={handleEditRocket}>
									<EditIcon />
								</IconButton>
							</Box>
							<Box>
								<IconButton onClick={handleDeleteRocket}>
									<DeleteIcon />
								</IconButton>
							</Box>
						</Box>
						<Box className={classes.rocketMainInfoBox}>
							<Typography>
								{title}
							</Typography>
							<Typography>
								{name}
							</Typography>
							<Typography>
								{description}
							</Typography>
							<Typography>
								{userLabel}
							</Typography>
						</Box>
					</Box>
        </Card>
    )
}