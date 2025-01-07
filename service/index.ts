import { exibirMenuPrincipal } from '../controller/controleEstoque';

exibirMenuPrincipal()
  .then(() => {
    console.log('Aplicação finalizada.');
  })
  .catch((err) => {
    console.error('Erro inesperado:', err);
  });