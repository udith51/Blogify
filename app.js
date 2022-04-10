console.log('Start');
const list = document.querySelector('#list');
const content = document.querySelector('.content');
const details = document.querySelector('.details');
const title = document.querySelector('#title');
const b_body = document.querySelector('#b_body');
const back = document.querySelector('.back');
const updt = document.querySelector('.updt');
const frm_updt = document.querySelector('.frm-updt');

const read_area = document.querySelector('#read-area');
const add = document.querySelector('#add');
const new_form = document.querySelector('.new-form');
const updt_form = document.querySelector('.updt-form');

const post = document.querySelector('.post');
const dlt = document.querySelector('i');


const getBlogs = async () => {
    try {
        const res = await axios.get("https://adg-rec-task.herokuapp.com/");
        for (let i of res.data) {
            let card = document.createElement('div');
            card.setAttribute('class', 'card m-3');
            card.setAttribute('style', 'width: 18rem');
            card.innerHTML = `<img src="Images/book.jpg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${i.title}</h5>
            <a href="#" class="read btn btn-primary" id=${i._id} >Read</a>
            <i class="fa fa-trash float-end mt-1" id=${i._id}></i>
        </div>`
            list.appendChild(card);
        }
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
        updt.setAttribute('id', `${id}`)
    }
    catch (e) {
        console.log(e);
    }
}

const postABlog = async () => {
    const data = { title: new_form.title.value, details: new_form.b_details.value };
    console.log(data);
    const res = axios.post("https://adg-rec-task.herokuapp.com/createBlog", data);
    // const res = await fetch("https://adg-rec-task.herokuapp.com/createBlog", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: data,
    // })
    console.log(res);
    // document.location.reload();
}

const deleteABlog = async (id) => {
    try {
        const res = await axios.post(`https://adg-rec-task.herokuapp.com/deleteBlog/${id}`);
        console.log(res);
        document.location.reload(true);
    }
    catch (e) {
        console.log(e);
    }
}

const updateABlog = async (id) => {
    const data = { title: new_form.title.value, details: new_form.b_details.value };
    console.log(data);
    const res = await axios.get(`https://adg-rec-task.herokuapp.com/updateBlog/${id}`);
    console.log(res);
    // document.location.reload();
}

content.addEventListener('click', (e) => {

    if (e.target.classList.contains('read')) {
        content.style.display = 'none';
        details.style.display = 'block';
        back.style.display = 'block';
        updt.style.display = 'block';
        read_area.style.display = 'block';
        getABlog(e.target.id);
    }
    else if (e.target.classList.contains('fa')) {
        console.log(e.target.id);
        deleteABlog(e.target.id);
    }
})

back.addEventListener('click', () => {
    read_area.style.display = 'none';
    content.style.display = 'block';
    details.style.display = 'none';
    back.style.display = 'none';
    updt.style.display = 'none';
})

add.addEventListener('click', (e) => {
    e.preventDefault();
    content.style.display = 'none';
    read_area.style.display = 'none';
    new_form.style.display = 'block';
    back.style.display = 'none';
    updt.style.display = 'none';
    updt_form.style.display = 'none';
})
post.addEventListener('click', e => {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    if (new_form.title.value && new_form.b_details.value) {
        postABlog();
        e.preventDefault();
    }

})
updt.addEventListener('click', async (e) => {
    console.dir(e.target.id);
    content.style.display = 'none';
    read_area.style.display = 'none';
    new_form.style.display = 'none';
    updt_form.style.display = 'block';
    back.style.display = 'none';
    updt.style.display = 'none';
    const res = await axios.get(`https://adg-rec-task.herokuapp.com/getBlog/${e.target.id}`);
    console.log(res);
    updt_form.title.value = res.data.title;
    updt_form.b_details.value = res.data.details;
    frm_updt.setAttribute('id', e.target.id);
})
frm_updt.addEventListener('click', async (e) => {
    // console.log(e.target.id);
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    if (new_form.title.value && new_form.b_details.value) {
        console.log('Here');
        updateABlog(e.target.id);
        e.preventDefault();
    }
})