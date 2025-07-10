import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface MovieCardProps {
  id: string;
  imageUrl: string;
  title: string;
  rating: number;
  onAdd?: (movie: { id: string; title: string; imageUrl: string; rating: number }) => void;
  onRemove?: (movieId: string) => void;
  isAdded: boolean;
}

function MovieCard({ id, imageUrl, title, rating, onAdd, onRemove, isAdded }: MovieCardProps) {
  const [isInMyList, setIsInMyList] = useState(isAdded);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    setIsInMyList(isAdded);
  }, [isAdded]);

  const handleRemoveClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmRemove = () => {
    onRemove?.(id);
    setOpenConfirmDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleAddClick = () => {
    onAdd?.({ id, title, imageUrl, rating });
  };

  return (
    <>
      <Card className="h-fit py-2 px-1 mx-auto my-4 shadow-xl shadow-black rounded-xl"
      sx={{width: '18rem'}}>
        <CardMedia
          component="img"
          className="w-full h-80 object-cover"
          image={imageUrl}
          alt={title}
        />
        <CardContent className="p-4">
          <div className="flex justify-between over items-center mb-2">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="text-lg h-6 font-semibold items-start text-stone-800 "
            >
              {title}
            </Typography>
            <div className="flex items-center text-gray-800 text-md font-bold px-3 rounded-full">
              <span className="mr-1">⭐</span>
              {rating.toFixed(1)}
            </div>
          </div>
        </CardContent>
        <CardActions className="p-4 mt-2">
          <Button
            size="small"
            variant="contained"
            color={isInMyList ? 'error' : 'primary'}
            onClick={isInMyList ? handleRemoveClick : handleAddClick}
            className="w-full"
          >
            {isInMyList ? 'Remover da Lista' : 'Adicionar à Lista'}
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px', // Bordas arredondadas
            width: '1000px',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Remove from your library
        </DialogTitle>
        <DialogContent>
          <DialogContentText
          sx={{ fontSize: '20px', color: '#333', padding: '30px 10px' }}>
            Are you sure you want to remove "{title}" from your library? It contains an audio review and you will lose it if you remove.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button 
            onClick={handleCloseDialog} 
            variant='contained'
            color='info'
            sx={{ borderRadius: '8px', width: '50%' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmRemove} 
            variant='contained'
            color = "error"
            sx={{ borderRadius: '8px', width: '50%' }} 
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MovieCard;