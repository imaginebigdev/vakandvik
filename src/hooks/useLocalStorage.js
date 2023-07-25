import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [sortedValue, setSortedValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setUniqueStringValue = (value) => {
    try {
      const newValue = Array.isArray(value) ? value : [value];
      setSortedValue(newValue);

      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [sortedValue, setUniqueStringValue];
}

// import React from "react";

// /**
//  * Hook para manejar el almacenamiento local persistente utilizando el localStorage.
//  *
//  * @param {string} key - La clave utilizada para almacenar y recuperar el valor del localStorage.
//  * @param {any} initialValue - El valor inicial a utilizar si no existe ningún valor en el localStorage bajo la clave dada.
//  * @returns {[object, function, function]} - Un array con el estado actual, una función para agregar o actualizar un producto en el carrito y una función para eliminar un producto del carrito.
//  */
// export function useLocalStorage(key, initialValue) {
//   const [sortedValue, setSortedValue] = React.useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       return initialValue;
//     }
//   });

//   /**
//    * Agrega o actualiza un producto en el carrito y lo guarda en el localStorage.
//    *
//    * @param {string} prodId - El ID del producto a agregar o actualizar.
//    * @param {number} cantidad - La cantidad del producto a agregar o actualizar.
//    */
//   const setUniqueStringValue = (prodId, cantidad) => {
//     try {
//       setSortedValue((prevState) => {
//         const newProdIds = prevState.prodId.slice();
//         const newCantidades = prevState.cantidad.slice();
//         const index = newProdIds.indexOf(prodId);

//         if (index === -1) {
//           newProdIds.push(prodId);
//           newCantidades.push(cantidad);
//         } else {
//           newCantidades[index] = cantidad;
//         }

//         const newItem = {
//           prodId: newProdIds,
//           cantidad: newCantidades,
//         };

//         window.localStorage.setItem(key, JSON.stringify(newItem));
//         return newItem;
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   /**
//    * Elimina un producto del carrito y actualiza el localStorage.
//    *
//    * @param {string} prodId - El ID del producto a eliminar del carrito.
//    */
//   const removeFromCart = (prodId) => {
//     try {
//       const newProdIds = sortedValue.prodId.slice();
//       const newCantidades = sortedValue.cantidad.slice();

//       const index = newProdIds.indexOf(prodId);

//       if (index !== -1) {
//         newProdIds.splice(index, 1);
//         newCantidades.splice(index, 1);

//         const newItem = {
//           prodId: newProdIds,
//           cantidad: newCantidades,
//         };

//         setSortedValue(newItem);
//         window.localStorage.setItem(key, JSON.stringify(newItem));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return [sortedValue, setUniqueStringValue, removeFromCart];
// }
