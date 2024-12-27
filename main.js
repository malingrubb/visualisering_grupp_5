const url = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN';

const body = {
    "query": [
      {
        "code": "Region",
        "selection": {
          "filter": "vs:RegionLän07",
          "values": ["01", "03", "04", "05", "06", "07", "08", "09", "10", "12", "13", "14", "17", "18", "19", "20", "21", "22", "23", "24", "25"]
        }
      },
      {
        "code": "Tid",
        "selection": {
          "filter": "item",
          "values": ["2000", "2005", "2010", "2015", "2020"]
        }
      }
    ],
    "response": {
      "format": "px"
    }
  };
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));