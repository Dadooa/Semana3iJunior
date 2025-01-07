import { Item } from '../model/Item';
import { lerCSV, escreverCSV } from './csvService';

export function listarItens(): Item[] {
  const items = lerCSV();
  return items;
}

export function adicionarItem(novoItem: Item): string {
  const items = lerCSV();
  const existe = items.some((item) => item.nome === novoItem.nome);
  if (existe) {
    return `Não foi possível adicionar. O nome "${novoItem.nome}" já está em uso.`;
  }
  items.push(novoItem);
  escreverCSV(items);
  return `Item "${novoItem.nome}" adicionado com sucesso!`;
}

export function removerItem(nome: string): string {
  const items = lerCSV();

  const index = items.findIndex((item) => item.nome === nome);
  if (index === -1) {
    return `Item "${nome}" não encontrado.`;
  }

  const removido = items.splice(index, 1);
  escreverCSV(items);
  return `Item "${removido[0].nome}" removido com sucesso!`;
}
export function valorTotal(): number {
  const items = lerCSV();
  return items.reduce((acc, item) => acc + item.valor * item.quantidade, 0);
}
export function pesoTotal(): number {
  const items = lerCSV();
  return items.reduce((acc, item) => acc + item.peso * item.quantidade, 0);
}
export function mediaValor(): number {
  const items = lerCSV();
  if (items.length === 0) return 0;

  const total = valorTotal();
  const totalItens = items.reduce((acc, item) => acc + item.quantidade, 0);

  return total / totalItens;
}
export function mediaPeso(): number {
  const items = lerCSV();
  if (items.length === 0) return 0;

  const total = pesoTotal();
  const totalItens = items.reduce((acc, item) => acc + item.quantidade, 0);

  return total / totalItens;
}
export function quantidadeTotalItens(): number {
  const items = lerCSV();
  return items.reduce((acc, item) => acc + item.quantidade, 0);
}
export function quantidadeTotalProdutos(): number {
  const items = lerCSV();
  return items.length;
}
