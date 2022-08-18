const authUrl = 'http://localhost:3000/api/v1/auth'
const jobUrl = 'http://localhost:3000/api/v1/job'

// register user
$(document).ready(() => {


  $("#register").click(async (e) => {
    let name = $("#name").val()
    let email = $("#email").val()
    let password = $("#password").val()

    try {
      const { data: { token, username } } = await axios.post(authUrl + "/register", { name, email, password })
      console.log("username : " + username + "\ntoken : " + token);
      //console.log(username, token);
    } catch (error) {
      const { response: { data } } = error
      console.log(data);
    }
  })


  // login user
  $("#submit").click(async (e) => {
    let email = $("#email").val()
    let password = $("#password").val()
    try {
      const { data: { token, username } } = await axios.post(authUrl + '/login', { email, password })
      console.log("username : " + username + "\ntoken : " + token);
    } catch (error) {
      const { response: { data } } = error
      console.log(data);
    }
  })

  // view user
  $("#viewUsers").click(async () => {
    let users = []
    await axios.get(authUrl + '/view')
      .then(res => {
        const { data } = res
        users = [...data]
      })
    setTimeout(() => {
      $("#users").text(' ')
      console.log(users);
      if (users.length === 0) {
        let noUser = $("<p></p>").text("There is no user")
        $("#users").append(noUser)
      } else {
        users.forEach(item => {
          let id = $("<p></p>").html(`id : ${item._id}`)
          let name = $("<p></p>").html(`name : ${item.name}`)
          let email = $("<p></p>").html(`email : ${item.email}`)
          let password = $("<p></p>").html(`password : ${item.password}`)
          let deleteUser = $("<button></button>").text("delete").val(item._id).attr("id", "deleteUser")
          $("#users").append(id, name, email, password, deleteUser)
        })
      }
    }, 1000)
  })

  // delete user
  $("#deleteUser").click((e) => {
    //let deleteItem = $("#deleteUser")
    //let useId = deleteItem.val()
    //console.log($("#deleteUser").val());
    console.log('work');
  })
})