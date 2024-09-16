import { DbAvocados } from '../db-data/dbavocados.js'

export function BuscarProductoBycodigo(cod) {
  for (let i = 0; i < DbAvocados[0][0].length; i++) {
    if (cod == DbAvocados[0][0][i]) {
      const avocado = [cod, DbAvocados[1][i], 
      DbAvocados[0][1][i], 
      DbAvocados[0][2][i],
      DbAvocados[2][i],
      DbAvocados[3][i],
      DbAvocados[4][i]
    ]
    return avocado; 
    break;
    }
  }
  return null;
}