// 1. fetch 20 random user on page load

// 2. filter user by gender

//3. filter user by name

const apiUrl = "https://randomuser.me/api/?";
const listElm = document.querySelector("#user-list");
const countElm = document.querySelector("#user-count");
let userArgs = [];

const displayUsers = (users) => {
  let str = "";

  //   if (users.length > 0) {
  //     str = "No user found";
  //     listElm.innerHTML = str;
  //     return;
  //   }
  users.map((users) => {
    str += `
        
    <div class="col-md-6 col-lg-3 py-2">
        <div class="card fs-5 user-card">
        <img src="${users.picture.large}" class="card-img-top" alt="..." />
        <h4 class="text-center mt-3">
        ${users.name.title} ${users.name.first} ${users.name.last}
        </h4>
        <div class="card-body">
        <div>
        <span><i class="fas fa-phone"></i></span> ${users.cell}
        </div>

        <div>
        <span><i class="fas fa-envelope"></i></span> ${users.email}
        </div>

        <div>
        <span><i class="fas fa-map-marker-alt"></i></span> ${users.location.city}, ${users.location.country}
        </div>

        </div>
      </div>
      </div>`;
  });

  listElm.innerHTML = str;
  countElm.innerText = users.length;
};

const fetchUser = (params = "results=20") => {
  //fetch from api
  fetch(apiUrl + params)
    .then((Response) => Response.json())
    .then((data) => {
      usrArgs = data.results;
      displayUsers(usrArgs);
    })
    .catch((error) => console.log(error));
};
fetchUser();

//for drop down menu change
const handleOnChange = (e) => {
  const params = `results=20&gender=${e.value}`;
  fetchUser(params);
};

const handleOnSearch = (e) => {
  const str = e.value.toLowerCase();
  const filterArgs = usrArgs.filter((item) => {
    const userFullName = (item.name.first + " " + item.name.last).toLowerCase();
    if (userFullName.includes(str)) {
      return item;
    }
  });

  displayUsers(filterArgs);
};

//count user found
