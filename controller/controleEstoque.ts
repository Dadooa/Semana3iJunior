import {
    adicionarItem,
    removerItem,
    listarItens,
    valorTotal,
    pesoTotal,
    mediaValor,
    mediaPeso,
    quantidadeTotalItens,
    quantidadeTotalProdutos,
  } from '../service/serviceEstoque';
  import { Item } from '../model/Item';

  async function perguntar(pergunta: string): Promise<string> {
    process.stdout.write(pergunta);
  
    return new Promise((resolve) => {
      process.stdin.once('data', (data) => {
        resolve(data.toString().trim());
      });
    });
  }
  
  export async function exibirMenuPrincipal(): Promise<void> {
    let opcao = -1;
  
    while (opcao !== 0) {
      console.log('\n=== SISTEMA DE ESTOQUE ===');
      console.log('1. Adicionar Item');
      console.log('2. Remover Item');
      console.log('3. Listar Itens');
      console.log('4. Ver Valor Total');
      console.log('5. Ver Peso Total');
      console.log('6. Calcular Média de Valor');
      console.log('7. Calcular Média de Peso');
      console.log('8. Ver Quantidade Total de Itens');
      console.log('9. Ver Quantidade Total de Produtos');
      console.log('0. Sair\n');
  
      const resp = await perguntar('Digite a opção desejada: ');
      opcao = Number(resp);
  
      switch (opcao) {
        case 1:
          await adicionarItemFluxo();
          break;
        case 2:
          await removerItemFluxo();
          break;
        case 3:
          listarItensFluxo();
          break;
        case 4:
          console.log(`Valor total do inventário: R$ ${valorTotal().toFixed(2)}`);
          break;
        case 5:
          console.log(`Peso total do inventário: ${pesoTotal().toFixed(2)} kg`);
          break;
        case 6:
          console.log(`Média de valor: R$ ${mediaValor().toFixed(2)}`);
          break;
        case 7:
          console.log(`Média de peso: ${mediaPeso().toFixed(2)} kg`);
          break;
        case 8:
          console.log(`Quantidade total de itens: ${quantidadeTotalItens()}`);
          break;
        case 9:
          console.log(
            `Quantidade total de produtos (itens únicos): ${quantidadeTotalProdutos()}`
          );
          break;
        case 0:
          console.log('Saindo do sistema...');
          break;
        default:
          console.log('Opção inválida. Tente novamente.');
          break;
      }
    }
  
    process.stdin.pause();
  }
  
  async function adicionarItemFluxo(): Promise<void> {
    try {
      console.log('\n=== ADICIONAR ITEM ===');
      const nome = await perguntar('Nome (identificador único): ');
      const peso = Number(await perguntar('Peso (em kg): '));
      const valor = Number(await perguntar('Valor unitário (R$): '));
      const quantidade = Number(await perguntar('Quantidade: '));
  
      const novoItem: Item = { nome, peso, valor, quantidade };
      const resposta = adicionarItem(novoItem);
      console.log(resposta);
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  }
  
  async function removerItemFluxo(): Promise<void> {
    try {
      console.log('\n=== REMOVER ITEM ===');
      const nome = await perguntar('Informe o nome do item a ser removido: ');
      const confirmacao = (await perguntar('Confirma remoção? (S/N): ')).toUpperCase();
  
      if (confirmacao === 'S') {
        const resposta = removerItem(nome);
        console.log(resposta);
      } else {
        console.log('Remoção cancelada.');
      }
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  }
  
  function listarItensFluxo(): void {
    console.log('\n=== LISTAR ITENS ===');
    const itens = listarItens();
    if (itens.length === 0) {
      console.log('Nenhum item encontrado.');
      return;
    }
  
    console.log('Nome | Peso(kg) | Valor(R$) | Quantidade');
    itens.forEach((item) => {
      console.log(
        `${item.nome} | ${item.peso} | ${item.valor} | ${item.quantidade}`
      );
    });
  }  
