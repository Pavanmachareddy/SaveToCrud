const myForm= document.querySelector('#my-form');
const uname= document.querySelector('#name');
const email= document.querySelector('#email');
const msg= document.querySelector('.msg');
const userList= document.querySelector('#users');

myForm.addEventListener('submit',onSubmit);


function onSubmit(e){
    e.preventDefault();
    // localStorage.setItem('name',name.value);
    // localStorage.setItem('email',email.value);

    const userDetails= {
        uname:uname.value,
        email:email.value
    }
    
    // const obj = JSON.stringify(userDetails);
    // localStorage.setItem(userDetails.email,obj);

    //storing data on the cloud
    axios.post("https://crudcrud.com/api/29fe0af4cbc740bfb1479c4fd9cd9f3e/appointmentDetails",userDetails)
    .then((response)=>{
        showUserOnScreen(response.data)
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })
  
    
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/29fe0af4cbc740bfb1479c4fd9cd9f3e/appointmentDetails")
    .then((response)=>{
        console.log(response)
        for(var i=0; i<response.data.length; i++){
            showUserOnScreen(response.data[i])
        }
    }).catch((err)=>{
        console.log(err);
    })
})


function showUserOnScreen(user){

    // const li= document.createElement('li');
    // li.innerHTML=document.createTextNode(JSON.parse(localStorage.getItem('userDetails')));
    // userList.appendChild(li)
    if(localStorage.getItem(user.email)!==null){
        removeUserFromTheScreen(user.email)
    }
    const parentNode= document.getElementById('users');
    const childHTML= `<li id="${user.email}" > ${user.uname} -  ${user.email} 
                    <button  onclick=removeUser('${user.email}')>Delete User</button>
                    <button onclick=editUser('${user.uname}','${user.email}')> Edit user</button>
                    </li>`;

    parentNode.innerHTML= parentNode.innerHTML+childHTML;
 }
function removeUser(emailId){
    localStorage.removeItem(emailId)
    removeUserFromTheScreen(emailId)

}

function editUser(username,emailId){
    document.getElementById('name').value=username
    document.getElementById('email').value=emailId
    localStorage.removeItem(emailId)
    removeUserFromTheScreen(emailId)
    
}


function removeUserFromTheScreen(emailId){

    const parentNode= document.getElementById('users');
    const childNodeToBeDeleted= document.getElementById(emailId)

    if(childNodeToBeDeleted){
        
        parentNode.removeChild(childNodeToBeDeleted)
    }
    
}