import app from './app';
import { PORT } from './constants';

app.listen(PORT, () => {
  console.log(`Prettier service running on port ${PORT}`);
});
