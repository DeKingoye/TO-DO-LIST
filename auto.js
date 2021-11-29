const bloc= []
const categories=[
    {id:1,name:"urgent",variant:"danger"},
    {id:2,name:"important",variant:"success"},
    {id:3,name:"pas important",variant:"primary"},
]

const $main= document.querySelector("main")
const $addBloc= document.querySelector("#add-bloc")



setInterval(() => {
    const $addtask=document.querySelectorAll(".add")
    $addBloc.addEventListener("submit", addBloc)
if($addtask){
    $addtask.forEach(element => {
        element.addEventListener("click",function(e){
            addcard(e.target.getAttribute("rel"))
        })
    });
}
}, 500);


function hideform(i){
    document.querySelector("#action-addcard-"+i).classList.remove("hidden")
    document.querySelector("#add-card-"+i).classList.add("hidden")
}


function displayform(i){
    document.querySelector("#action-addcard-"+i).classList.add("hidden")
    document.querySelector("#add-card-"+i).classList.remove("hidden")
}


function addBloc(e){
    e.preventDefault()
    const form=e.target
    const namebloc=form.querySelector("input[name=namebloc]")
    if(namebloc.value.trim()!=''){
        if (!bloc.some(b=>b.name==namebloc.value.trim().toUpperCase())){
            if (bloc.length==0){
                $main.classList.remove('hidden')
            } 
            bloc.push({name: namebloc.value.trim().toUpperCase(),cards:[]})
            namebloc.value=""
            displaybloc(bloc)
        }
        else{
            alert("nom de bloc existe dejà")
        }
       
    }
    
}
function displaycategories(){
    let content=""
    categories.forEach((element,i) => {
        content+=`
        <div><input name="${element.name}" value="${i}" type="checkbox"> ${element.name} <span class="bg-${element.variant} category-items"></span></div>
        `
        
    });
    return content

}
function addcard(blocid){
   
    const form=document.querySelector("#add-card-"+ blocid)
    
   
    const task= form.querySelector("textarea[name=task]")
    if(task.value.trim()!=""){
        let objet={
            task:task.value.trim(),
            categories:[]                
        }
        const listcategories= form.querySelectorAll("input[type=checkbox]:checked")
        listcategories.forEach(element => {
            objet.categories.push(categories[parseInt(element.value)])
        });
        bloc[blocid].cards.push(objet)
        task.value=""
        displaybloc(bloc)
        hideform(blocid)
    }
}

function displaybloc(blocelement){
    let content= ""
    blocelement.forEach((element,i) => {
    
        content+= `
        <section class="bloc">
            <div class="title">${element.name} - <a onclick="deletebloc(${i})" href="#" class="text-danger">X</a></div>
            <div class="add-card"><a onclick="displayform(${i})" id="action-addcard-${i}" href="#"><i class="fa fa-plus"></i> Ajouter une tâche</a></div>
            <form onsubmit="return false" data-bloc="${i}" id="add-card-${i}" action="" class="mb-5 hidden">
                <div class="group">
                    <textarea class="" name="task"  cols="30" rows="10" placeholder="saisissez une..."></textarea>
                </div>
                <div class="group flex-row">
                    ${displaycategories()}
                </div>
                <div class="">
                    <button class="btn bg-primary add" type="button" rel="${i}">Ajouter une tâche</button>
                    <a onclick="hideform(${i})" class="text-danger ml-4" href="#">Annuler</a>
                </div>
            </form>
            `
            element.cards.reverse()
            element.cards.forEach((item,j) => {
                content+=`<div class="card">
                <div class="category">`
                item.categories.forEach(elm => {
                    content+=`<span class="bg-${elm.variant} category-items"></span>`
                });
                    
                content+=` 
                </div> 
                <div class="content">
                    ${item.task}
                </div>
                <a onclick="deletecard(${i},${j})" href="#" class="delete text-danger"><i class="fa fa-trash"></i></a>
            </div>
                `
                
            });
            
        
        content+=`</section>`
    });
    $main.innerHTML=content
}
function deletebloc(index){
    if(confirm("cet action va supprimer définitivement le bloc : "+bloc[index].name)){
        bloc.splice(index,1)
        displaybloc(bloc)
    }
}
function deletecard(blocid,cardid){
    if(confirm("cet action va archiver la tâche")){
        bloc[blocid].cards.splice(cardid,1)
        displaybloc(bloc)
    }
}