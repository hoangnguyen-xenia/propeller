import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Chip,
  Grid,
  Skeleton,
  Stack,
  Box,
  CardMediaProps,
} from '@mui/material';
import { upperFirstLetter } from '../../utils/string';
import { styled } from '@mui/system';

const CardWrapper = styled(Card)`
  height: 100%;
`;

const CardMediaWrapper = styled(CardMedia)<
  CardMediaProps & { component: string; alt: string }
>`
  height: 300px;
  object-fit: contain;
`;
type PokemonDetail = {
  id: string;
  abilities: [];
  sprites: any;
  weight: number;
  height: number;
  name: string;
};

export default function ItemCard({
  pokemon,
  isLoading,
}: {
  pokemon: PokemonDetail;
  isLoading: boolean;
}) {
  const showInfo = (name: string, value: number | string) => (
    <Grid container>
      <Grid item xs={4}>
        <strong>{name}: </strong>
      </Grid>
      <Grid item xs={8}>
        {value}
      </Grid>
    </Grid>
  );
  const showAbilities = () => (
    <Grid container>
      <Grid item xs={4}>
        <strong>Abilities </strong>
      </Grid>
      <Grid item xs={8}>
        <Stack direction={'row'} flexWrap="wrap">
          {pokemon.abilities.map((p: any) => (
            <Box mb={1} mr={1}>
              <Chip label={p.ability.name} color="primary" variant="outlined" />
            </Box>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
  return (
    <CardWrapper>
      {!isLoading ? (
        <CardMediaWrapper
          component="img"
          image={pokemon.sprites.other.dream_world.front_default}
          alt="green iguana"
        />
      ) : (
        <Skeleton variant="rectangular" animation="wave" height={300} />
      )}
      <CardContent>
        {!isLoading ? (
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              <strong>#{pokemon.id}</strong> {upperFirstLetter(pokemon.name)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {showInfo('Weight', pokemon.weight)}
              {showInfo('Height', pokemon.height)}
              {showAbilities()}
            </Typography>
          </Box>
        ) : (
          <>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
          </>
        )}
      </CardContent>
    </CardWrapper>
  );
}
