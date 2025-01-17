import express from 'express';
import cors from 'cors';
import nominations from './data/golden-globes.json';

const port = process.env.PORT || 8080
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Here is the Golden globes api!');
});

app.get('/nominations', (req, res) => {

  const { nominees } = req.params;
  const allNominations = nominations;

  if (nominees) {
    allNominations = allNominations.filter(
      (nominees) => nominations.nominees.toLowerCase() === nominees.toLowerCase()
    );
  };

  res.status(200).json({
    data: allNominations,
    success: true,

  });
});

app.get('/years/:year', (req, res) => {

  const { film } = req.params;

  const filmYear = years.find((year) => year.film.toLowerCase() === film.toLowerCase());

  if (!filmYear) {
    res.status(404).json({
      data: 'Not found',
      success: false,

    });
  } else {
    res.status(200).json({

      data: filmYear,
      success: true,
    });
  }
});

app.get('/category/:category', (req, res) => {
  const { category } = req.params;

  let filmCategory = nominations

  if (category) {
    filmCategory = filmCategory.filter((film) =>
    formatString(film.category).includes(category));
  }

    res.status(404).json({
      data: 'Not found',
      success: false,
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

