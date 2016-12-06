import ornament from "../img/ornament-t.png";

const fakeMessage = "FAKE!";

module.exports = function addNews(data) {
	console.log(data);
	let mainElement = document.getElementsByTagName("main")[0];
	let ornamentCreator = new OrnamentSingleton();
	let notice = new Notice(fakeMessage);
	let noticeMessage = new PositionDecorator(notice).render();
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
			<div>${el.author ? "" : noticeMessage}</div>
		`;
		mainElement.appendChild(articleBlock);
		
		// if (!el.author) {
		// 	let noticeElement = document.createElement("div");
		// 	noticeElement.innerHTML = noticeMessage;
		// 	mainElement.appendChild(noticeElement);
		// }
	})
}

class OrnamentSingleton {
	constructor() {
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

class VisualComponent {
	render() {}
}

class Notice extends VisualComponent {
	constructor(text) {
		super();
		this.text = text;
	}
	render() {
		return `<div class="fake-notice">${this.text}</div>`;
	}
}

class Decorator extends VisualComponent {
	constructor(visualComponent) {
		super();
		this.visualComponent = visualComponent;
	}
	render() {
		return this.visualComponent.render();
	}
}

class PositionDecorator extends Decorator {
	constructor(visualComponent) {
		super(visualComponent);
	}
	render() {
		return `
			<div class="fake-notice-block" style="position: absolute">
				${super.render()}
			</div>
			`;
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