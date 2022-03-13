import { drinks } from "../../../constant/drinks"

export default function handler(req, res) {
    const { drinkId } = req.query
    if (req.method === 'GET') {
        const menu = drinks.find(el => el.id == drinkId)
        // console.log('menu', menu)
        res.status(200).json(menu)
    } else if (req.method === 'PUT') {
        const { name, url } = req.body
        drinks[drinkId - 1] = {
            ...drinks[drinkId - 1],
            id: drinkId,
            name,
            url,
        }
        res.status(200).json({ msg: 'UPDATE ITEM SUCCESSFULLY' })
    } else if (req.method === 'DELETE') {
        drinks[drinkId - 1] = {
            ...drinks[drinkId - 1],
            is_delete: true
        }
        res.status(200).json({ msg: 'DELETE ITEM SUCCESSFULLY' })
    }


}
