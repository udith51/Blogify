console.log('Start');
const list = document.querySelector('#list');
const content = document.querySelector('.content');
const details = document.querySelector('.details');
const title = document.querySelector('#title');
const b_body = document.querySelector('#b_body');
const back = document.querySelector('.back');
const read_area = document.querySelector('#read-area');

const getBlogs = async () => {
    try {
        const res = await axios.get("https://adg-rec-task.herokuapp.com/");
        for (let i of res.data) {
            let card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('style', 'width: 18rem');
            card.innerHTML = `<img src="Images/book.jpg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${i.title}</h5>
            <a href="#" class="read btn btn-primary" id=${i._id} >Read</a>
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

const getABlog = async (id) => {
    try {
        const res = await axios.get(`https://adg-rec-task.herokuapp.com/getBlog/${id}`);
        title.textContent = res.data.title;
        b_body.innerText = res.data.details;
        console.log(res.data.title);
        console.log(res.data.details);
    }
    catch (e) {
        console.log(e);
    }
}

content.addEventListener('click', (e) => {

    if (e.target.classList.contains('read')) {
        content.style.display = 'none';
        details.style.display = 'block';
        back.style.display = 'block';
        read_area.style.display = 'block';
        console.dir(e.target);
        getABlog(e.target.id);
    }
})
back.addEventListener('click', () => {
    read_area.style.display = 'none';
    content.style.display = 'block';
    details.style.display = 'none';
    back.style.display = 'none';
})