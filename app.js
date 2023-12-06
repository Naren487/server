const express = require('express');  
const cors=require("cors");
//checkout api

var app = express();
const stripe=require("stripe")("sk_test_51O2AJnSDHbApW9pLAsmuxU3GfInrITdNKafzg0cgGpBhRGmei2vwwcU3ot92vYW5YigaJyKivcKfkxRcgdpbbEuk00A2d1RidL")
app.use(cors(
    {
        origin:["https://final-ecommerce-five.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
));

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.json("Hello");
})
app.post('/api/create-checkout-session',async(req,res)=>{
    const {products}=req.body;
    const lineItems=products.map((product)=>({
        price_data:{
            currency:'USD',
            product_data:{
                name:product.productName
            },
            unit_amount:product.price*100
        },
        quantity:product.qty

    }))

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://final-ecommerce-five.vercel.app:3000/success",
        cancel_url:"https://final-ecommerce-five.vercel.app:3000/cancel",

    });
    res.json({id:session.id});
})
app.listen(7000,()=>{
    console.log("Server start");
})
