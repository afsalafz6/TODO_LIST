let db = require("../config/connection"),
    ObjectID = require("mongodb").ObjectID,
    dbConfig = require("../config/collection"),

_list = {

        /****** Create list Data******/

        createlist: async (data) => {
            console.log('data in create list', data);
            try {
                    let newlist = await db
                        .get()
                        .collection(dbConfig.LIST)
                        .insertOne(await _list.arrangeListForCreation(data));
                    if (newlist) {
                        return {
                            isCreated: true,
                            message: "list Created Successfully",
                        };
                    } else {
                        return {
                            isCreated: false,
                            message: "Internal Server Error Please Try After Some Time",
                        };
                    }
            } catch (e) {
                return { isCreated: false, message: e.message };
            }
        },
        arrangeListForCreation: async (data) => {
            console.log('data in arrangeForCreation', data)
                return {
                    LIST_NAME: data.listData,
                    LIST_STATUS: false,
                    CREATED_ON: new Date()
                }

        },

        getListData: async () => {
            try {
                let count = await db
                    .get()
                    .collection(dbConfig.LIST)
                    .find()
                    .count();
                let listArray = await db
                    .get().collection(dbConfig.LIST).aggregate([
                        {
                            $project: {
                                _id: "$_id",
                                list_name: "$LIST_NAME",
                                list_status: "$LIST_STATUS",
                                created_on: "$CREATED_ON"
                            }
                        }
                    ])
                    .toArray()
                return { data: listArray, count: count };
            } catch (e) {
                console.log(e)
            }
        },

        /******************* complete/Incomplete list **********************/
         updateStatus: async (data) => {
            let status = await db.get().collection(dbConfig.LIST)
                .updateOne({ _id: ObjectID(data.listId) },
                { 
                    $set: { LIST_STATUS: data.status} 
            });

            if (status) {
                return {
                    isUpdated: true,
                    message: "list Status Updated Successfully",
                };
            } else {
                return {
                    isUpdated: false,
                    message: "Internal Server Error Please Try After Some Time",
                };
            }
             
        },

        deleteList: async (data) => {
            try {
                    let deleteList = await db
                        .get()
                        .collection(dbConfig.LIST)
                        .deleteOne(
                            { _id: ObjectID(data.listId) });
                    if (deleteList) {
                        return {
                            isDelete: true,
                            message: "List Successfully Deleted",
                        };
                    } else {
                        return {
                            isDelete: false,
                            message: "Internal Server Error Please Try After Some Time",
                        };
                    }
            } catch (e) {
                return { isDelete: false, message: e.message };
            }
        },

        getListDetailsUsingId: async (id) => {
            console.log('LIST id in edit helper', id)
                let getList = await db
                    .get()
                    .collection(dbConfig.LIST)
                    .aggregate([
                        {
                            $match: { _id: ObjectID(id) },
                        },
                        {
                            $project: {
                                _id: "$_id",
                                list_name: "$LIST_NAME",
                                list_status: "$LIST_STATUS",
                                created_on: "$CREATED_ON"
                            },
                        },
                    ])
                    .toArray();
                return getList[0];
        },

        updateList: async (data) => {
            try {
                    console.log('updating')
                    let updateList = await db
                        .get()
                        .collection(dbConfig.LIST)
                        .updateOne(
                            {
                                _id: ObjectID(data.listId)

                            },
                            await _list.arrangeListForUpdate(data)
                        );
                    if (updateList) {
                        return {
                            isUpdated: true,
                            message: "Donation Successfully Updated",
                        };
                    } else {

                        return {
                            isUpdated: false,
                            message: "Internal Server Error Please Try After Some Time",
                        };
                    }
            } catch (e) {
                return { isUpdated: false, message: e.message };
            }
        },

        arrangeListForUpdate: async (data) => {
            console.log('data in arrangeForUpdation', data)
            return {
                $set: {
                    LIST_NAME: data.listData,
                    UPDATED_ON: new Date()
                }
            }
        },
};

module.exports = _list;