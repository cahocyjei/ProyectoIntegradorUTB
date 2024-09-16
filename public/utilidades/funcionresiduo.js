/**
 * @INICIO Esta función devuelve un número par. Recibe dos parametros
 * numerador y denominador.
 */

export const numeroPar = (num, den ) => {
  const count_row = 0;
  const residuo = num.length % den;
  if (residuo == 0) {
    count_row = num.length / den;
  } else {
    count_row = Math.round((num.length / den) + 1);
  };
  return count_row;
}
