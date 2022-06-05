console.log(`"Adding brain to the app 😎😎"`);
showNotes();

// Node addition, by adding it to local storage

let addbtn=document.getElementById('addbtn').addEventListener("click",function(e){
    let addTxt= document.getElementById('addTxt');
    if (addTxt.textLength == 0) {
        alert("Please write something in text box first!")
    }
    else
    {
        let notes=localStorage.getItem("notes");
        if(notes == null) {
            notesObj=[];
        }
        else {
            notesObj=JSON.parse(notes);
        }
        console.log(addTxt.value);
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value="";
        console.log(notesObj);

        showNotes();
    }
    });

    // function  to show notes i.e., elements of the local storage
    function showNotes()
    {
        let notes=localStorage.getItem("notes");
        if(notes == null) {
            notesObj=[];
        }
        else {
            notesObj=JSON.parse(notes);
        }
            let html="";
            notesObj.forEach(function(element, index) {

                // editing the div by my-3 and mx-3 to create 3 spaces horizontally and vertically in the notes

                html += `<div class="card border-dark mb-3 my-3 mx-3 notecard" style="max-width: 18rem;">
                <div class="card-header">Note ${index+1}</div>
                <div class="card-body text-dark">
                  <h5 class="card-title"></h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
         
                </div>
              </div>`;
    });
    let notesElm=document.getElementById('notes');
    if(notesObj.length != 0)
    {
        notesElm.innerHTML=html;
       
    }
    else
    {
        notesElm.innerHTML=`<p><b>~~~Notes are Currently Empty, Use 👆 Add Note Section to create a Note~~~</b></p>`; 
    }
    }


//Deleting Notes
function deleteNote(index) {
    let notes=localStorage.getItem('notes');
    let notesObj=JSON.parse(notes);
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

//Search Function
let search=document.getElementById('SearchTxt');
search.addEventListener(`input`, function( ){
let inputval=search.value; 
let noteCards=document.getElementsByClassName('notecard');
Array.from(noteCards).forEach(function(element){
    let cardTxt=element.getElementsByTagName('p')[0].innerText;
    if(cardTxt.includes(inputval))
    {
        element.style.display='block';
    }
    else
    {
        element.style.display='none';
    }
})
})