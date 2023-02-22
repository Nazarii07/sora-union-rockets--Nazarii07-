import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { randomImage } from '@/services/common';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type RocketCardProps = {
	title: string,
	name: string,
	description: string, 
	userLabel: string,
	userAvatar: string,
	userValue: number, 
	handleDeleteRocket: () => void,
	handleEditRocket: () => void
}

export const RocketCard = ({
	title, 
	name, 
	description, 
	userLabel,
	userAvatar,
	userValue, 
	handleDeleteRocket,
	handleEditRocket
}: RocketCardProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={userAvatar}>
            {userLabel[0]}
          </Avatar>
        }
        title={userLabel}
        subheader={userValue}
      />
      <CardMedia
        component="img"
        height="250"
				width="250"
        image={randomImage(10)}
        alt="random rocket"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Rocket name: {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
				<IconButton onClick={handleDeleteRocket}>
					<DeleteIcon />
				</IconButton>
				<IconButton onClick={handleEditRocket}>
					<EditIcon />
				</IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{title}:</Typography>
          <Typography paragraph>
						{description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}