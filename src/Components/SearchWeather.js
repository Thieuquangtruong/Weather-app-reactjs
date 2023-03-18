import React, { useState } from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function SearchWeather() {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  let connect = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=53d2b9e5ffc4c41135c1487777c28306`
      );
      if (connect) {
        const temp = await response.json();
        setData(temp);
      }
      return () => {
        connect = false;
      };
    };
    fetchWeather();
  }, [search]);
  console.log("tqt", data);

  //date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", {month:"long"});
  let day = d.toLocaleString('default',{weekday:"long"})
  //time
  let time =  d.toLocaleString([],{
    hour: '2-digit',
    minute : '2-digit',
    second: '2-digit'
  })
  
  const handSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Card className="bg-dark text-white text-center boder-0">
              <Card.Img
                style={{ height: "450px" }}
                src="https://images.unsplash.com/photo-1670278901783-9f8a07b5849a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fG5hdHVyYWwlMjA2MDAlMjB4OTAwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Card.ImgOverlay>
                <form onSubmit={handSubmit}>
                  <InputGroup className="mb-4 w-7 mx-auto">
                    <Form.Control 
                      type="Search"
                      clas="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e)=>setInput(e.target.value)}
                      required
                    />
                    <button type="submit" id="basic-addon2">
                      <i class="fas fa-search-location"></i>
                    </button>
                  </InputGroup>
                </form>
                <div className="bg-dark bg-opacity-50 ">
                  <h2>{data.name}</h2>
                  <Card.Text className="lead">
                   {day},{ month} {date},{year}
                  </Card.Text> 
                    {time}
                  <hr />
                  <i class="fas fa-cloud-hail-mixed"></i>
                  <h1 className="fw-boder mb-5">{data.main?.temp} &deg;C</h1>
                  <p className="lead fw-boder mb-0">
                    {data.weather?.[0]?.main}
                  </p>
                  <p className="lead">
                  
                    {data.main?.temp_min}&deg;C | {data.main?.temp_max} &deg;C
                  </p>
                </div>
              </Card.ImgOverlay>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
