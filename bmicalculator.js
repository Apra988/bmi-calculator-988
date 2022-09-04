var http = require('http');

//json input provided.
var json_data = [{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, {"Gender": "Male", "HeightCm": 161,
                "WeightKg":85 }, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, { "Gender": "Female",
                "HeightCm": 166,"WeightKg": 62}, {"Gender": "Female", "HeightCm": 150, "WeightKg": 70},
                {"Gender": "Female","HeightCm": 167, "WeightKg": 82}];
 
console.log("INPUT:");  
console.table(json_data); //json input in a table.
  var total_people_count=json_data.length   //total elements of json data.
  var overweight_cnt = 0;
  for(i=0; i<total_people_count; i++){
    heightM = json_data[i].HeightCm/100.0    //convert cm to m.
    body_mass_index = (json_data[i].WeightKg/(heightM*heightM));  //calculate BMI
    //BOC to assign category and health risk to each person.
    if(body_mass_index < 18.5){
      category = "Under Weight";
      health_risk = "Malnutrition risk";
    }else if(body_mass_index >= 18.5 && body_mass_index <= 24.9){
        category = "Normal weight";
        health_risk = "Low risk";
    }else if (body_mass_index >= 25 &&  body_mass_index <= 29.9){
        category = "Overweight";
        health_risk = "Enhanced risk";
        overweight_cnt = overweight_cnt + 1;
    }else if (body_mass_index >= 30 &&  body_mass_index <= 34.9){
        category = "Moderately obese";
        health_risk = "Medium risk";
    }else if (body_mass_index >= 35 &&  body_mass_index <= 39.9){
        category = "Severely obese";
        health_risk = "High risk";
    }else if (body_mass_index >= 40){
        category = "Very Severely obese";
        health_risk = "Very risk";
    }
    //EOC to assign category and health risk to each person.
    json_data[i]["BMI"] = body_mass_index;
    json_data[i]["Category"] = category;
    json_data[i]["HealthRisk"] = health_risk;
  }
  console.log("OUTPUT:");
  console.table(json_data);
  console.log("overweight Count - "+ overweight_cnt);

  const server=http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});   
  res.write('<table border=1>');           
  res.write(                                       
    '<tr><th>Person</th><th>BMI</th><th>Category</th><th>HealthRisk</th></tr>');
  for(i=0; i<total_people_count; i++){
    res.write(
      '<tr><td>Person ' + i + "</td><td>" + json_data[i].BMI +"</td><td>"+json_data[i].Category+"</td><td>"+json_data[i].HealthRisk+"</td></tr>");
  }
  res.write('</table>');
  res.write('<br><br>OverWeight Count - ' + overweight_cnt);
  res.end()
}).listen(8081); // port which the website can be accessed in http://localhost:8080/
