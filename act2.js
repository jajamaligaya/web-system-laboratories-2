const title = document.getElementById('title')
const artist = document.getElementById('artist')
const submit = document.getElementById('btn')
const ul = document.getElementById('songlist')

submit.addEventListener('click', ()=>{
    
    //create elemet 
    const newTitle = title.value
    const newArtist = artist.value

    const p = document.createElement('p')
    const small = document.createElement('small')
    const li = document.createElement('li')

    //set value to the element
    p.innerHTML = newTitle;
    small.innerHTML = newArtist;

    //add class to element
    p.classList.add('mb-0');
    small.classList.add('artist');
    li.classList.add('list-group-item')

    //xreate container
    
    li.append(p);
    li.append(small);

    console.log(li)

    //append list
    ul.append(li)

})



console.log (li)