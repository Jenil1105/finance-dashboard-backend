const Record = require('../models/Record')

const updateRecord = async (req, res) => {
  try {
    const { id } = req.params
    const { amount, type, category, date, note } = req.body

    const record = await Record.findById(id)

    if (!record) {
      return res.status(404).json({ message: 'Record not found' })
    }

    if (amount !== undefined) record.amount = amount
    if (type) record.type = type
    if (category) record.category = category
    if (date) record.date = date
    if (note) record.note = note

    await record.save()

    res.json({
      message: 'Record updated successfully',
      record
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { updateRecord }