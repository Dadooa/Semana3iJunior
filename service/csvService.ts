import fs from 'fs';
import path from 'path';
import { Item } from '../model/Item';

const CSV_PATH = path.resolve(__dirname, '..', '..', 'estoque.csv');

export function lerCSV(): Item[] {
  try {
    if (!fs.existsSync(CSV_PATH)) {
      return [];
    }

    const data = fs.readFileSync(CSV_PATH, 'utf-8').trim();
    if (!data) {
      return [];
    }

    const linhas = data.split('\n');
    const items: Item[] = linhas.map((linha) => {
      const [nome, peso, valor, quantidade] = linha.split(',');
      return {
        nome: nome.trim(),
        peso: Number(peso),
        valor: Number(valor),
        quantidade: Number(quantidade),
      };
    });

    return items;
  } catch (error) {
    console.error('Erro ao ler CSV:', error);
    return [];
  }
}

export function escreverCSV(items: Item[]): void {
  try {
    const linhas = items.map((item) => {
      return `${item.nome},${item.peso},${item.valor},${item.quantidade}`;
    });
    const conteudo = linhas.join('\n');
    fs.writeFileSync(CSV_PATH, conteudo, { encoding: 'utf-8' });
  } catch (error) {
    console.error('Erro ao escrever CSV:', error);
  }
}
