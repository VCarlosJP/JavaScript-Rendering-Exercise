# JavaScript Rendering Exercise

#### Exercise 1

Based on the data provided with a JSON structure of people, countries, studies, gender and blood group:

```json
webservice_data={
  people: [{uid: '1',name: 'Andrés',surname1: 'Gómez',age: 10,height: 180,weight:75},
           {uid: '2',name: 'María',surname1: 'Martínez',age: 40,height: 165,weight: 55},
           {uid: '3',name: 'Juan',surname1: 'Palacios',age: 85,height: 160,weight: 70},			   {uid: '4',name: 'Marta',surname1: 'Domingo',age: 25,height: 180,weight: 70},	  			 {uid: '5',name: 'Fausta',surname1: 'Sanz',age: 55,height: 155,weight: 45}],
    
  countries: [{id: '1',countryName: 'España',region: 'Europa'},
              {id: '2',countryName: 'Francia',region: 'Europa'},
              {id: '3',countryName: 'Colombia',region: 'America'},
              {id: '4',countryName: 'Japón',region: 'Asia'},],
    
  studies: [{id: '1',level: 'Universidad'},{id: '2',level: 'Instituto'},],
    
  gender: [{id: '1',type: 'Hombre'},{id: '2',type: 'Mujer'}],
    
  bloodType: [{id: '1',bloodName: 'A'},{id: '2',bloodName: 'B'},
              {id: '3',bloodName:'AB'},{id: '4',bloodName: 'O'}]
}
```

1. Assemble a JSON structure with the necessary relationships between these elements.
2. Paint a table like the one below.

<img src="C:\Users\carlo\AppData\Roaming\Typora\typora-user-images\image-20210113163025565.png" alt="image-20210113163025565" style="zoom: 80%;" />

#### Exercise 2

Based on the data from exercise

1. Shows the time UTC.
2. Shows the current time of each person based on their country.
3. Make a selector with a range of 1 in 1 from -10 to 10. When selecting an element, it will show the people with their country and time if they are in the UTC range + the value of the selector.

***To perform the calculations we may have to insert values in JSON structure to be able to calculate local UTC times***

<img src="C:\Users\carlo\AppData\Roaming\Typora\typora-user-images\image-20210113163931894.png" alt="image-20210113163931894" style="zoom:80%;" />

#### Exercise 3

Based on the data from exercise 1 and 2, we will add the continent of each person to the JSON structure and create a selector to filter by continent and show the data of the person or people.

#### Exercise 4

Based on exercise 3, we will add a link to display on a new page google maps with the person's country of origin.

