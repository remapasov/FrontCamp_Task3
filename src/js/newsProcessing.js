module.exports = function addNews(data) {
	console.log(data);
	let mainElement = document.getElementsByTagName("main")[0];
	data.articles.forEach(el => {
		let articleBlock = document.createElement("article");
		let daysAgo = getDateAgo(el.publishedAt);
		articleBlock.innerHTML = `
			<div class="${el.author ? 'author' : 'hide'}">${el.author ? 'Author: ' + el.author : ''}</div>
			<div><time class="added-news-time">${el.publishedAt ? daysAgo : ''}</time></div>
			<div class="article-title"><h3>${el.title ? el.title : ''}</h3></div>
			<div class="image-block"><img class="${el.urlToImage ? 'news-image' : 'hide'}" src="${el.urlToImage ? el.urlToImage : ''}" alt='' /></div>
			<div class="description">${el.description ? el.description : ''}</div>
			<div><a href="${el.url}" class="read-more">Read more...</a></div>
		`;
		mainElement.appendChild(articleBlock);
	})
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