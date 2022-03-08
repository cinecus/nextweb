const drinks = [
    {
        id: 1,
        name: 'Mocha',
        url: 'https://img.freepik.com/free-photo/hot-mocha-coffee_1339-2386.jpg?t=st=1646735043~exp=1646735643~hmac=5b7eb954b459bc044036bb085474d0bb5e54a44a69af2b44e0ffe596b0f9e53d&w=996',
        price: {
            hot: 50,
            ice: 60,
            frappe: 70
        }
    },
    {
        id: 2,
        name: 'Milk Tea',
        url: 'https://thaipbs-world.s3.ap-southeast-1.amazonaws.com/thaipbsworld/wp-content/uploads/2019/07/12125756/bubble-milk-tea-1.jpg',
        price: {
            hot: 40,
            ice: 50,
            frappe: 60
        }
    },
    {
        id: 3,
        name: 'Chocolate',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Chocolate_milk.JPG/1280px-Chocolate_milk.JPG',
        price: {
            hot: 45,
            ice: 55,
            frappe: 65
        }
    },
    {
        id: 4,
        name: 'Match Latte',
        url: 'https://www.eatingbirdfood.com/wp-content/uploads/2021/04/iced-matcha-latte-hero-768x1152.jpg',
        price: {
            hot: 50,
            ice: 60,
            frappe: 70
        }
    },
]

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(drinks)
    } else if (req.method === 'POST') {
        const { name, url } = req.body
        // console.log('req.body', req.body)
        drinks.push({
            id: drinks.length + 1,
            name: name,
            url
        })
        res.status(200).json({ msg: 'ADD ITEM SUCCESSFULLY' })
    }
}