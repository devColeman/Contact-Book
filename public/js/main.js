

const favoriteIcon = document.querySelectorAll('.favoriteIcon')
const unFavoriteIcon = document.querySelectorAll('.unFavoriteIcon')


Array.from(unFavoriteIcon).forEach((element)=>{
    element.addEventListener('click', unFavoriteContact)
})

async function unFavoriteContact() {
    let unFavoriteIcons = this.parentNode.childNodes[1].innerHTML
    try{
        const response = await fetch('/unFavorite', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': unFavoriteIcons 

            })
          })
        const data = await response.json()
        console.log(data)
         if (response.ok) {
            console.log('before reload')
            location.reload(true)
        } else {
            console.error('Failed to favorite contact')
        }

    }catch(err){
        console.log(err)
    }
}

Array.from(favoriteIcon).forEach((element)=>{
    element.addEventListener('click', favoriteContact)
})

async function favoriteContact() {
    let favoriteIcons = this.parentNode.childNodes[1].innerHTML
    console.log(favoriteIcons)
    try{
        const response = await fetch('/favorite', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': favoriteIcons 

              // change the passed data to name and use the name of the contact for the update

              // this is the id that is being send to the server
              // next we need to find the correct collection using the id then change the status
              // lookup how to change status
            })
          })
        const data = await response.json()
        console.log(data)
         if (response.ok) {
            console.log('before reload')
            location.reload(true)
        } else {
            console.error('Failed to favorite contact')
        }

    }catch(err){
        console.log(err)
    }
}