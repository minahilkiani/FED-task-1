//global variables
var element=null;
var num_elements; // used to get grid dimension
var container=document.getElementById("container");

//returns an array of n number of elements
function createArray(n){ 
    var arr=[];
    for (i=1;i<=n;i++){
        arr.push(i);}
    return arr   
}

//returns an array after shuffling the array passed in the argument
function shuffleArray(list){
    for (let i=list.length-1; i>0;i--){
        const j= Math.floor(Math.random() * (i));
        const temp=list[i];
        list[i]=list[j];
        list[j]=temp;}
    return list
}

//creates grid of size AxA on the screen
function createGrid(){
    document.getElementById('btn').style.display='none';
    var size=window.prompt('Input the grid size A where grid will be A x A',3);
    num_elements=size*size;
    var count=0;
    var created_list=createArray(num_elements);
    var shuffled_list=shuffleArray(created_list);
    for (i=0;i<size;i++){
        let row=document.createElement('div');
        container.appendChild(row).className='rows';
        for (j=0;j<size;j++){
            let cell=document.createElement('div');
            if (count<num_elements) {
                cell.innerHTML=shuffled_list[count];
                setAttributes(cell);
                container.appendChild(cell);
                count++;
            }
        }
    }
    createSubmitButton();
}

//adds attributes as well as event listeners for element
function setAttributes(element){
    element.setAttribute("draggable","true");
    element.setAttribute("class","cells");
    element.addEventListener("dragover", dragOver);
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('drop', dragDrop);
    element.addEventListener("dragend", dragEnd);
}
//creates a submit button when user wants to check result
function createSubmitButton(){
    const btn2=document.createElement("button");
    btn2.setAttribute("class","btn");
    btn2.setAttribute("id","btn2");
    btn2.addEventListener("click",checkResult);
    btn2.textContent="Let's go";
    container.appendChild(btn2);
}
//handlers for drag and drop events
function dragStart(e) {
    this.style.opacity = "0.5";
    element=this;
    e.dataTransfer.setData('text/html',this.innerHTML);
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop(e) {
    if (element !== this) {
        element.innerHTML = this.innerHTML
        this.innerHTML = e.dataTransfer.getData('text/html');}
}
function dragEnd(e){
    this.style.opacity = "1";
}

//checks if cells are in correct order
function checkResult(){
    const items = document.querySelectorAll(".cells");
    let final = [];
    let  result;

    items.forEach( item => {
        var i = item.innerHTML;
        final.push(i);
    })

    for (let i = 0; i < num_elements-1; i++) {
        if (final[i+1]-final[i] ===1) {
            result = true;
            continue;
        }
        else {
            result = false;
            break;
        }
    }
    console.log(result)
    if(result === true) {
        window.alert("Welcome to the team!");
    }
    else window.alert("Try Again!");
}
