const fs = require("fs");

class Container {
  constructor() {}

  /**Todas estas funciones pueden usarse con productos o carritos */
  read(file) {
    let all = [];
    try {
      all = fs.readFileSync(file, "utf8");
      all.length > 0 ? (all = JSON.parse(all)) : (all = []);
    } catch (err) {
      console.log("Error en la lectura del archivo", err);
    }
    return all;
  }

  write(allArray, file) {
    // vuelvo a convertir el array en string  para guardarlo en el archivo
    let json = JSON.stringify(allArray);
    try {
      fs.writeFileSync(file, json);
    } catch (err) {
      console.log("Error en la escritura", err);
    }
  }

  /**CRUD */

  save(item, file) {
    // Recibo un objeto del array 
    console.log("Guardando...", item);
    // Consulto a la función getNextId para obtener proximo id disponible
    let nextId = this.getNextId(file);
    // Agrego la propiedad id al item
    item.id = nextId;
    // leo todos los archivos del file
    const allArray = this.read(file);
    // le agrego el nuevo item al array
    allArray.push(item);
    // Guardo el archivo
    this.write(allArray, file);
  }

  update(id, item, file) {
    console.log("Actualizando...", item);
    const allArray = this.read(file);
    let index = allArray.findIndex((item) => item.id == id);
    if (index >= 0) {
      item.id = id;
      allArray[index] = item;
      this.write(allArray, file);
    } else {
      console.log("No se encontro el item");
    }
  }

  getNextId(file) {
    let lastId = 0;
    let allArray = this.read(file);
    if (allArray.length > 0) {
      lastId = allArray[allArray.length - 1].id;
    }
    return lastId + 1;
  }

  getById(id, file) {
    let allArray = this.read(file);
    let item = allArray.find((item) => item.id == id);
    return item ? item : null;
  }

  getAll(file) {
    let allArray = this.read(file);
    return allArray;
  }

  deleteById(id, file) {
    let allArray = this.read(file);
    let index = allArray.findIndex((item) => item.id == id);
    if (index >= 0) {
      allArray.splice(index, 1);
      let json = JSON.stringify(allArray);
      try {
        fs.writeFileSync(file, json);
        return id;
      } catch (err) {
        console.log("Error en la escritura", err);
      }
    }
  }


}

module.exports = Container;
