const express = require('express')
const uuid = require('uuid')

const port = 3000

const app = express()

app.use(express.json())


const Orders = []

const checkId = (request, response, next) => {
    const { id } = request.params

    const index = Orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ error: 'Não encontrado' })
    }

    request.OrderIndex = index
    request.OrderId = id

    next()
}


app.get('/order', (request, response) => {

    return response.json(Orders)
})


app.post('/order', (request, response) => {
    const { order, clienteName, price, status } = request.body

    const pedido = { id: uuid.v4(), order, clienteName, price, status }

    Orders.push(pedido)

    return response.json(Orders)
})

app.put('/order/:id', checkId, (request, response) => {

    const { order, clienteName, price } = request.body

    const index = request.OrderIndex

    const id = request.OrderId

    const alterOrder = { id, order, clienteName, price }





    if (index < 0) {
        return response.status(404).json({ error: 'Não encontrado' })
    }

    Orders[index] = alterOrder

    return response.json(Orders)

})


app.delete('/order/:id', checkId, (request, response) => {

    const index = request.OrderIndex


    Orders.splice(index, 1)

    return response.status(204).json(Orders)

})


app.get('/order/:id', checkId, (request, response) => {

    const index = request.OrderIndex

    return response.json(Orders[index])
})

app.patch('/order/:id', checkId, (request, response) => {
    const index = request.OrderIndex

    Orders[index].status = 'Pronto'

    return response.json(Orders[index])
})



app.listen(port, () => {
    console.log(`🎈🎈Servidor online na porta : ${port}🎈🎈`)
})
