import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

  useEffect(() => {
    setIsInMyList(isAdded);
  }, [isAdded]);

  const handleToggleMyList = () => {
    if (isInMyList) {
      onRemove?.(id);
    } else {
      onAdd?.({ id, title, imageUrl, rating });
    }
  };
return (
    <Card className="w-72 h-fit py-2 px-1 mx-auto my-4 shadow-xl shadow-black rounded-xl">
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
          color={isInMyList ? "error" : "primary"} 
          onClick={handleToggleMyList}
          className="w-full">
          {isInMyList ? 'Remover da Lista' : 'Adicionar à Lista'}
        </Button>
      </CardActions>
    </Card>
  );
}


export default MovieCard