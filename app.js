console.log(`"Adding brain to the app 😎😎"`);
showNotes();

// Node addition, by adding it to local storage

let addbtn=document.getElementById('addbtn').addEventListener("click",function(e){
    let addTxt= document.getElementById('addTxt');
    let addTitle =document.getElementById('addTitle');
    if (addTxt.textLength == 0 || addTitle.textLength == 0) {
        if(addTxt.textLength==0 && addTitle.textLength!=0)
        {
            alert("Please write something in Create Note box !");
          addTxt.setAttribute('class','form-control is-invalid');
        }
    else if(addTxt.textLength!=0 && addTitle.textLength==0)
    {
        alert("Please write something in Add Note Title box !");
        addTitle.setAttribute('class','form-control is-invalid');
    }
    else
    {
        alert("Please enter both note and tile");
        addTxt.setAttribute('class','form-control is-invalid');
        addTitle.setAttribute('class','form-control is-invalid');
    }
    }
    else
    {
        addTxt.setAttribute("class","form-control");
        addTitle.setAttribute("class","form-control");
        let notes=localStorage.getItem("notes");
        let titles=localStorage.getItem("titles");
        if(notes == null) {
            notesObj=[];
            titleObj=[];
        }
        else {
            notesObj=JSON.parse(notes);
            titleObj=JSON.parse(titles);
        }
        //saving note
        console.log(addTxt.value);
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value="";
        console.log(notesObj);
        //saving title
        titleObj.push(addTitle.value);
        localStorage.setItem("titles", JSON.stringify(titleObj));
        addTitle.value="";
        console.log(titleObj);
        showNotes();
    }
    });

    // function  to show notes i.e., elements of the local storage
    function showNotes()
    {
        let titleObj;
        let notes=localStorage.getItem("notes");
        let titles=localStorage.getItem("titles");
        if(notes == null) {
            notesObj=[];
            titleObj==[];
        }
        else {
            notesObj=JSON.parse(notes);
            titleObj=JSON.parse(titles);
        }
            let html="";
            notesObj.forEach(function(element, index) {

                // editing the div by my-3 and mx-3 to create 3 spaces horizontally and vertically in the notes

                html += `<div class="card border-dark mb-3 my-3 mx-3 notecard" style="max-width: 18rem;">
                <div class="card-header"><b>${titleObj[index]}</b></div>
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
    let titleObj;
    let notes=localStorage.getItem('notes');
    let notesObj=JSON.parse(notes);
    notesObj.splice(index,1);

    let titles=localStorage.getItem('titles');
    titleObj=JSON.parse(titles);
    console.log(titleObj);
    titleObj.splice(index,1);
    localStorage.setItem('titles',JSON.stringify(titleObj));
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