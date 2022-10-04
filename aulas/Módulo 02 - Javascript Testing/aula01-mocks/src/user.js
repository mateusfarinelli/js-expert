class User {
  constructor({ name, id, profession, age }){
    this.name = name;
    this.id = parseInt(id);
    this.profession = profession;
    //Alterado 'age' para birthDay
    this.birthDay = new Date().getFullYear() - age;
  }
}
module.exports = User