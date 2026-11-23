import app from './app.js'
import sequelize from './src/config/database.js';
import './src/models/relaciones.js';

async function main() {

  try {
      const init = process.argv[2];

      if (init) 
        await sequelize.sync({ force: true});
      else
        await sequelize.sync({ force: false}); 

      console.log('Base de datos sincronizada!')

      const PORT = Number(process.env.VARIANTE_C_API_PORT ?? '3006');

      app.listen(PORT, '127.0.0.1', () => {
        console.log('Aplicación ejecutándose en el puerto ' + PORT);
      })
  } catch (error) {
    console.log(error)
  }

}

main();
