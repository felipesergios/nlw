function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states =>{
        for(const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
       
    })
}
populateUFs()

function getCitys(event){    
    const citySelect = document.querySelector("select[name=cidade]")
    const stateInput = document.querySelector("input[name=state]")
    //console.log(event.target.value)



    const param = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text



    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${param}/municipios`
    citySelect.innerHTML = ""
    citySelect.disabled = true
    fetch(url)
    .then(res => res.json())
    .then(citys =>{
        
        for(const city of citys){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
       
    })
}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCitys)
const colectedItems = document.querySelector("input[name=items]")
let selectedItems = []
function handleSelecteditem(event){
    const itemLI = event.target
    const itemID=itemLI.dataset.id
    itemLI.classList.toggle("selected")
    const alreadySelected = selectedItems.findIndex(function(item){
    const itemFound = item ==itemID   
    return itemFound 
    })
    if(alreadySelected >= 0){
        const filterItems = selectedItems.filter(item =>{
            const itemsDifferent = item != itemID
            return itemsDifferent
        })
        selectedItems = filterItems
    }else{
        selectedItems.push(itemID)
    }
    colectedItems.value = selectedItems
    
}



const itensToColect = document.querySelectorAll(".itens-grid li")
for(const item of itensToColect){
    item.addEventListener("click",handleSelecteditem)
}