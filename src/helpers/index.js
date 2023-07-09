const calcularTotalPagar = (cantidad, plazo) => {
    let total;

    // Mientras mayor es la cantidad, menor es el interes
    if(cantidad < 5000) {
        total = cantidad * 1.5; // 50%
    } else if(cantidad >= 5000 && cantidad < 10000) {
        total = cantidad * 1.4; // 40%
    } else if(cantidad >= 10000 && cantidad < 15000) {
        total = cantidad * 1.3; // 30%
    } else { // Si es mayor de 15000
        total = cantidad * 1.2; // 20%
    }

    // Plazo - Mas plazo, m ayor interes
    if(plazo === 6) {
        total *= 1.1; // 10%
    } else if(plazo === 12){
        total *= 1.2;
    } else {
        total *= 1.3;
    }

    return total; 
}

export {
    calcularTotalPagar,
}