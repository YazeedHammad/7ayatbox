const pool = require("./ConnectionPool");

// creating a new message in db
const addMessage = (name, phone, message, cb) => {
    pool.getConnection(function(err, con) {
        if (err) console.log("connection err", err);
        console.log("Connected!");
        var sql = `INSERT INTO contact_us (name, phone, message) VALUES ("${name}","${phone}","${message}")`;
        con.query(sql, function(err, result) {
          if (err) console.log("query error", err);
          console.log("1 record inserted");
          cb(err, result);
          con.release(); //release the connection to the pool
        });
      });
}

// //get the message from db
// const getMessage = (name, phone, message) => {
//     pool.getConnection(function(err, con) {
//       if (err) console.log("connection err", err);
//       console.log("Connected!");
//       var sql = `SELECT * FROM contact_us`;
//       con.query(sql, function(err, result) {
//         if (err) console.log("query error", err);d
//         cb(result);
//         con.release(); //release the connection to the pool
//       });
//     });
//   };

module.exports.addMessage = addMessage;
// module.exports.getMessage = getMessage;