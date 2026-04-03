const Record = require('../models/Record')

const createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, note, user } = req.body
        const { role, id } = req.user

        if (!amount || !type || !category) {
            return res.status(400).json({ message: 'Required fields missing' })
        }

        let recordUser

        if (role === 'operator') {
            if (!user) {
                return res.status(400).json({ message: 'User ID required' })
            }
            recordUser = user
        }

        if (role === 'admin') {
            recordUser = user || id
        }

        const record = await Record.create({
            user: recordUser,
            amount,
            type,
            category,
            date,
            note
        })

        res.status(201).json({
            message: 'Record created successfully',
            record
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { createRecord }