const Record = require("../../models/record.model");

const getRecords = async(req, res) =>{
    try{
        let filter = {};
        const {role, id} = req.user;

        if(role==="viewer" || role==="analyst"){
            filter.user = id;
        }
        else if(role==="operator"){
            filter.user = req.query.id;
        }
        if (req.query.type) {
            filter.type = req.query.type;
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.startDate || req.query.endDate) {
            filter.date = {};

            if (req.query.startDate) {
                filter.date.$gte = new Date(req.query.startDate);
            }
            if (req.query.endDate) {
                filter.date.$lte = new Date(req.query.endDate);
            }
        }
        const records = await Record.find(filter).sort({ date: -1 });
        res.json(records);
    }catch(e){
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getRecords };