console.log('Start');
const list = document.querySelector('#list');
console.log(list.innerHTML);
const getBlogs = async () => {
    try {
        const res = await axios.get("https://adg-rec-task.herokuapp.com/");
        list
        // console.log(res.data);
        for (let i of res.data) {
            let card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('style', 'width: 18rem');
            card.innerHTML = `<img src="images/book.jpg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${i.title}</h5>
            <a href="#" class="btn btn-primary">Read</a>
        </div>`
            list.appendChild(card);
        }
        console.log(list);
    }
    catch (e) {
        console.log(e);
    }
}
getBlogs();