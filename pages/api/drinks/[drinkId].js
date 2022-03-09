import { drinks } from "../../../constant/drinks"

export default function handler(req, res) {
    const { drinkId } = req.query
    if (req.method === 'GET') {
        const menu = drinks.find(el => el.id == drinkId)
        // console.log('menu', menu)
        res.status(200).json(menu)
    } else if (req.method === 'PUT') {
        const { name, url } = req.body
        let find_drink = drinks.find(el => el.id == drinkId)
        drinks[drinkId - 1] = {
            ...drinks[drinkId - 1],
            id: drinkId,
            name,
            url,
        }
        console.log('drinks', drinks)
        console.log('find_drink', find_drink)
        res.status(200).json({ msg: 'UPDATE ITEM SUCCESSFULLY' })
    } else if (req.method === 'DELETE') {
        // drinks = [...drinks].filter(el => el.id !== drinkId)
        console.log('first', drinkId)
        // drinks = drinks.filter(el => el.id !== +drinkId)
        drinks[drinkId - 1] = {
            ...drinks[drinkId - 1],
            is_delete: true
        }

        // drinks = temp_drinks
        res.status(200).json({ msg: 'DELETE ITEM SUCCESSFULLY' })
    }


}
