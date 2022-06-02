import app from './app';

const port:number = app.get('port');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});