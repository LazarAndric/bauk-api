const config={
    db:{
        host:'localhost',
        port:3306,
        user:'baukApi',
        password:'',
        schemaName:'`bauk_ciz_db`',
        tables:{
            placeTable:'`place`',
            user:{
                userTable:'`user`',
                adressTable:'`adress`',
                statusTable:'`status`',
                chatTable:'`chat`',
                passwordTable:'`password`',
                roleTable:'`role`',
                authTable:'`auth`',
                mailTable:'`mail_code`',
                orderUserTable:'`order_user`'
            },
            product:{
                productTable:'`product`',
                sizeTable:'`size`',
                pictureTable:'`picture`',
                productAdditionTable:'`product_addition`',
            },
            additionTable:'`addition`',
            item:{
                itemTable:'`item`',
                additionsTable:'`additions`',
            },
            order:{
                orderTable:'`order`',
                orderStatusTable:'`order_status`'
            },
            visit:{
                visitTable:'`visit`',
                ordersTable:'`orders`'

            }

        }
    }
}

export default config