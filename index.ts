import app from './src/app.js'; // Note the .js extension for NodeNext resolution

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is executing perfectly on http://localhost:${PORT}`);
});
