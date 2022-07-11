import { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import ItemCard from './item';
import axios from 'axios';
import { Box } from '@mui/system';

type Pokemon = { name: string; url: string };
type PokemonDetail = {
  id: string;
  abilities: [];
  sprites: any;
  weight: number;
  height: number;
  name: string;
};

export default function PokemonContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [listPokemon, setListPokemon] = useState<PokemonDetail[]>([]);
  const [pageAction, setPageAction] = useState({
    next: '',
    prev: '',
  });

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const options = {
        url,
        method: 'GET',
        params: { limit: '10' },
      };
      const { data } = await axios.request(options);
      setPageAction({
        next: data.next,
        prev: data.previous,
      });
      const poke = data.results?.map(async (p: Pokemon) =>
        axios.get(p.url).then((r) => r.data)
      );
      const results: PokemonDetail[] = await Promise.all(poke);
      setListPokemon(results);
    } catch (error) {
      throw error;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [url]);

  return (
    <div>
      <Container>
        <Box my={2}>
          <Typography variant="h4">Pokemon</Typography>
        </Box>
        <Grid
          container
          spacing={2}
          alignItems="stretch"
          justifyContent={'center'}>
          {listPokemon.map((pokemon) => (
            <Grid key={pokemon.id} item xs={12} md={4} xl={3}>
              <ItemCard pokemon={pokemon} isLoading={isLoading} />
            </Grid>
          ))}
        </Grid>
        <Box display={'flex'} justifyContent="center" my={2}>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              onClick={() => {
                if (pageAction.prev) setUrl(pageAction.prev);
              }}>
              Prev
            </Button>
            <Button
              onClick={() => {
                if (pageAction.next) setUrl(pageAction.next);
              }}>
              Next
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
    </div>
  );
}
