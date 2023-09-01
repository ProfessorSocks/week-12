/*



*/

let url = 'https://64eeabbf219b3e2873c3646f.mockapi.io';

fetch(`${url}/students`)
    .then(res => res.json())
    .then(data => {
        showStudents(data);
    })
    .catch(err => console.log(err))


function showStudents(students){
    console.log(students);

    const card = document.createElement('div');

    const pic = document.createElement('img');
    const name = document.createElement('h2');
    const country = document.createElement('p');
    const delbtn = document.createElement('button');


    card.setAttribute('class','card');
    name.innerText = students[0].name;
    country.innerText = students[0].country;
    pic.src = students[0].avatar;

    card.append(pic,name,country);

    document.body.append(card)


}



