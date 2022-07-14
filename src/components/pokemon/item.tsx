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
  Divider,
} from '@mui/material';
import { getColorByType, upperFirstLetter } from '../../utils/string';
import { styled } from '@mui/system';

const CardWrapper = styled(Card)`
  height: 100%;
  background-color: ${({ color }) => color};
`;

const CardMediaWrapper = styled(CardMedia)<
  CardMediaProps & { component: string; alt: string }
>`
  height: 300px;
  object-fit: contain;
  border-radius: 16px;
  width: 80%;
  margin: auto;
`;

const WhiteTextTypography = styled(Typography)`
  color: '#FFFFFF';
`;
const ChipWrapper = styled(Chip)<{ colorType: string }>`
  background-color: #ffffff;
  color: ${({ colorType }) => colorType};
`;

const WhiteCardContent = styled(CardContent)`
  background-color: #ffffff;
  border-radius: 8px;
  margin-top: 8px;
`;

export type PokemonDetailProps = {
  id: string;
  abilities: [];
  sprites: any;
  weight: number;
  height: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  stats: any[];
};

export default function ItemCard({
  pokemon,
  isLoading,
}: {
  pokemon: PokemonDetailProps;
  isLoading: boolean;
}) {
  const showInfo = (name: string, value: number | string) => (
    <>
      <Grid container py={0.5}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">
            <>{name} </>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography textAlign="end">
            <small>{value}</small>
          </Typography>
        </Grid>
      </Grid>
      <Divider flexItem />
    </>
  );

  const showAbilities = (name: string) => (
    <Stack direction={'row'} flexWrap="wrap">
      {pokemon.abilities.map((p: any) => (
        <Box mb={1} mr={1}>
          <ChipWrapper
            size="small"
            label={p.ability.name}
            colorType={getColorByType(pokemon.types[0].type.name)}
          />
        </Box>
      ))}
    </Stack>
  );

  return (
    <CardWrapper color={getColorByType(pokemon.types[0].type.name)}>
      <Box p={2}>
        <WhiteTextTypography>
          #{pokemon.id} {upperFirstLetter(pokemon.name)}
        </WhiteTextTypography>
        {showAbilities('')}
        {!isLoading ? (
          <CardMediaWrapper
            component="img"
            image={pokemon.sprites.other.dream_world.front_default}
            alt="green iguana"
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave" height={300} />
        )}
        <WhiteCardContent>
          {!isLoading ? (
            <>
              {showInfo('Weight', pokemon.weight)}
              {showInfo('Height', pokemon.height)}
              {pokemon.stats.map((p) =>
                showInfo(upperFirstLetter(p.stat.name), p.base_stat)
              )}
            </>
          ) : (
            <>
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </>
          )}
        </WhiteCardContent>
      </Box>
    </CardWrapper>
  );
}
