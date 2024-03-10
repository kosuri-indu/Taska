const express = require('express');
const router = express.Router();
const Box = require("../models/box.js");

//Index Route
router.get("/", async (req,res) => {
    let boxes = await Box.find();
    res.render("index.ejs",{ boxes });
});

//New Box Route
router.post("/add/:title", async (req,res) => {
    const { title } = req.params;
    let newBox = new Box({ title, tasks: [] }); 
    await newBox.save();
    res.redirect("/boxes");
});

//New Task Route
router.post('/:id/:newTask', async (req, res) => {
    const { id, newTask } = req.params;
    const box = await Box.findById(id);
    if (!box) {
        res.status(404).send('Box not found');
    }
    box.tasks.push({ name: newTask, checked: false });
    await box.save();
    res.redirect("/boxes");
});

//Edit Route
router.put("/:id/:newTitle/edit", async (req, res) => {
    const { id, newTitle } = req.params;
    const box = await Box.findById(id);
    if (!box) {
        res.status(404).send('Box not found');
    }
    box.title = newTitle;
    await box.save();
    res.redirect("/boxes");
});

//Change Task Status Route
router.put("/:boxId/tasks/:taskId", async (req, res) => {
    const { boxId, taskId } = req.params;
    const box = await Box.findById(boxId);
    if (!box) {
        res.status(404).send('Box not found');
    }
    const task = box.tasks.id(taskId);
    if (!task) {
        res.status(404).send('Task not found' );
    }
    task.checked = !task.checked;
    await box.save();
    res.redirect("/boxes");
});

//Reset Route
router.put('/reset', async (req, res) => {
    const boxes = await Box.find({});
    const updates = boxes.map(box => {
        box.tasks.forEach(task => {
            task.checked = false;
        });
        return box.save();
    });
    await Promise.all(updates);
    res.json({ success: true });
});

//Delete Box Route
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    let deletedBox = await Box.findByIdAndDelete(id);
    res.redirect("/boxes");
});

//Delete Task Route
router.delete("/:id/delete/:index", async (req, res) => {
    const { id } = req.params;
    let index = Number(req.params.index);
    let box = await Box.findById(id);
    if (!box){
        res.status(404).send('Box not found');
    }
    if (index >= 0 && index < box.tasks.length) {
        box.tasks.splice(index, 1);
        await box.save();
        res.redirect("/boxes");
    } else {
        res.status(404).send('Element not found');
    }
});

module.exports = router;