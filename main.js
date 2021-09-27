const countrieslist = document.getElementById("countries")
let countries ; 

countrieslist.addEventListener("change" ,event => displayCountryInfo(event.target.value))


fetch("https://restcountries.com/v3/all")
.then(res =>  res.json())
.then( (data)=>  initalize(data))
.catch ( (err) => console.log("Error: ", err))


function initalize(countryData)
{
    
    countries = countryData.sort((a,b) => {
        a = a.name.common
        b = b.name.common
        return  (a > b) ? 1 : -1;     
    });

    let option = "" ;
 
    
    countries.forEach(ele => 
         option+=`<option value="${ele.cca3}">${ele.name.common}</option>`
    );
    countrieslist.innerHTML = option;
    console.log(countrieslist.selectedIndex)
   
    countrieslist.selectedIndex = Math.floor(Math.random()*countrieslist.length)
    displayCountryInfo(countrieslist[countrieslist.selectedIndex].value) ;
}

function displayCountryInfo(country_code_alfa)
{
    
    const countryData  = countries.find(country=> country.cca3 === country_code_alfa )
    var arr =[]
    for (i in countryData.currencies) arr.push(countryData.currencies[i]);  
    document.getElementById("flag-container").innerHTML = `<img src="${countryData.flags[1]}" alt="${countryData.flag}" width="502" height="256">`
    document.getElementById("capital").innerHTML=countryData.capital
    document.getElementById("dialing-code").innerHTML=countryData.idd.root +  countryData.idd.suffixes
    document.getElementById("lat-lang").innerHTML = countryData.latlng[0] + ","+countryData.latlng[1]
    document.getElementById("region").innerHTML = countryData.region
    document.getElementById("subregion").innerHTML = countryData.subregion
    document.getElementById("currency").innerHTML = arr.filter(ele=>ele.name).map(ele => `${ele.name} (${ele.symbol})`).join(", ");


}