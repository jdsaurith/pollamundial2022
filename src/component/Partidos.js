import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, TableBody, TableCell, TableRow, TextField } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

const Partidos = ({ partidos, fecha, equipo1, equipo2, icon1, icon2, descripcion }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [input, setInput] = React.useState({})
    
    console.log(equipo1);
    console.log(icon1);
  
    const handleResultado = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
            partidos
        })
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
  return (
    <Card sx={{ maxWidth: 400, margin: 2 }}>
      <CardHeader        
        title={ equipo1 + ' Vs ' + equipo2  }
        subheader={fecha}
      />
      
      <CardContent>
        <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} spacing={2} >
              <Grid container justifyContent='center' alignItems='center' >
                <Grid item xs={6}>
                    <Avatar src={icon1}  sx={{ width: 46, height: 46 }} alt={equipo1} />                    
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                  required
                  type="number"
                  size="small"
                  name={equipo1}
                  label=""                  
                  value={input.equipo1}
                  onChange={handleResultado}
                  // className={}
                  color="secondary"
                  InputProps={{ inputProps: { min: "0", max: 5, step: "1" } }}
                  />
                </Grid>
              </Grid>                            
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Grid container justifyContent='center' alignItems='center' >                  
                  <Grid item xs={6}>
                    <TextField 
                    required
                    type="number"
                    size="small"
                    name={equipo2}
                    label=""                  
                    value={input.equipo2}
                    onChange={handleResultado}
                    // className={{  padding: '2' }}
                    color="secondary"
                    InputProps={{ inputProps: { min: "0", max: "5", step: "1" } }}
                    />
                  </Grid>
                  <Grid item xs={6} direction='row' display='flex' justifyContent='flex-end' alignItems='center' >
                    <Avatar src={icon2} sx={{ width: 46, height: 46 }} alt={equipo2} />
                  </Grid>
              </Grid>
            </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
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
          <Typography paragraph>{equipo1}</Typography>
          <Typography paragraph>
            { descripcion }
          </Typography>
          <Typography paragraph>{equipo2}</Typography>
          <Typography paragraph>
            { descripcion }
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Partidos
