console.log('Start');
const list = document.querySelector('#list');
console.log(list.innerHTML);
const getBlogs = async () => {
    try {
        const res = await axios.get("https://adg-rec-task.herokuapp.com/");
        list
        // console.log(res.data);
        for (let i of res.data) {
            let li = document.createElement('li');
            li.innerText = i.title;
            list.appendChild(li);
        }
    }
    catch (e) {
        console.log(e);
    }
}
getBlogs();
