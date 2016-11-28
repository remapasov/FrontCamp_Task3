const NEWSAPI_KEY = "0f7eb6d271aa459d8e77503f60fa2708";

import "../styles/base.less";
import ornament from "../img/ornament.jpg";

let url = "https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=" + NEWSAPI_KEY;
let addNews = require("./newsProcessing");
let img = document.createElement("img");
img.src = ornament;
img.class = "ornament";

let header = document.getElementsByTagName("header")[0];
header.appendChild(img);

fetch(url)
	.then(res => res.json())
	.then(data => {
		addNews(data);
	})
	.catch(err =>  {
		console.log("Error!");
	})