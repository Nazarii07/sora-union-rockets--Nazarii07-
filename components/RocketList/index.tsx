import { Button, Grid } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import { RocketCard } from '../RocketCard';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@/services/common';
import { RocketType } from '@/services/types';
import { CreateRocketModal } from '../rocketModal';


const useStyles = makeStyles(() => ({
  rocketContainer:{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
 
}));


export const RocketList = () => {
	const classes = useStyles();
	const [rocketList, setRocketList] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<RocketType | null >(null);
  const [currentIndex, setIndex] = useState<number | null>(null);

  useEffect(() => {
    !open && setRocketList(getLocalStorage('list'));
  }, [open]);


	const handleEdit = (item: RocketType, index: number) => {
    setIndex(index);
    setCurrentItem(item);
    setOpen(true);
  };

  const handleAdd = () => {
    setOpen(true);
  };


	const handleDelete = (id: number) => {
    const updatedList = rocketList.reduce((acc, item, index) => {
      if (index !== id) {
          acc.push(item);
      }

      return acc;

     
    }, []);
    setLocalStorage('list', updatedList);
    setRocketList(updatedList);
  };

    return(
			<Grid container spacing={3}>
				<Grid item xs={12} mt={5}>
						<Button
							variant='contained'
							onClick={handleAdd}
						>
							🚀 Add new rocket
						</Button>
						{open ? 
							<CreateRocketModal 
							open={open} 
							setOpen={setOpen} 
							currentItem={currentItem} 
							setCurrentItem={setCurrentItem} 
							currentIndex={currentIndex} 
							/> : null
						}
				</Grid>
				{rocketList.map((item: RocketType, index: number) => {
							return(
								<Grid item md={3} xs={12} key={item.id}>
									<RocketCard 
										title={item.title}
										name={item.name}
										description={item.description}
										userLabel={item.user.label}
										handleDeleteRocket={() => handleDelete(index)}
										handleEditRocket={() => handleEdit(item, index)}
									/>
								</Grid>
							)
						})}
			</Grid>
    )
}