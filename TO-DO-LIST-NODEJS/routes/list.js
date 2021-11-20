var express = require('express');
var router = express.Router();
var listHelper = require('../HELPER/listHelper');

router.post('/create', async (req, res) => {
    let body = req.body;
    console.log('body in create',body);
    let listResponse = await listHelper.createlist(body);
    res.json(listResponse);
});

router.post('/list', async (req, res, next) => {
    let body = req.body;
    console.log('body in list',body);
    let listList = await listHelper.getListData(body);
    res.json(listList);
});

router.put('/updateStatus/:id', async (req, res, next) => {
    let body = req.body;
    body.listId = req.params.id;
    console.log('body in update',body);
    let updateStatus = await listHelper.updateStatus(body);
    res.json(updateStatus);
});

router.delete("/delete/:id", async (req, res) => {
    let body = req.body;
    body.listId = req.params.id;
    console.log('body in delete',body);
    let deleteList = await listHelper.deleteList(body);
    res.json(deleteList);
});

router.get("/getDetails/:id",  async (req, res) => {
    let listId = req.params.id;
    let editList = await listHelper.getListDetailsUsingId(listId);
    res.json(editList);
});

router.put("/update/:id", async (req, res) => {
    let body = req.body.data;
    body.listId = req.params.id;
    console.log('inside change update lists',body);
    let updateList = await listHelper.updateList(body);
    res.json(updateList);
});
module.exports = router;