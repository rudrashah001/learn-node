const status = require("statuses");
let users =[

    {
        id:1,
        name:"rudra",
        email: "rudra@example.com",
        address: "patan"

    },

    {
        id:2,
        name:"tiarth",
        email: "tirath@example.com",
        address: "ahmedabad"

    },
     {
        id:3,
        name:"manav",
        email: "manav@example.com",
        address: "surat"

    }
]

let nextId = 4;

module.exports = {
  users,
  getNextId: () => nextId++,
};
