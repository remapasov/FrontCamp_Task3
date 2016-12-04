import ornament from "../img/ornament-t.png";

module.exports = function addNews(data) {
	console.log(data);
	let mainElement = document.getElementsByTagName("main")[0];
	let ornamentCreator = new OrnamentSingleton();
	data.articles.forEach(el => {
		let articleBlock = document.createElement("article");
		let daysAgo = getDateAgo(el.publishedAt);
		let ornamentPath = ornamentCreator.getOrnamentPath();
		articleBlock.innerHTML = `
			<div class="${el.author ? 'author' : 'hide'}">${el.author ? 'Author: ' + el.author : ''}</div>
			<div><time class="added-news-time">${el.publishedAt ? daysAgo : ''}</time></div>
			<div class="article-title"><h3>${el.title ? el.title : ''}</h3></div>
			<div class="image-block"><img class="${el.urlToImage ? 'news-image' : 'hide'}" src="${el.urlToImage ? el.urlToImage : ''}" alt='' /></div>
			<div class="description">${el.description ? el.description : ''}</div>
			<div><a href="${el.url}" class="read-more">Read more...</a></div>
			<div><img class="footer-ornament" src="${ornamentPath}"/></div>
		`;
		mainElement.appendChild(articleBlock);
	})
}

class OrnamentSingleton {
	constructor() {
		// getInstance();

	}
	getOrnamentPath() {
		return ornament;
	}
	static getInstance() {
		if (!OrnamentSingleton.instance) {
			OrnamentSingleton.instance = new OrnamentSingleton();
		}
		return OrnamentSingleton.instance;
	}
}

let getDateAgo = function(date) {
	let dateCopy = new Date(date);
	let currentDate = new Date();
	let dateDifference = currentDate.getDate() - dateCopy.getDate();
	if (currentDate.getFullYear() == dateCopy.getFullYear() && currentDate.getMonth() == dateCopy.getMonth()) {
		if (dateDifference < 7 && dateDifference >= 1) {
			return currentDate.getDate() - dateCopy.getDate() + " days ago";
		}
	}
 	return dateCopy.toDateString();
}