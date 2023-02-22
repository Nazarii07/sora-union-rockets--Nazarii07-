import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { RocketCard } from '../RocketCard';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@/services/common';
import { RocketType } from '@/services/types';
import { CreateRocketModal } from '../rocketModal';


export const RocketList = () => {
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
			<Grid 
				container 
				spacing={3}
				style={{
					background: '#f5f5f5',
					paddingBottom: '40px',
					borderRadius: '5px',
					marginTop: '10px',
					marginBottom: '10px',
					paddingRight: '24px',
					boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 15%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
				}}
			>
				<Grid item xs={12} >
						<Button
							variant='contained'
							onClick={handleAdd}
						>
							🚀 Add new rocket
						</Button>
						<Box pt={3}>
							<Divider />
						</Box>
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
				{!rocketList.length ?
					<Grid item xs={12}>
						<Box pt={3} display="flex" justifyContent="center">
							<Typography variant="h4">Rocket list is empty, please create a new rocket! 🚀 </Typography>
						</Box>
				  </Grid>
					:
					null
				}
				{rocketList.map((item: RocketType, index: number) => {
							return(
								<Grid item md={3} sm={6} xs={12} key={item.id}>
									<RocketCard 
										title={item.title}
										name={item.name}
										description={item.description}
										userLabel={item.user.label}
										userAvatar={item.user.avatar}
										userValue={item.user.value}
										handleDeleteRocket={() => handleDelete(index)}
										handleEditRocket={() => handleEdit(item, index)}
									/>
								</Grid>
							)
						})}
			</Grid>
    )
}