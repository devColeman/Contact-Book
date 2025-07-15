console.log('Hey does this thing work?')

const favoriteIcon = document.querySelectorAll('.favoriteIcon')

Array.from(favoriteIcon).forEach((element)=>{
    element.addEventListener('click', favoriteContact)
})

async function favoriteContact() {
    const favoriteIcons = this.parentNode.childNodes[1].classList
    try{
        const response = await fetch('/favorite', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': favoriteIcons // this is the id that is being send to the server
              // next we need to find the correct collection using the id then change the status
              // lookup how to change status
            })
          })
        const data = await response.json()
        console.log(data)
         if (response.ok) {
            console.log('before reload')
            location.reload()
        } else {
            console.error('Failed to favorite contact')
        }

    }catch(err){
        console.log(err)
    }
}