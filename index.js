
var webservice_data = {
    people: [
    { uid: '1', name: 'Andrés', surname1: 'Gómez', age: 10, height: 180,
   weight: 75 },
    { uid: '2', name: 'María', surname1: 'Martínez', age: 40, height: 165,
   weight: 55 },
    { uid: '3', name: 'Juan', surname1: 'Palacios', age: 85, height: 160,
   weight: 70 },
    { uid: '4', name: 'Marta', surname1: 'Domingo', age: 25, height: 180,
   weight: 70 },
    { uid: '5', name: 'Fausta', surname1: 'Sanz', age: 55, height: 155,
   weight: 45 }
    ],
    countries: [
    { id: '1', countryName: 'España', region: 'Europa' },
    { id: '2', countryName: 'Francia', region: 'Europa' },
    { id: '3', countryName: 'Colombia', region: 'America' },
    { id: '4', countryName: 'Japón', region: 'Asia' },
    ],
    studies: [
    { id: '1', level: 'Universidad' },
    { id: '2', level: 'Instituto' },
    ],
    gender: [
    { id: '1', type: 'Hombre' },
    { id: '2', type: 'Mujer' }
    ],
    bloodType: [
    { id: '1', bloodName: 'A' },
    { id: '2', bloodName: 'B' },
    { id: '3', bloodName: 'AB' },
    { id: '4', bloodName: 'O' }
    ]
   }

let dataFromWebService = {
    users: []
}

//Se reemplaza la propiedad uid por simplemente id para luego colocarse en un array que tendra todo nuestro json
webservice_data.people.map((user, index)=>{
    webservice_data.people[index]['id'] = webservice_data.people[index]['uid'];
    delete webservice_data.people[index]['uid'];
    dataFromWebService.users.push(webservice_data.people[index]);
});

webServiceProperties = ['countries', 'studies', 'gender', 'bloodType'];

webservice_data.people.forEach((user,index) => {
    webServiceProperties.forEach(propertie=>{
        webservice_data[propertie].forEach(element=>{
            if(element.id === user.id){
                for(let propertie in element){
                    user[propertie] = element[propertie];
                }
            }
        });
    })
    
});


renderData(dataFromWebService.users, 'names', 'body');

//HardCoder Data
let utcTimes = {España:{utc:'+1', maps:'https://bit.ly/3mGxNwK'}, Francia:{utc:'+1', maps:'https://bit.ly/2HTkjPw'}, Colombia:{utc:'-5', maps:'https://bit.ly/35Qh8A5'}, Japón:{utc:'+9', maps:'https://bit.ly/35SCLjt'}};
let regions = ['America', 'Asia', 'Oceania', 'Europa']; 

//Se inserta la diferencia UTC al pais correspondiente dentro de nuestro JSON principal
dataFromWebService.users.forEach((user)=>{
    if(user.countryName in utcTimes){
        user['utc'] = utcTimes[user.countryName].utc;
        user['maps'] = utcTimes[user.countryName].maps;
    }
        
})

//UTC
let date = new Date();
let hour = date.getUTCHours();
let minutes = date.getUTCMinutes();
let seconds = date.getUTCSeconds();

var timeContainer = document.getElementById('utc_time');
var header = document.createElement('h2');
header.innerText = `Hora UTC ${hour}:${minutes}:${seconds}`
timeContainer.appendChild(header);

renderTableUTC();


//Creación de Selects
for (var i = -10; i < 11; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    document.getElementById('utc_select').appendChild(option);
}

regions.forEach(region=>{
    var option = document.createElement("option");
    option.value = region;
    option.text = region;
    document.getElementById('region_select').appendChild(option);
});

//Funciones
//-----------------------------------------------
function renderData(data, header, body ){
    var tr = document.getElementById(header);
    for(let colummn_name in data[0]){
        var th = document.createElement('th');
        th.innerHTML = colummn_name;
        tr.appendChild(th);
    }
    data.forEach((element, index)=>{
        var trBody = document.createElement('tr');
        for(let column in data[0]){
            if(element[column]!=undefined){
                var td = document.createElement('td');
                if(column == 'maps'){
                    var a = document.createElement('a');
                    a.innerText='Maps';
                    a.href=element[column];
                    a.target='_blank';
                    td.appendChild(a);
                 }
                 else
                    td.innerHTML =element[column];
                 trBody.appendChild(td);
            }
            else{
                var td = document.createElement('td');
                td.innerHTML ='';
                trBody.appendChild(td);
            }
        }
        var bodyTable = document.getElementById(body);
        bodyTable.appendChild(trBody);
    })
}


function renderTableUTC(){
    //Creación de Header
    var tr = document.getElementById('names2');
    var trBody = document.createElement('tr');
    dataFromWebService.users.forEach((user)=>{
        if(user.countryName!=undefined){
            var th = document.createElement('th');
            th.innerHTML = user.name+'('+user.countryName+')';
            tr.appendChild(th);
        }
    })
    //Creación del Body
    dataFromWebService.users.forEach((user)=>{
        if(user.countryName!=undefined){
            var td = document.createElement('td');
            td.innerHTML = calculateTime(user);
            trBody.appendChild(td);
        }
    })
    var bodyTable = document.getElementById('body2');
    bodyTable.appendChild(trBody)
}

function selectUTC(e){
    var matchedUTC = document.getElementById('matched_utc');
    matchedUTC.innerHTML = "";
    var value = e.target.value;
    if(value>=0)
        value='+'+value

    dataFromWebService.users.forEach((user)=>{
        if(value == user.utc){
            var paragraph = document.createElement('p');
            paragraph.innerText = `${user.name} está en ${user.countryName} donde son ahora las ${calculateTime(user)}`;
            matchedUTC.appendChild(paragraph);
        }
    })
}

function selectRegion(e){
    var tableHead = document.getElementById('names');
    var tableBody = document.getElementById('body');
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    var filteredUsers = [];
    var value = e.target.value;

    dataFromWebService.users.forEach((user)=>{
        if(value == user.region)
            filteredUsers.push(user);
    })

    renderData(filteredUsers, 'names', 'body');
}

function calculateTime(data){
    if(data.utc.slice(0,1)=='+'){
        if(hour+parseInt(data.utc.slice(1,3)) >= 24)
           return (hour+parseInt(data.utc.slice(1,3))-24)+':'+minutes+':'+seconds;
        else
           return (hour+parseInt(data.utc.slice(1,3)))+':'+minutes+':'+seconds;
    }
    else{
        if(hour-parseInt(data.utc.slice(1,3)) < 0)
           return (hour-parseInt(data.utc.slice(1,3))+24)+':'+minutes+':'+seconds;
        else
          return (hour-parseInt(data.utc.slice(1,3)))+':'+minutes+':'+seconds;
    }
}
