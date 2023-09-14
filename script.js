const etat = document.getElementById("etat");
const date = document.getElementById("date");
const form = document.getElementById('form');
const p = document.getElementById('p');
const list = document.getElementById('list');
const titre = document.getElementById("titre");
const gagnant = document.getElementById("gagnant");
const priorite = document.getElementById("priorite");
const btnAjout = document.getElementById("btnAjout");
const btnTirage = document.getElementById("btnTirage");
const btnAjouter = document.getElementById("btnAjouter");
const erreurEtat = document.querySelector(".erreurEtat");
const erreurDate = document.querySelector(".erreurDate");
const btnAfficher = document.getElementById("btnAfficher");
const description = document.getElementById("description");
const erreurTitre = document.querySelector(".erreurTitre");
const aucuneTache = document.getElementById('aucuneTache');
const tableau = document.querySelector("#tableParticipants");
const erreurPriorite = document.querySelector(".erreurPriorite");
const tableauContainer = document.getElementById("tableau_container");
const erreurDescription = document.querySelector(".erreurDescription");

let tableauDeDonnees = [];

btnAjouter.addEventListener("click", function (e) {
  e.preventDefault(); // Empêche la soumission du formulaire

  // Obtenez les valeurs des champs du formulaire
  const titre = document.getElementById("titre").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const etat = document.getElementById("etat").value;
  const priorite = document.getElementById("priorite").value;

  const nouvelleTache = {
    titre: titre,
    description: description,
    date: date,
    etat: etat,
    priorite: priorite
  };

  // Ajoutez cet objet à l'objet de données
  const cle = Date.now(); // Utilisez une clé unique (par exemple, timestamp)
  if (titre.trim() == "")
    erreurTitre.removeAttribute("hidden");
  else if (description.trim() == ""){ 
    erreurDescription.removeAttribute("hidden");
    erreurTitre.setAttribute("hidden",'');
  }
  else if (date.trim() == "") {
    erreurDate.removeAttribute("hidden");
    erreurTitre.setAttribute("hidden",'');
    erreurDescription.setAttribute("hidden",'');
  }
  else if (etat.trim() == ""){ 
    erreurEtat.removeAttribute("hidden");
    erreurDate.setAttribute("hidden",'');
    erreurTitre.setAttribute("hidden",'');
    erreurDescription.setAttribute("hidden",'');
  }
  else if (priorite.trim() == ""){ 
    erreurPriorite.removeAttribute("hidden");
    erreurDate.setAttribute("hidden",'');
    erreurEtat.setAttribute("hidden",'');
    erreurTitre.setAttribute("hidden",'');
    erreurDescription.setAttribute("hidden",'');
  }
  else{
    erreurDate.setAttribute("hidden",'');
    erreurEtat.setAttribute("hidden",'');
    erreurTitre.setAttribute("hidden",'');
    erreurPriorite.setAttribute("hidden",'');
    erreurDescription.setAttribute("hidden",'');
    tableauDeDonnees[cle] = nouvelleTache;
    mettreAJourTableauHTML();
    ajouterElementAvecSucces();
  }
});

function mettreAJourTableauHTML() {
    const tableau = document.getElementById("tableParticipants"); // Obtenez la référence au tableau HTML
  
    // Effacez le contenu existant du tableau
    tableau.innerHTML = "";

      for (const cle in tableauDeDonnees) {
        if (tableauDeDonnees.hasOwnProperty(cle)) {
          const tache = tableauDeDonnees[cle];
          const nouvelleLigne = document.createElement("tr");
          const celluleTitre = document.createElement("td");
          const celluleDescription = document.createElement("td");
          const celluleDate = document.createElement("td");
          const celluleEtat = document.createElement("td");
          const btnEtat = document.createElement("button");
          const cellulePriorite = document.createElement("td");
          
          celluleTitre.textContent = tache.titre;
          celluleDescription.textContent = tache.description;
          celluleDate.textContent = tache.date;
          celluleEtat.textContent = tache.etat;
          btnEtat.textContent = 'Terminer';
          celluleEtat.appendChild(btnEtat);
          cellulePriorite.textContent = tache.priorite;
          celluleEtat.style.color = 'blue';
          btnEtat.style.marginLeft = '15px';
          btnEtat.style.borderRadius = '5px';
          btnEtat.style.padding = '3px 10px';
          
          btnEtat.addEventListener('click', () =>{
            celluleEtat.style.color = 'gray';
            btnEtat.style.backgroundColor = 'white';
            btnEtat.style.color = 'blue';
            btnEtat.style.border = 'white 1px solid';
          })
          
          nouvelleLigne.appendChild(celluleTitre);
          nouvelleLigne.appendChild(celluleDescription);
          nouvelleLigne.appendChild(celluleDate);
          nouvelleLigne.appendChild(celluleEtat);
          nouvelleLigne.appendChild(cellulePriorite);
          
          tableau.appendChild(nouvelleLigne);
          afficherTableau();
          titre.value = '';
          description.value = '';
          date.value = '';
          etat.value = '';
          priorite.value = '';  
        }
      }
    }
  mettreAJourTableauHTML();

function afficherTableau() {
  // Créez une représentation HTML du tableau
  for (const key in tableau) {
    if (tableau.hasOwnProperty.call(tableau, key)) {
      const element = tableau[key];
      tableHTML = `
      ${element === 'En cours' ? `
      <tr>
        <td>${element}</td>
        <td><button>Terminer</button></td>
      </tr>
    ` : `
      <tr>
        <td>${element}</td>
        <td><button>Terminer</button></td>
        <td></td>
      </tr>
    `}
      </tbody>
    </table>
      `;
      tableauContainer.innerHTML = tableHTML;
    }
  }
}

function ajouterElementAvecSucces() {
  p.removeAttribute('hidden');
  setTimeout(function () {
    p.setAttribute('hidden','')
  }, 3000);
}

  
function ObjetEstVide(obj) {
  return Object.keys(obj).length === 0;
}

btnAfficher.onclick = function() {
  if(ObjetEstVide(tableauDeDonnees))
      aucuneTache.removeAttribute('hidden');
  else
    list.removeAttribute('hidden');
  form.setAttribute('hidden','');

}

btnAjout.onclick = function() {
  form.removeAttribute('hidden');
  list.setAttribute('hidden', '');
  aucuneTache.setAttribute('hidden', '');

}


//--------------------------------------------------------------------------------

// let tabParticipants = [];
// function ObjetEstVide(obj) {
//     return Object.keys(obj).length === 0;
// }

// btnAfficher.onclick = function() {
//     if(ObjetEstVide(tabParticipants))
//         aucuneTache.removeAttribute('hidden');
//     else
//       list.removeAttribute('hidden');
//     form.setAttribute('hidden','');

// }

// btnAjout.onclick = function() {
//     form.removeAttribute('hidden');
//     list.setAttribute('hidden', '');
//     aucuneTache.setAttribute('hidden', '');

// }

// btnAjouter.onclick = function () {
//     tabParticipants.push(titre.value, description.value, date.value, etat.value, priorite.value);
//     // tabParticipants.titre = titre.value
//     // tabParticipants.description = description.value
//     // tabParticipants.date = date.value
//     // tabParticipants.etat = etat.value
//     // tabParticipants.priorite = priorite.value
//     // console.log(tabParticipants);
//     // ajoutparticipant();
//     affichetab();
// }
  

// function affichetab() {
//     tableParticipants.innerHTML = "";
//     for(let tab in tabParticipants){
//        let element = tabParticipants[tab];
//        console.log(element);
//        tableParticipants.innerHTML += `
//         <p>${element}</p>
//        `;
//     }
//     // tableParticipants.innerHTML += `
//     //   <p>${tabParticipants.titre}</p>
//     //   <p>${tabParticipants.description}</p>
//     //   <p>${tabParticipants.date}</p>
//     //   <p>${tabParticipants.etat}</p>
//     //   <p>${tabParticipants.priorite}</p>`;
// }
  
//   function ajoutparticipant() {
//     //
//   }