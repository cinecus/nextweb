import { drinks } from "../../../constant/drinks"

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(drinks)
    } else if (req.method === 'POST') {
        const { name, url, description, hot, ice, frappe } = req.body
        // console.log('req.body', req.body)
        drinks.push({
            id: drinks.length + 1,
            name: name,
            url,
            description,
            price: {
                hot, ice, frappe
            }
        })
        res.status(200).json({ msg: 'ADD ITEM SUCCESSFULLY' })
    }
}