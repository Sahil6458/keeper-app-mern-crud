const express = require("express");
const mongoose = require("mongoose");
const cores = require("cors");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cores());
mongoose.connect("mongodb://localhost:27017/keeperDb", {
  useNewUrlParser: true,
});

const keeperSchema = {
  title: String,
  content: String,
};

const Keeper = mongoose.model("keeper", keeperSchema);

app.get("/api", (req, res) => {
  Keeper.find((err, result) => {
    if (!err) {
      res.send(result);
    }
  });
});
app.post("/api/addNew", (req, res) => {
  const query = new Keeper({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
  });
  query.save((err) => {
    if (!err) {
      res.send("Successfully added new Note");
    }
  });
});
app.put("/api/update/", (req, res) => {
  Keeper.updateOne({ _id: req.body.id }, { $set: req.body }, (err) => {
    if (!err) {
      res.send("Patched succesfully");
    }
  });
});

// app.put("api/:id", (req, res) => {
//   Keeper.update(
//     { _id: mongoose.Types.ObjectId(req.params.id) },
//     { title: req.body.title, content: req.body.content },
//     { overwrite: true },
//     (err) => {
//       if (!err) {
//         res.send("Patched succesfully");
//       }
//     }
//   );
// });

app.delete("/api/delete/:id", (req, res) => {
  Keeper.deleteOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $set: req.body },
    (err) => {
      if (!err) {
        res.send("successfully deleted");
      }
    }
  );
});
app.listen(8000, () => {
  console.log("Backend connected");
});
