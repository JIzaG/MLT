import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { id } from '@swimlane/ngx-charts/release/utils';




@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private db: AngularFirestore) { }

// Servicios para pacientes
addPacientes(patient, identidadPAC){
  return this.db.collection('/doctores/0801199023459/pacientes').doc(identidadPAC).set(patient);
}

getPacientes(){
  return this.db.collection('/doctores/0801199023459/pacientes').snapshotChanges();
}

getPacientesbyID(identidadPAC: string){
 return this.db.collection('/doctores/0801199023459/pacientes').doc(identidadPAC).get();
}

updatePacientes(id: string, record: {}){
  this.db.collection('/doctores/0801199023459/pacientes').doc(id).update(record);

}
deletePaciente(id: string){
  this.db.collection('/doctores/0801199023459/pacientes').doc(id).delete();
}

//---------------------------------------------------------------------------------------------------------------------------------
//Servicios para agenda
addAgendaPaciente(agendaPaciente){
  return this.db.collection('/agenda').add(agendaPaciente);

}

getAgendaPaciente(){
  return this.db.collection('/agenda').snapshotChanges();
}

deleteAgendaPaciente(id: string){
  this.db.collection('/agenda').doc(id).delete();
}

updateAgendaPacientes(id: string, record: {}){
  this.db.collection('/agenda').doc(id).update(record);

}



// delete_Student(record_id) {
//   this.firestore.doc('Students/' + record_id).delete();
// }


//Servicios para el perfil del doctor

getPerfilDoctor(){
  return this.db.collection('/doctores/0801199023459').snapshotChanges();
}


//Servicios para citas Clinicas

addCitaClinica(citaClinica){
  return this.db.collection('/doctores/0801199023459/pacientes/0501199601023/citasclinicas').add(citaClinica);

}

getCitasClinica(){
  return this.db.collection('/doctores/0801199023459/pacientes/0501199601023/citasclinicas').snapshotChanges();
}

updateCitaClinica(id: string, record: {}){
  this.db.collection('/doctores/0801199023459/pacientes/0501199601023/citasclinicas').doc(id).update(record);

}

deleteCitaClinica(id: string){
  this.db.collection('/doctores/0801199023459/pacientes/0501199601023/citasclinicas').doc(id).delete();
}



//Servicios para Tratamientos
addTratamiento(tratamiento){
  return this.db.collection('/doctores/0801199023459/pacientes/0501199601023/tratamientos').add(tratamiento);
}

getTratamiento(){
  return this.db.collection('/doctores/0801199023459/pacientes/0501199601023/tratamientos').snapshotChanges();
}

deleteTratmiento(id: string){
  this.db.collection('/doctores/0801199023459/pacientes/0501199601023/tratamientos').doc(id).delete();
}

updateTratmiento(id: string, record: {}){
  this.db.collection('/doctores/0801199023459/pacientes/0501199601023/tratamientos').doc(id).update(record);

}

// Servicios para Historia Clinica


}
